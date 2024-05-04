from datetime import datetime

class Person():
    def __init__(self, object):
        #print(object)
        self.id = object[1]
        self.json = object[0]

        travelList = []
        index = 1
        # for travelKey in self.json['travels']:
        #     travel = self.json['travels'][travelKey]

        #     # arrivalCity = travel['arrival_city']
        #     # departureCity = travel['departure_city']
        #     # departureDate = travel['departure_date']
        #     # returnDate = travel['return_date']

        #     travelName = f'travel{index}'

        #     travelList.append((travelName, travel))

        #     index+=1

        self.name = self.json['name']
        self.travelList = self.json['travels']

    def convert_date_to_iso(self, date_str):
        # Parsear la fecha original
        date_obj = datetime.strptime(date_str, "%d/%m/%Y")
        # Formatear al formato ISO 8601
        iso_date = date_obj.strftime("%Y-%m-%d")
        return iso_date
    
    def getName(self):
        return self.name

    #Cojo el primero, idealmente coges el más cercano
    def getTravel(self):
        return self.travelList[list(self.travelList.keys())[0]]
    
    def getTravelList(self):
        return self.travelList