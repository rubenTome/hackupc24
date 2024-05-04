import React from "react";
import Card from "../card/Card";
import { useEffect, useState, response } from "react";
import Map from "../map";
import Travel from "../travel/Travel";

const Social = () => {

    const [eventos, setEventos] = useState([]);
    const [ciudad, setCiudad] = useState(null);

    useEffect(() => {
        const fetchData = async () => {  
            if (ciudad === null) {
                return;
            }
            if (ciudad === "") {//VIAJE MAS RECIENTE
                return
            }
            try {
                console.log(ciudad)
                const response = await fetch("http://127.0.0.1:5000/evento?ciudad=" + ciudad);
                console.log(response)

                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                setEventos(data);
                console.log(data)
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchData();
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

    return(
        <div className="grid grid-cols-4 gap-4">

            <div className="col-span-full">
                <div className="flex flex-col">
                    <h1 className="text-blue-500 text-2xl font-bold mb-4">Amigos:</h1>
                    <div className="p-2 mb-3 flex">
                        <Travel />

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
                </div>
            </div>

            <div className="col-span-full flex justify-center items-center ">
                <div className="rounded-md p-3 rounded-lg overflow-hidden shadow-lg bg-white w-3/4">
                    <Map ciudad={ciudad}/>
                </div>
            </div>
        </div>


    )
};

export default Social;