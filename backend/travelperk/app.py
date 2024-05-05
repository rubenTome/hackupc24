import flask
from flask import request, jsonify, Response
from flask_cors import CORS
import requests
import firebase_admin
from firebase_admin import db
import csv
import json
import pandas as pd
import numpy as np


databaseURL = 'https://hackudc-49b6e-default-rtdb.europe-west1.firebasedatabase.app/'
api_key_evento = 'A4na1M8Qx37B6GOjdnFeHH2lYa9JI4UG';
api_key_location = 'fsq3GEAn2lFtnrxrPXA2sIeYEXaja2GOZbhPQz2uPIJZ1ck='
api_key_vuelos = 'Bearer c1Ceh5osX2do2mAjSO2iRbEwdQBS'

from models.person import Person



def create_app():

    fapp = flask.Flask(__name__)
    CORS(fapp)
    return fapp 

app = create_app()

def connect_to_database():
    databaseURL = 'https://hackudc-49b6e-default-rtdb.europe-west1.firebasedatabase.app/'

    cred_obj = firebase_admin.credentials.Certificate('./../../key.json')
    default_app = firebase_admin.initialize_app(cred_obj, {
        'databaseURL':databaseURL
        })
    
database = connect_to_database()

@app.route('/', methods=['GET'])
def ejemplo_obtener_dato():
    # As an admin, the app has access to read and write all data, regradless of Security Rules
    ref = db.reference('users/user1')
    testPerson = Person(ref.get('/'))
    print(testPerson)
    return f"User: {testPerson.json}"

@app.route('/users/<username>', methods=['GET'])
def obtener_usuario(username):
    ref = db.reference(f'/users/{username}')
    testPerson = Person(ref.get('/'))
    return testPerson.json

@app.route('/<name>', methods=['GET'])
def obtener_usuario_from_nombre(name):
    ref = db.reference('/users/')
    snapshot = ref.order_by_child('name').equal_to("Anderson Hudson").get()
    for key in snapshot:
        pass

    ref = db.reference(f'/users/{key}')
    testPerson = Person(ref.get('/'))
    return testPerson.json

@app.route('/users/<username>/travel', methods=['GET'])
def conseguir_ultimo_viaje(username):
    ref = db.reference(f'/users/{username}')
    person = Person(ref.get('/'))
    return person.getTravelList()

@app.route('/users/<username>/travel', methods=['GET'])
def conseguir_todos_los_viajes(username):
    ref = db.reference(f'/users/{username}')
    person = Person(ref.get('/'))
    return person.getTravel()
    
@app.route('/evento', methods=['GET'])
def eventos():
    ciudad = request.args.get('ciudad')
    if not ciudad:
        return jsonify({"error": "Debes proporcionar el parámetro 'ciudad'"}), 400
    
    # Hacer la solicitud a la API de Ticketmaster
    url = "https://app.ticketmaster.com/discovery/v2/events"
    parametros = {
        "city": ciudad,
        "apikey": api_key_evento
    }
    respuesta = requests.get(url, params=parametros)
    datos_eventos = respuesta.json()
    # Extraer los datos relevantes de la respuesta
    eventos = datos_eventos.get("_embedded", {}).get("events", [])
    eventos_procesados = []
    for evento in eventos:
        nombre = evento.get("name", "")
        url_evento = evento.get("url", "")
        imagen = evento.get("images", [{}])[0].get("url", "")
        print(imagen)
        eventos_procesados.append({"name": nombre, "url": url_evento, "image": imagen})
    
    return jsonify(eventos_procesados)

@app.route('/lugares', methods=['GET'])
def buscar_lugares_interes_endpoint():
    ciudad = request.args.get('ciudad')
    if not ciudad:
        return jsonify({"error": "Debes proporcionar el parámetro 'ciudad'"}), 400

    url = "https://api.foursquare.com/v3/places/search?near="+ciudad 

    headers = {
        "accept": "application/json",
        "Authorization": "fsq3J9XHYnEGqIKt9D+vhuwg6+uOuFhGRkEG31jMwssa/0k="
    }

    respuesta = requests.get(url, headers=headers)
    datos_lugar = respuesta.json()
    lugares = datos_lugar.get("results")
    lugares_procesados=[]
    for lugar in lugares:
        nombre = lugar.get("name", "")
        coords = lugar.get("geocodes","").get("main","")
        lugares_procesados.append({"nombre": nombre, "cords":coords})
    

    
    return jsonify(lugares_procesados)

