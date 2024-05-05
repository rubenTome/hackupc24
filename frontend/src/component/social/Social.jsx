import React from "react";
import Card from "../card/Card";
import { useEffect, useState, response } from "react";
import Map from "../map";
import Travel from "../travel/Travel";
import Match from "../match/Match";

const Social = ({ user }) => {
    const [matches, setMatches] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [ciudad, setCiudad] = useState(null);
    const [viajes, setViajes] = useState([]);
    const viajesArray = Object.entries(viajes).map(([id, viaje]) => ({
        id,
        ...viaje
    }))
    const matchesArray = Object.entries(matches).map(([id, match]) => ({
        id,
        ...match
    }))

    useEffect(() => {
        try {
            const fetchData = async () => {
                if (user) {
                    const response = await fetch(`http://127.0.0.1:5000/users/${user}/travels`);
                    if (!response.ok) {
                        throw new Error('Error al obtener los viajes');
                    }
                    const data = await response.json();
                    setViajes(data);
                } else {
                    setViajes([])
                }
            };
            fetchData();
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }, [user]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                if (user) {
                    const response = await fetch(`http://127.0.0.1:5000//users/${user}/match`);
                    if (!response.ok) {
                        throw new Error('Error al obtener los matches');
                    }
                    const data = await response.json();
                    console.log(data)
                    setMatches(data);
                } else {
                    setMatches([])
                }
            };
            fetchData();
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }, [user]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                if (user && !ciudad) {
                    const response = await fetch(`http://127.0.0.1:5000/users/${user}/last_travel`);
                    if (!response.ok) {
                        throw new Error('Error al obtener la ciudad más reciente');
                    }
                    const data = await response.json();
                    setCiudad(data.arrival_city);
                } else {
                    setCiudad(null)
                }
            };
            fetchData();
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }, [user]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                if (ciudad) {
                    const response = await fetch(`http://127.0.0.1:5000/evento?ciudad=${ciudad}`);
                    if (!response.ok) {
                        throw new Error('Error al obtener los eventos');
                    }
                    const data = await response.json();
                    setEventos(data);
                } else {
                    setEventos([])
                }
            };
            fetchData();
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }, [ciudad]);



    // Estado para el número de página actual
    const [currentPage, setCurrentPage] = useState(1);
    // Cantidad de eventos por página
    const eventosPorPagina = 4;

    // Índices del primer y último evento en la página actual
    const indiceUltimoEvento = currentPage * eventosPorPagina;
    const indicePrimerEvento = indiceUltimoEvento - eventosPorPagina;
    // Eventos para la página actual
    const eventosActuales = eventos.slice(indicePrimerEvento, indiceUltimoEvento);

    // Función para cambiar de página
    const cambiarPagina = (numeroPagina) => {
        setCurrentPage(numeroPagina);
    };

    const handleClick = (event) => {
        event.preventDefault();
        const input = document.getElementById('buscar');
        if (input) {
            setCiudad(input.value);
        }
    }


    return (
        <div className="grid grid-cols-4 gap-4">

            <div className="col-span-full">
                <div className="flex flex-col">
                    <h1 className="text-blue-500 text-2xl font-bold mb-4">Viajes:</h1>
                    <div className="p-2 mb-3 flex">
                        {viajesArray. length > 0 ? ( // Verificar si hay viajes
                            viajesArray.map((viaje, index) => (
                                <Travel key={index} salida={viaje.departure_city} fechaSalida={viaje.departure_date} destino={viaje.arrival_city} fechaDestino={viaje.return_date}/>
                            ))
                        ) : (
                            <p>No hay viajes disponibles</p> // Mensaje si no hay viajes
                        )}

                    </div>
                </div>
            </div>

            <div className="col-span-full">
                <div className="flex justify-center items-center">
                    <label htmlFor="buscar" className="block font-medium text-gray-700 mx-2">Buscar:</label>
                    <input type="text" name="buscar" id="buscar" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500" />
                    <button onClick={handleClick} id="botonBusqueda" className="bg-blue-500 text-white font-bold py-2 px-4 rounded mx-2 hover:bg-blue-700">Buscar</button>
                </div>
            </div>

            <div className="col-span-full row-span-3">
                <div className="mt-4">
                    <div id="expositorEventos" className="grid grid-cols-4 gap-4">
                        {eventosActuales.map((evento, index) => (
                            <Card
                                key={index}
                                name={evento.name}
                                image={evento.image}
                                url={evento.url}
                            />
                        ))}
                    </div>

                    {/* Controles de paginación */}
                    {eventos == [] ? <div /> :
                        <div className="mt-4">
                            <button
                                onClick={() => cambiarPagina(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="mr-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                            >
                                Anterior
                            </button>
                            <button
                                onClick={() => cambiarPagina(currentPage + 1)}
                                disabled={indiceUltimoEvento >= eventos.length}
                                className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                            >
                                Siguiente
                            </button>
                        </div>
                        
                    }
                    
                </div>
            </div>

            <div className="col-span-full flex justify-center items-center ">
                <div className="rounded-md p-3 overflow-hidden shadow-lg bg-white w-3/4">
                    <Map ciudad={ciudad}
                        setCiudad={setCiudad}
                        user={user}
                    />
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Viajeros Similares</h2>
                {matchesArray.map((evento, index) =>(
                    <Match key={index} name={evento.name} />
                ))}
            </div>

        </div>


    )
};

export default Social;