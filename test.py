import firebase_admin
from firebase_admin import db
import csv
import json
from backend.travelperk.models.person import Person
from datetime import datetime

databaseURL = 'https://hackudc-49b6e-default-rtdb.europe-west1.firebasedatabase.app/'

cred_obj = firebase_admin.credentials.Certificate('./key.json')
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL':databaseURL
	})

# As an admin, the app has access to read and write all data, regradless of Security Rules
ref = db.reference('users/user1')
print(ref.get('/'))

def convert_date_to_iso(date_str):
    # Parsear la fecha original
    date_obj = datetime.strptime(date_str, "%d/%m/%Y")
    # Formatear al formato ISO 8601
    iso_date = date_obj.strftime("%Y-%m-%d")
    return iso_date

# ref = db.reference('users')
# snapshot = ref.order_by_child('departure_date').limit_to_first(10).get()
# for key, val in snapshot.items():
#     print('{0} was {1} meters tall'.format(key, val))
# print(ref.get('/'))

ref = db.reference('users')
snapshot = ref.order_by_child('name').equal_to("Anderson Hudson").get()
for key in snapshot:
    print(key)

# with open('./dataset/hackupc-travelperk-dataset.csv', newline='') as csvfile:
#     reader = csv.reader(csvfile, quotechar='|')
#     next(reader, None) 
#     for row in reader:
#         user_id = f"/users/User{row[0]}"
#         ref = db.reference(user_id.lower())
#         user_data = {
#             "name": row[1],
#             "travels": {
#             "travel1":{
#             "departure_date": convert_date_to_iso(row[2]),
#             "return_date": convert_date_to_iso(row[3]),
#             "departure_city": row[4],
#             "arrival_city": row[5],
#             },
#             }
#         }
#         ref.set(user_data)  # Añadir datos a Firebase

#print(testPerson.name)
#print(testPerson)