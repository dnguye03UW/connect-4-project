import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const toMultiplayer = () => {
        navigate('/multiplayer');
    }
    const toSolo = () => {
        navigate('/solo');
    }

    return (
        <div className="full-display">
            <div className="header">
                <p>Connect Four Online</p>
            </div>
            <div className="directions">
                <p>Choose your mode to start playing!</p>
            </div>
            <div className="button-container">
                <button onClick={toSolo} className="game-button">Solo</button>
                <button onClick={toMultiplayer} className="game-button">Multiplayer</button>
            </div>
        </div>
    );
}

export default Home;