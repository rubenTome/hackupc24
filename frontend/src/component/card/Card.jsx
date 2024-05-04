import React from "react";

const Card = ({name, image, url}) => {
    return(
        <div className="max-w-xs rounded overflow-hidden shadow-lg">
            <img src={image} alt="Evento" className="w-full" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{name}</div>
            </div>
            <div className="px-6 py-4">
                <a href={url} className="text-blue-500 hover:text-blue-700">Acceso a la pagina</a>
            </div>
        </div>

    )
};

export default Card;