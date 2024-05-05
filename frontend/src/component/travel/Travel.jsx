import React from "react";

const Travel = ({salida, fechaSalida, destino, fechaDestino}) => {
    
    const iata = [
    {
      "codigo_iata": "MAD",
      "nombre_aeropuerto": "Madrid-Barajas Adolfo Suárez Airport",
      "ciudad": "Madrid",
      "pais": "España"
    },
    {
      "codigo_iata": "BCN",
      "nombre_aeropuerto": "Barcelona-El Prat Airport",
      "ciudad": "Barcelona",
      "pais": "España"
    },
    {
      "codigo_iata": "CDG",
      "nombre_aeropuerto": "Charles de Gaulle Airport",
      "ciudad": "París",
      "pais": "Francia"
    },
    {
      "codigo_iata": "ORY",
      "nombre_aeropuerto": "Paris Orly Airport",
      "ciudad": "París",
      "pais": "Francia"
    },
    {
      "codigo_iata": "LHR",
      "nombre_aeropuerto": "Heathrow Airport",
      "ciudad": "Londres",
      "pais": "Reino Unido"
    },
    {
      "codigo_iata": "LGW",
      "nombre_aeropuerto": "Gatwick Airport",
      "ciudad": "Londres",
      "pais": "Reino Unido"
    },
    {
      "codigo_iata": "FCO",
      "nombre_aeropuerto": "Leonardo da Vinci-Fiumicino Airport",
      "ciudad": "Roma",
      "pais": "Italia"
    },
    {
      "codigo_iata": "MXP",
      "nombre_aeropuerto": "Milan Malpensa Airport",
      "ciudad": "Milán",
      "pais": "Italia"
    },
    {
      "codigo_iata": "IST",
      "nombre_aeropuerto": "Istanbul Atatürk Airport",
      "ciudad": "Estambul",
      "pais": "Turquía"
    },
    {
      "codigo_iata": "SAW",
      "nombre_aeropuerto": "Istanbul Sabiha Gökçen International Airport",
      "ciudad": "Estambul",
      "pais": "Turquía"
    },
    {
      "codigo_iata": "JFK",
      "nombre_aeropuerto": "John F. Kennedy International Airport",
      "ciudad": "Nueva York",
      "pais": "Estados Unidos"
    },
    {
      "codigo_iata": "LAX",
      "nombre_aeropuerto": "Los Angeles International Airport",
      "ciudad": "Los Ángeles",
      "pais": "Estados Unidos"
    },
    {
      "codigo_iata": "MCO",
      "nombre_aeropuerto": "Orlando International Airport",
      "ciudad": "Orlando",
      "pais": "Estados Unidos"
    },
    {
      "codigo_iata": "SFO",
      "nombre_aeropuerto": "San Francisco International Airport",
      "ciudad": "San Francisco",
      "pais": "Estados Unidos"
    },
    {
      "codigo_iata": "LAS",
      "nombre_aeropuerto": "McCarran International Airport",
      "ciudad": "Las Vegas",
      "pais": "Estados Unidos"
    },
    {
      "codigo_iata": "DXB",
      "nombre_aeropuerto": "Dubai International Airport",
      "ciudad": "Dubai",
      "pais": "Emiratos Árabes Unidos"
    },
    {
      "codigo_iata": "BKK",
      "nombre_aeropuerto": "Suvarnabhumi Airport",
      "ciudad": "Bangkok",
      "pais": "Tailandia"
    },
    {
      "codigo_iata": "HND",
      "nombre_aeropuerto": "Tokyo Haneda Airport",
      "ciudad": "Tokio",
      "pais": "Japón"
    },
    {
      "codigo_iata": "NRT",
      "nombre_aeropuerto": "Narita International Airport",
      "ciudad": "Narita",
      "pais": "Japón"
    },
    {
      "codigo_iata": "DEL",
      "nombre_aeropuerto": "Indira Gandhi International Airport",
      "ciudad": "Delhi",
      "pais": "India"
    },
    {
      "codigo_iata": "BOM",
      "nombre_aeropuerto": "Chhatrapati Shivaji Maharaj International Airport",
      "ciudad": "Bombay",
      "pais": "India"
    },
    {
      "codigo_iata": "CUN",
      "nombre_aeropuerto": "Cancún International Airport",
      "ciudad": "Cancún",
      "pais": "México"
    },
    {
      "codigo_iata": "AMS",
      "nombre_aeropuerto": "Amsterdam Airport Schiphol",
      "ciudad": "Ámsterdam",
      "pais": "Países Bajos"
    },
    {
      "codigo_iata": "ATH",
      "nombre_aeropuerto": "Athens International Airport",
      "ciudad": "Atenas",
      "pais": "Grecia"
    },
    {
      "codigo_iata": "VCE",
      "nombre_aeropuerto": "Venice Marco Polo Airport",
      "ciudad": "Venecia",
      "pais": "Italia"
    },
    {
      "codigo_iata": "MUC",
      "nombre_aeropuerto": "Munich Airport",
      "ciudad": "Múnich",
      "pais": "Alemania"
    },
    {
      "codigo_iata": "BRU",
      "nombre_aeropuerto": "Brussels Airport",
      "ciudad": "Bruselas",
      "pais": "Bélgica"
    },
    {
      "codigo_iata": "BER",
      "nombre_aeropuerto": "Berlin Brandenburg Airport",
      "ciudad": "Berlín",
      "pais": "Alemania"
    },
    {
      "codigo_iata": "FRA",
      "nombre_aeropuerto": "Frankfurt am Main Airport",
      "ciudad": "Fráncfort del Meno",
      "pais": "Alemania"
    },
    {
      "codigo_iata": "CPT",
      "nombre_aeropuerto": "Cape Town International Airport",
      "ciudad": "Ciudad del Cabo",
      "pais": "Sudáfrica"
    },
    {
      "codigo_iata": "IST",
      "nombre_aeropuerto": "Istanbul Airport",
      "ciudad": "Estambul",
      "pais": "Turquía"
    },
    {
      "codigo_iata": "DUB",
      "nombre_aeropuerto": "Dublin Airport",
      "ciudad": "Dublín",
      "pais": "Irlanda"
    },
    {
      "codigo_iata": "PRG",
      "nombre_aeropuerto": "Václav Havel Airport Prague",
      "ciudad": "Praga",
      "pais": "República Checa"
    },
    {
      "codigo_iata": "CPH",
      "nombre_aeropuerto": "Copenhagen Airport",
      "ciudad": "Copenhague",
      "pais": "Dinamarca"
    },
    {
      "codigo_iata": "LIS",
      "nombre_aeropuerto": "Lisbon Portela Airport",
      "ciudad": "Lisboa",
      "pais": "Portugal"
    },
    {
      "codigo_iata": "HEL",
      "nombre_aeropuerto": "Helsinki Airport",
      "ciudad": "Helsinki",
      "pais": "Finlandia"
    },
    {
      "codigo_iata": "BNE",
      "nombre_aeropuerto": "Brisbane Airport",
      "ciudad": "Brisbane",
      "pais": "Australia"
    },
    {
      "codigo_iata": "PER",
      "nombre_aeropuerto": "Perth Airport",
      "ciudad": "Perth",
      "pais": "Australia"
    },
    {
      "codigo_iata": "AKL",
      "nombre_aeropuerto": "Auckland Airport",
      "ciudad": "Auckland",
      "pais": "Nueva Zelanda"
    },
    {
      "codigo_iata": "ZRH",
      "nombre_aeropuerto": "Zurich Airport",
      "ciudad": "Zúrich",
      "pais": "Suiza"
    },
    {
      "codigo_iata": "VIE",
      "nombre_aeropuerto": "Vienna International Airport",
      "ciudad": "Viena",
      "pais": "Austria"
    }
  ]
 
    return(
        <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white mx-3">
            <div className="p-4">
                <p className="text-gray-700 font-semibold">Salida: {salida} el {fechaSalida}</p>
                <p className="text-gray-700 font-semibold">Destino: {destino} el {fechaDestino}</p>
            </div>
        </div>

    )
};

export default Travel;