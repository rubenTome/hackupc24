import flask
from flask import request, jsonify, Response
from flask_cors import CORS
import requests
import firebase_admin
from firebase_admin import db
import csv
import json


databaseURL = 'https://hackudc-49b6e-default-rtdb.europe-west1.firebasedatabase.app/'
api_key_evento = 'A4na1M8Qx37B6GOjdnFeHH2lYa9JI4UG';
api_key_location = 'fsq3GEAn2lFtnrxrPXA2sIeYEXaja2GOZbhPQz2uPIJZ1ck='

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
    return f"User: {testPerson.json}"

@app.route('/<name>', methods=['GET'])
def obtener_usuario_from_nombre(name):
    ref = db.reference('/users/')
    snapshot = ref.order_by_child('name').equal_to("Anderson Hudson").get()
    for key in snapshot:
        print(key)

    ref = db.reference(f'/users/{key}')
    testPerson = Person(ref.get('/'))
    return f"User: {testPerson.json}"

@app.route('/users/<username>/travel', methods=['GET'])
def conseguir_ultimo_viaje(username):
    ref = db.reference(f'/users/{username}')
    person = Person(ref.get('/'))
    return f"Travel: {person.getTravel()}"

@app.route('/users/<username>/travel', methods=['GET'])
def conseguir_todos_los_viajes(username):
    ref = db.reference(f'/users/{username}')
    person = Person(ref.get('/'))
    return person.getTravel()

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

@app.route('/users/', methods=['POST'])
def añadir_nuevo_viaje():
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