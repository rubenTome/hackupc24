import flask
from flask import request, jsonify
import requests
import firebase_admin
from firebase_admin import db
import csv
import json


databaseURL = 'https://hackudc-49b6e-default-rtdb.europe-west1.firebasedatabase.app/'
api_key_evento = 'A4na1M8Qx37B6GOjdnFeHH2lYa9JI4UG';
api_key_location = 'fsq3GEAn2lFtnrxrPXA2sIeYEXaja2GOZbhPQz2uPIJZ1ck='

cred_obj = firebase_admin.credentials.Certificate('./../../key.json')
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL':databaseURL
	})



def create_app():

    fapp = flask.Flask(__name__)

    return fapp

app = create_app()

@app.route('/', methods=['GET'])
def obtener_dato():
    # As an admin, the app has access to read and write all data, regradless of Security Rules
    ref = db.reference('/User1')
    print(ref.get('/'))
    return 'Hello, World!'
    
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
        imagen = evento.get("_embedded", {}).get("images", [{}])[0].get("url", "")
        eventos_procesados.append({"nombre": nombre, "url": url_evento, "image": imagen})
    
    return jsonify(eventos_procesados)

@app.route('/lugares', methods=['GET'])
def buscar_lugares_interes_endpoint():
    ciudad = request.args.get('ciudad')
    ciudad = "London"
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