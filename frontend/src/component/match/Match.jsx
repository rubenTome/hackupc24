import React from "react";

const Match = ({name, arrival}) => {
    return(
        <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
            <div className="font-bold text-lg mb-2">{name}</div>
            <div className="text-gray-600">{arrival}</div>
        </div>


    )
};

export default Match;