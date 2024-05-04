import React from "react";
import { useNavigate } from "react-router-dom";


const Inicio = () => {
    const navigate = useNavigate()

    const cambiarPag = () => {
        navigate("/buscador")
    }

    return (
        <main >
            
            
        </main>
    );
};

export default Inicio;