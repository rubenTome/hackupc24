import React, { useState } from 'react';
import logo from "../../assets/img/Logo_TravelPerk.png";
import Trip from "../trip";
import Social from "../social";


const Home = () => {
    const [activePage, setActivePage] = useState('Trip'); // Inicializa con el nombre de la página
    
    const handleSetActivePage = (pageName) => {
        setActivePage(pageName);
    };
    
    return (
        <main>
            <nav className="border-b border-black-500 shadow-md p-4 flex items-center justify-between mb-10">
                <img src={logo} alt="Logo" className="w-48"/>
                
                <div className="flex">
                    <button 
                        onClick={() => handleSetActivePage('Trip')} 
                        className={`rounded-l-lg border ${activePage === 'Trip' ? 'bg-blue-500 text-white' : 'text-blue-500  bg-white hover:bg-blue-500 hover:text-white'} focus:outline-none px-4 py-2`}
                    >
                        Trip
                    </button>
                    <button 
                        onClick={() => handleSetActivePage('Social')} 
                        className={`rounded-r-lg border ${activePage === 'Social' ? 'bg-blue-500 text-white' : 'text-blue-500  bg-white hover:bg-blue-500 hover:text-white'} focus:outline-none px-4 py-2`}
                    >
                        Social
                    </button>
                </div>

                <div></div>
            </nav>

            <div className="flex justify-center">                
                <div>{activePage === 'Trip' ? <Trip /> : <Social />}</div>
            </div>
        </main>
    );
};


export default Home;