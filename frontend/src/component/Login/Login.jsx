import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        setUser(username);
        navigate('/'); // Redirecciona al usuario a la página de inicio
    }

    const handleInputChange = (event) => {
        setUsername(event.target.value);
    }

    return(
        <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
            <div className="p-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
                <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 w-full mb-3" 
                    value={username} 
                    onChange={handleInputChange} 
                />
                <button 
                    onClick={handleClick}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                >
                    Acceder
                </button>
            </div>
        </div>
    )
};

export default Login;
