import React from "react";
import logo from "../../assets/img/Logo_TravelPerk.png";
import Trip from "../trip";


const Home = () => {
    
    return (
        <main>
            <nav className="border-b border-black-500 shadow-md p-4 flex items-center justify-between mb-10">
                <img src={logo} alt="Logo" className="w-48"/>
                
                <div className="flex">
                    <button className="text-white rounded-l-lg border  bg-blue-500 hover:bg-white hover:text-blue-500 focus:outline-none px-4 py-2">Trip</button>
                    <button className="text-blue-500 rounded-r-lg border  bg-white hover:bg-blue-500 hover:text-white focus:outline-none px-4 py-2">Social</button>
                </div>

                <div></div>
            </nav>

            <div className="flex justify-center">
                <Trip />
            </div>
        </main>

    );
};

export default Home;