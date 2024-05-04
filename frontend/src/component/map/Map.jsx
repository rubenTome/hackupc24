import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Estilo personalizado para el marcador
const markerIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const Map = ({ ciudad }) => {

    const [loc, setLoc] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (ciudad === null) {
                return;
            }
            try {
                const response = await fetch("http://127.0.0.1:5000/lugares?ciudad=" + ciudad);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                setLoc(data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchData();
    }, [ciudad]);

    const position = [51.505, -0.09];

    const example = (<div className="w-full h-96 mb-9">
        <h1 className="text-blue-500 text-2xl font-bold">Mapa</h1>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="w-full h-full">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
                {loc.map((localizacion, index) => 
                        <Marker position={[localizacion.cords.latitude, localizacion.cords.longitude]} icon={markerIcon}>
                            <Popup>
                                {localizacion.nombre}
                            </Popup>
                        </Marker>
                    )
                }
        </MapContainer>
    </div>)

    return (example);
};

export default Map;