@app.route('/viajes/<username>/añadir', methods=['POST'])
def añadir_nuevo_viaje(username):
    data = request.get_json()
    print(data)

    name = data.get('name', 'Unknown')
    travelsList = data.get('travels', [])

    response_data = {
        'mensaje': 'New user created',
        'nombre': name,
        'edad': travelsList 
    }

    return Response(
        json.dumps(response_data),
        status=200,
        mimetype='application/json'
    )

@app.route('/users/<username>/match',methods=['GET'])
def coger_matched_users(username):
    ref = db.reference(f'/users/{username}')
    person = Person(ref.get('/'))
    travel = person.getTravel()
    print(travel['arrival_city'],travel['departure_date'],travel['return_date'])
    usersList = matchUsers(arrival_city=travel['arrival_city'], departure_date=travel['departure_date'], return_date=travel['return_date'])
    
    matches = {}

    for user in usersList:
            ref = db.reference('/users/')
            snapshot = ref.order_by_child('name').equal_to(user).get()
            for key in snapshot:
                pass

            ref = db.reference(f'/users/{key}')
            testPerson = Person(ref.get('/'))
            matches[key] = testPerson.json
            #print({key : testPerson.json})
    
    print(matches)
    return matches


def matchUsers(arrival_city, departure_date, return_date):
    ref = db.reference('/users')
    data = ref.get()
    #print(data)

    concatenated_df = pd.DataFrame()

    for user in data:
        # print(user)
        # print(data[user])
        df = pd.json_normalize(data[user])
        concatenated_df = pd.concat([concatenated_df, df], axis=0, ignore_index=True)


    concatenated_df.columns = ['name','arrival_city','departure_city','departure_date','return_date']

    df_sorted = concatenated_df.sort_values(by='departure_date', ascending=True)

    df_sorted = df_sorted[df_sorted["arrival_city"]==arrival_city]

    # Condiciones para la superposición
    condition1 = (df_sorted['departure_date'] >= departure_date) & (df_sorted['departure_date'] <= return_date)
    condition2 = (df_sorted['return_date'] >= departure_date) & (df_sorted['return_date'] <= return_date)
    condition3 = (df_sorted['departure_date'] <= departure_date) & (df_sorted['return_date'] >= return_date)

    # Filtrar filas donde haya superposición con el intervalo objetivo
    filtered_df = df_sorted[condition1 | condition2 | condition3]

    return filtered_df['name'].to_list()

@app.route('/buscar_vuelos', methods=['GET'])
def buscar_vuelos():
    # Obtener parámetros de la solicitud
    origen = request.args.get('origen')
    destino = request.args.get('destino')
    fecha_salida = request.args.get('fecha_salida')
    fecha_retorno = request.args.get('fecha_retorno')
    
    # Construir la URL de la solicitud
    url = f'https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode={origen}&destinationLocationCode={destino}&departureDate={fecha_salida}&returnDate={fecha_retorno}&currencyCode=EUR&adults=1&max=1'

    # Realizar la solicitud GET
    headers = {'Authorization': api_key_vuelos}
    respuesta = requests.get(url, headers=headers)
    
    # Verificar el estado de la respuesta
    if respuesta.status_code == 200:
        datos_vuelos = respuesta.json()
        return jsonify(datos_vuelos)
    else:
        return jsonify({"error": "Hubo un problema al buscar vuelos"}), 500

@app.route('/aeropuertos_importantes', methods=['GET'])
def aeropuertos_importantes():
    # URL del punto final de la API de IATA para obtener los aeropuertos importantes
    endpoint = "your/endpoint"  # Reemplaza "your/endpoint" con el punto final real de la API de IATA

    # Parámetros de la solicitud (si los hay)
    params = {
        "param1": "value1",
        "param2": "value2"
    }

    # Encabezados de autenticación (si es necesario)
    headers = {
        "Authorization": "Bearer your_access_token"  # Reemplaza "your_access_token" con tu token de acceso real
    }

    try:
        # Realizar la solicitud GET a la API de IATA
        response = requests.get(endpoint, params=params, headers=headers)

        # Verificar el estado de la respuesta
        if response.status_code == 200:
            # Si la solicitud fue exitosa, devolver los datos de la respuesta en formato JSON
            return jsonify(response.json())
        else:
            # Si hubo un error en la solicitud, devolver un mensaje de error con el código de estado
            return jsonify({"error": f"Hubo un problema al obtener los aeropuertos importantes: {response.status_code}"}), response.status_code
    except Exception as e:
        # Si se produce una excepción, devolver un mensaje de error con la descripción del error
        return jsonify({"error": f"Hubo un error al procesar la solicitud: {str(e)}"}), 500

