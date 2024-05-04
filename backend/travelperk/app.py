import flask
from models.person import Person
import firebase_admin
from firebase_admin import db

def create_app():

    fapp = flask.Flask(__name__)

    return fapp

app = create_app()

def connect_to_database():
    databaseURL = 'https://hackudc-49b6e-default-rtdb.europe-west1.firebasedatabase.app/'

    cred_obj = firebase_admin.credentials.Certificate('./key.json')
    default_app = firebase_admin.initialize_app(cred_obj, {
        'databaseURL':databaseURL
        })
    
database = connect_to_database()

@app.route('/', methods=['GET'])
def obtener_dato():
    return 'Hello, World!'

@app.route('/users/<username>', methods=['GET'])
def obtener_usuario(username):
    ref = db.reference('/User1')
    print(ref.get('/'))
    return f"User: {username}"
    ref = db.reference('/User1')
    print(ref.get('/'))
    return
    