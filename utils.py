import firebase_admin
from firebase_admin import db
import csv
import json
from backend.travelperk.models.person import Person
from datetime import datetime
import pandas as pd
import numpy as np
import random
from dateutil.relativedelta import relativedelta

databaseURL = 'https://hackudc-49b6e-default-rtdb.europe-west1.firebasedatabase.app/'

cred_obj = firebase_admin.credentials.Certificate('./key.json')
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL':databaseURL
	})

# As an admin, the app has access to read and write all data, regradless of Security Rules
# ref = db.reference('users/user1')
# print(ref.get('/'))

def convert_date_to_iso(date_str):
    # Parsear la fecha original
    date_obj = datetime.strptime(date_str, "%d/%m/%Y")
    # Formatear al formato ISO 8601
    iso_date = date_obj.strftime("%Y-%m-%d")
    return iso_date

ref = db.reference('/users')
# snapshot = ref.order_by_child('departure_date').limit_to_first(10).get()
# for key, val in snapshot.items():
#     print('{0} was {1} meters tall'.format(key, val))

# data = ref.get()
# #print(data)

# concatenated_df = pd.DataFrame()

# for user in data:
#     # print(user)
#     # print(data[user])
#     df = pd.json_normalize(data[user])
#     concatenated_df = pd.concat([concatenated_df, df], axis=0, ignore_index=True)


# concatenated_df.columns = ['name','arrival_city','departure_city','departure_date','return_date']

# df_sorted = concatenated_df.sort_values(by='departure_date', ascending=True)

# def matchUsers(df_sorted, arrival_city, departure_date, return_date):
#     ref = db.reference('/users')
#     data = ref.get()
#     #print(data)

#     concatenated_df = pd.DataFrame()

#     for user in data:
#         # print(user)
#         # print(data[user])
#         df = pd.json_normalize(data[user])
#         concatenated_df = pd.concat([concatenated_df, df], axis=0, ignore_index=True)


#     concatenated_df.columns = ['name','arrival_city','departure_city','departure_date','return_date']

#     df_sorted = concatenated_df.sort_values(by='departure_date', ascending=True)


#     print(arrival_city)

#     df_sorted = df_sorted[df_sorted["arrival_city"]==arrival_city]

#     print(df_sorted[df_sorted['return_date']>return_date])

#     # Condiciones para la superposición
#     condition1 = (df_sorted['departure_date'] >= departure_date) & (df_sorted['departure_date'] <= return_date)
#     condition2 = (df_sorted['return_date'] >= departure_date) & (df_sorted['return_date'] <= return_date)
#     condition3 = (df_sorted['departure_date'] <= departure_date) & (df_sorted['return_date'] >= return_date)

#     # Filtrar filas donde haya superposición con el intervalo objetivo
#     filtered_df = df_sorted[condition1 | condition2 | condition3]

#     return filtered_df['name'].to_list()

# print(matchUsers(df_sorted, "Barcelona", "2024-05-15", "2024-06-15"))

#print(df_sorted)

# all_data = {
#     "users": data
# }

# print(data)

# df = pd.json_normalize([data])

# print(df.head())

# ref = db.reference('users')
# snapshot = ref.order_by_child('arrival_city').get()
# for key, val in snapshot.items():
#     print('{0} was {1} meters tall'.format(key, val))

# print(ref.get('/'))

# ref = db.reference('users')
# snapshot = ref.order_by_child('name').equal_to("Anderson Hudson").get()
# for key in snapshot:
#     print(key)

# def generateRandomReasons(longitud):
#     # Definir las opciones como strings
#     opciones = ["leisure", "cultural", "family"]

#     # Definir pesos para cada opción
#     # Por ejemplo, el ocio tiene un 50% de probabilidad, cultural un 30%, y familiar un 20%
#     pesos = [0.5, 0.3, 0.2]  # La suma de todos los pesos debe ser 1.0 o proporcional

#     # Generar una lista aleatoria de 10 elementos usando los pesos definidos
#     lista_aleatoria = random.choices(opciones, pesos, k=longitud)

#     return lista_aleatoria

# with open('./dataset/hackupc-travelperk-dataset.csv', newline='') as csvfile:
#     row_count = sum(1 for _ in csvfile)  # Contar cuántas líneas hay en total

# print("Total de filas en el CSV:", row_count)

# with open('./dataset/hackupc-travelperk-dataset.csv', newline='') as csvfile:
#     reader = csv.reader(csvfile, quotechar='|')
#     randomList = generateRandomReasons(row_count)
#     next(reader, None) 
#     for i, row in enumerate(reader):
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
#             "travel_type": randomList[i]
#             },
#             }
#         }
#         ref.set(user_data)  # Añadir datos a Firebase

#print(testPerson.name)
#print(testPerson)
def valuesToPlot():
    ref = db.reference('/users')
    data = ref.get()
    #print(data)

    fecha_actual = datetime.now()  # También puedes usar datetime.today()

    # Restar un mes usando relativedelta
    fecha_menos_un_mes = fecha_actual - relativedelta(months=2)

    # Formatear la fecha como Año-Mes-Día
    fecha_actual_formateada = fecha_actual.strftime("%Y-%m-%d")
    fecha_pasada_formateada = fecha_menos_un_mes.strftime("%Y-%m-%d")

    print(fecha_actual_formateada, fecha_pasada_formateada  )

    concatenated_df = pd.DataFrame()

    for user in data:
        # print(user)
        # print(data[user])
        df = pd.json_normalize(data[user])
        concatenated_df = pd.concat([concatenated_df, df], axis=0, ignore_index=True)


    concatenated_df.columns = ['name','arrival_city','departure_city','departure_date','return_date','travel_type']

    df_sorted = concatenated_df.sort_values(by='departure_date', ascending=True)

    df_sorted = df_sorted[df_sorted["arrival_city"]=="Barcelona"]

    condicion_interseccion = (
        (df_sorted['departure_date'] <= fecha_actual_formateada) & 
        (df_sorted['return_date'] >= fecha_pasada_formateada)
    )

    # Filtrar filas que cumplen con esta condición
    df_filtered = df_sorted[condicion_interseccion]

    travelTypes = df_filtered['travel_type'].unique()
    uniqueCounts = df_filtered['travel_type'].value_counts().values

    plotValues = {}

    for value1, value2 in zip(travelTypes,uniqueCounts):
        plotValues[value1] = value2

    return plotValues

print(valuesToPlot())



#return df_sorted['name'].to_list()