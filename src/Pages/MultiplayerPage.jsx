import React, { useState } from 'react';
import { Client } from 'boardgame.io/react';
import { ConnectFour } from '../Game/Game.js';
import { ConnectFourBoard } from '../Game/Board.js';
import { SocketIO } from 'boardgame.io/multiplayer';
import { headerStyle, mainStyle } from '../Data/inlineStyle.js';
import LobbySetup from '../LobbySetup';

const ConnectFourClient = Client({
    game: ConnectFour(),
    board: ConnectFourBoard,
    multiplayer: SocketIO({ server: 'http://localhost:8000' }),
    debug: true
  });

function MultiplayerPage() {
    const [playerName, setPlayerName] = useState(null);
  const [playerID, setPlayerID] = useState(null);
  const [matchID, setMatchID] = useState(null);

  const onMatchJoined = (name, matchID, isCreator) => {
    setPlayerName(name);
    setMatchID(matchID);
    // Assign player ID based on whether the player is creating or joining
    setPlayerID(isCreator ? '0' : '1');
  };

  return (
    <div style={fullDisplay}>
      <div className="header" style={headerStyle}>
        <p>Connect Four Online</p>
      </div>

      <div style={mainStyle}>
        {!playerID ? (
          <LobbySetup onMatchJoined={onMatchJoined} />
        ) : (
          <div style={boardFlexStyle}>
            <ConnectFourClient
              playerID={playerID}
              matchID={matchID}
              credentials={playerName}
            />
          </div>
        )}

        <div style={chatFlexStyle}>
          {/* Chat functionality or additional components can be added here */}
        </div>
      </div>
    </div>
  );
}

const fullDisplay = {
    minHeight: '100vh',
  };
  
  const boardFlexStyle = {
    flexBasis: '75%',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  };
  
  const chatFlexStyle = {
    flexBasis: '25%',
    background: 'lightgrey',
  };

export default MultiplayerPage;