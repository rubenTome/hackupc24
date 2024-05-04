import React from "react";

const Trip = () => {
    
    return (
        <div className="space-y-4">
            <div className="flex">
                <button className="rounded-l-lg border border-gray-300 bg-white hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-500 px-4 py-2">Avion</button>
                <button className="border border-gray-300 bg-white hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-500 px-4 py-2">Tren</button>
                <button className="rounded-r-lg border border-gray-300 bg-white hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-500 px-4 py-2">Coche</button>
            </div>

            <div>
                <label htmlFor="salida" className="block font-medium text-gray-700">Salida: </label>
                <input type="text" name="salida" id="salida" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500" />
                <input type="date" name="fechaSalida" id="fechaSalida" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 mx-5" />

            </div>

            <div>
                <label htmlFor="destino" className="block font-medium text-gray-700">Destino:</label>
                <input type="text" name="destino" id="destino" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500" />
                <input type="date" name="fechaLlegada" id="fechaLlegada" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 mx-5" />
            </div>

            <button className="bg-blue-500 g-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Buscar</button>
        </div>
    );
};

export default Trip;