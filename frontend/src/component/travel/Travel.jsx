import React from "react";

const Travel = ({salida, fechaSalida, destino, fechaDestino}) => {
 
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