import flask

def create_app():

    fapp = flask.Flask(__name__)

    return fapp

app = create_app()

@app.route('/', methods=['GET'])
def obtener_dato():
    return 'Hello, World!'
    