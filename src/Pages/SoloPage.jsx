import React from 'react';
import { Client } from 'boardgame.io/react';
import { ConnectFour } from '../Game/Game.js';
import { ConnectFourBoard } from '../Game/Board.js';
import { headerStyle, mainStyle } from '../Data/inlineStyle.js';

const ConnectFourClient = Client({
    game: ConnectFour({isCPU: true}),
    board: ConnectFourBoard
});

function SoloPage() {
    return (
        <div style={fullDisplay}>
        <div className="header" style={headerStyle}>
            <p>Connect Four Online</p>
        </div>
        <div style={mainStyle}>
            <ConnectFourClient 
                playerID='0'/>
        </div>
        </div>
    );
}

export default SoloPage;

const fullDisplay = {
    minHeight: '100vh',
};