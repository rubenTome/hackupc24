import React from "react";

const Card = () => {
    return(
        <div className="max-w-xs rounded overflow-hidden shadow-lg">
            <img src="" alt="Evento" className="w-full" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Concierto 1</div>
            </div>
            <div className="px-6 py-4">
                <a href="" className="text-blue-500 hover:text-blue-700">Ver más</a>
            </div>
        </div>

    )
};

export default Card;