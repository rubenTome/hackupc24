import React from "react";

const Social = () => {
    return(
        <div className="flex justify-between">
    <div className="flex flex-col">
        <h1 className="text-blue-500 text-2xl font-bold">Amigos:</h1>
        <div className="border-2 border-blue-500 rounded p-2 mb-3">
            <img src="" alt="foto amigo" className="h-20 w-20" />
            <p className="mt-2 ml-2">Pedro</p>
        </div>
    </div>

    <div className="flex items-center">
        <label htmlFor="buscar" className="block font-medium text-gray-700 mb-2">Buscar:</label>
        <input type="search" name="buscar" id="buscar" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500" />

    </div>
</div>

    )
};

export default Social;