import React from "react";
import Card from "../card/Card";
const Social = () => {
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
                        <Card />
                        <Card />
                    </div>
                </div>
            </div>
        </div>




    )
};

export default Social;