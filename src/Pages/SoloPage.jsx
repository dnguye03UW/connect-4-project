import React from 'react';
import { Client } from 'boardgame.io/react';
import { ConnectFour } from '../Game/Game.js';
import { ConnectFourBoard } from '../Game/Board.js';
import { headerStyle, mainStyle } from '../Data/inlineStyle.js';

const ConnectFourClient = Client({
    game: ConnectFour({isCPU: true}),
    board: ConnectFourBoard,
    debug: false
});

function SoloPage() {
    return (
        <div style={fullDisplay}>
        <div className="header" style={headerStyle}>
            <p>Connect Four Online</p>
        </div>
        <div style={boardFlexStyle}>
            <ConnectFourClient 
                playerID='0'/>
        </div>
        </div>
    );
}

const boardFlexStyle = {
    flexBasis: '75%',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  };

export default SoloPage;

const fullDisplay = {
    minHeight: '100vh',
};