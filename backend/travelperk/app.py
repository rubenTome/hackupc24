import flask
import firebase_admin
from firebase_admin import db
import csv
import json


databaseURL = 'https://hackudc-49b6e-default-rtdb.europe-west1.firebasedatabase.app/'

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
    
    return "evento"