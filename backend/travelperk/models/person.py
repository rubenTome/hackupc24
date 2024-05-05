from datetime import datetime

class Person():
    def __init__(self, object):
        self.id = object[1]
        self.json = object[0]

        travelList = []
        index = 1

        self.name = self.json['name']
        self.travelList = self.json['travels']

    def convert_date_to_iso(self, date_str):
        date_obj = datetime.strptime(date_str, "%d/%m/%Y")
        iso_date = date_obj.strftime("%Y-%m-%d")
        return iso_date
    
    def getName(self):
        return self.name

    def getTravel(self):
        return self.travelList[list(self.travelList.keys())[0]]
    
    def getTravelList(self):
        return self.travelList