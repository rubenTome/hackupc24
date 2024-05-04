import React, { useState } from 'react';
import logo from "../../assets/img/Logo_TravelPerk.png";
import Trip from "../trip";
import Social from "../social";



const Home = () => {

    const pages = [Trip, Social]
    const [activePage, setActivePage] = useState(pages[0]);
    
    return (
        <main>
            <nav className="border-b border-black-500 shadow-md p-4 flex items-center justify-between mb-10">
                <img src={logo} alt="Logo" className="w-48"/>
                
                <div className="flex">
                    <button onClick={() => setActivePage(pages[0])} className="text-white rounded-l-lg border  bg-blue-500 hover:bg-white hover:text-blue-500 focus:outline-none px-4 py-2">Trip</button>
                    <button onClick={() => setActivePage(pages[1])} className="text-blue-500 rounded-r-lg border  bg-white hover:bg-blue-500 hover:text-white focus:outline-none px-4 py-2">Social</button>
                </div>

                <div>

                </div>
            </nav>

            <div className="flex justify-center">                
                <div>{activePage}</div>
            </div>
        </main>

    );
};

export default Home;