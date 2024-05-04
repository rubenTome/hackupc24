import firebase_admin
from firebase_admin import db
import csv
import json

databaseURL = 'https://hackudc-49b6e-default-rtdb.europe-west1.firebasedatabase.app/'

cred_obj = firebase_admin.credentials.Certificate('./key.json')
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL':databaseURL
	})

# As an admin, the app has access to read and write all data, regradless of Security Rules
ref = db.reference('/User1')
print(ref.get('/'))

# with open('./dataset/hackupc-travelperk-dataset.csv', newline='') as csvfile:
#     reader = csv.reader(csvfile, quotechar='|')
#     next(reader, None) 
#     for row in reader:
#         user_id = f"/User{row[0]}"
#         ref = db.reference(user_id)
#         user_data = {
#             "Name": row[1],
#             "Departure_date": row[2],
#             "Return_date": row[3],
#             "Departure_city": row[4],
#             "Arrival_city": row[5],
#         }
#         ref.set(user_data)  # Añadir datos a Firebase