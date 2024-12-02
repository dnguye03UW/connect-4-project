import React from 'react';
import { headerStyle } from '../Data/inlineStyle.js';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const toMultiplayer = () => {
        navigate('/multiplayer');
    }
    const toSolo = () => {
        navigate('/solo');
    }
    return (
        <div style={fullDisplay}>
        <div className="header" style={headerStyle}>
            <p>Connect Four Online</p>
        </div>
        <button
            onClick={toSolo}
            style={buttonStyle}>
        Solo
        </button>
        <button
            onClick={toMultiplayer}
            style={buttonStyle}>
        Multiplayer
        </button>
        </div>
    );
}

const fullDisplay = {
    minHeight: '100vh',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '10px',
  };

export default Home;