import React from "react";
import Card from "../card/Card";
import { useEffect, useState, response } from "react";
import Map from "../map";

const Social = () => {

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/evento?ciudad=London');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                setEventos(data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchData();
    }, []);

    // Estado para el número de página actual
    const [currentPage, setCurrentPage] = useState(1);
    // Cantidad de eventos por página
    const eventosPorPagina = 2;

    // Índices del primer y último evento en la página actual
    const indiceUltimoEvento = currentPage * eventosPorPagina;
    const indicePrimerEvento = indiceUltimoEvento - eventosPorPagina;
    // Eventos para la página actual
    const eventosActuales = eventos.slice(indicePrimerEvento, indiceUltimoEvento);

    // Función para cambiar de página
    const cambiarPagina = (numeroPagina) => {
        setCurrentPage(numeroPagina);
    };


    return(
        <div className="grid grid-cols-4 grid-rows-4 gap-4">
            <div className="flex flex-col col-start-1 col-end-1 row-start-1 row-end-4">
                <h1 className="text-blue-500 text-2xl font-bold">Amigos:</h1>
                <div className="border-2 border-blue-500 rounded p-2 mb-3">
                    <img src="" alt="foto amigo" className="h-20 w-20" />
                    <p className="mt-2 ml-2">Pedro</p>
                </div>
            </div>

            <div className="col-start-2 col-end-4 row-start-1 row-end-2">
                <div className="flex justify-center">
                    <div className="flex items-center">
                        <label htmlFor="buscar" className="block font-medium text-gray-700 mx-2">Buscar:</label>
                        <input type="search" name="buscar" id="buscar" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500" />
                        <button className="bg-blue-500 g-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">Buscar</button>
                    </div>
                </div>
            </div>

            <div className="col-start-2 col-end-5 row-start-3 row-end-5">
                <div className="mt-4">
                    <div id="expositorEventos" className="grid grid-cols-2 gap-4">
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

            <div className="col-start-2 col-end-5 row-start-5 row-end-8">
               

            </div>


        </div>




    )
};

export default Social;