import React from "react";
import logo from "../../assets/img/Logo_TravelPerk.png";


const Home = () => {
    
    return (
        <main >
            <nav className="border-b border-black-500 drop-shadow-sm p-4">
                <img src={logo} alt="Logo" 
                className="w-48"/>

                <button className="g-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Trip</button>
                <button>Social</button>
            </nav>


            
        </main>
    );
};

export default Home;