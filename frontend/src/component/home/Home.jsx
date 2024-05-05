import React, { useState } from 'react';
import logo from "../../assets/img/Logo_TravelPerk.png";
import Trip from "../trip";
import Social from "../social";
import Login from '../Login';
import Information from '../information';

const Home = () => {
    const [activePage, setActivePage] = useState('Trip'); // Inicializa con el nombre de la página
    const [user, setUser] = useState("");
    
    const handleSetActivePage = (pageName) => {
        setActivePage(pageName);
    };
    
    return (
        <main>
            <nav className="border-b border-black-500 shadow-md p-4 flex items-center justify-between mb-10">
                <img src={logo} alt="Logo" className="w-48"/>
                
                {user === "" ? <span /> :
                    (<div className="flex">
                    <button 
                        onClick={() => handleSetActivePage('Trip')} 
                        className={`rounded-l-lg border ${activePage === 'Trip' ? 'bg-blue-500 text-white' : 'text-blue-500  bg-white hover:bg-blue-500 hover:text-white'} focus:outline-none px-4 py-2`}
                    >
                        Trip
                    </button>
                    <button 
                        onClick={() => handleSetActivePage('Social')} 
                        className={`border ${activePage === 'Social' ? 'bg-blue-500 text-white' : 'text-blue-500  bg-white hover:bg-blue-500 hover:text-white'} focus:outline-none px-4 py-2`}
                    >
                        Social
                    </button>
                    <button 
                        onClick={() => handleSetActivePage('Informacion')} 
                        className={`rounded-r-lg border ${activePage === 'Informacion' ? 'bg-blue-500 text-white' : 'text-blue-500  bg-white hover:bg-blue-500 hover:text-white'} focus:outline-none px-4 py-2`}
                    >
                        Informacion
                    </button>
                </div>)
                }
                

                <div className='mx-10'>
                    {user === "" ? <span/>: 
                    <h2 className='text-blue-500 text-xl font-bold'>{user}</h2>

                    }
                </div>
            </nav>



            <div className="flex justify-center">
                {user === "" ? <Login setUser={setUser} /> :
                    <div>
                        {activePage === 'Trip' ? <Trip /> : activePage === 'Social' ? <Social /> : <Information />}
                    </div>
                  
                }
            </div>

        </main>
    );
};


export default Home;