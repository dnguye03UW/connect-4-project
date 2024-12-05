import React, { useState } from 'react';
import { Client } from 'boardgame.io/react';
import { ConnectFour } from '../Game/Game.js';
import { ConnectFourBoard } from '../Game/Board.js';
import { SocketIO } from 'boardgame.io/multiplayer';
import { headerStyle, mainStyle } from '../Data/inlineStyle.js';
import ConnectFourLobby from '../Lobby.js';
import Chatroom from '../Chat.js';

const ConnectFourClient = Client({
  game: ConnectFour(),
  numPlayers: 2,
  board: ConnectFourBoard,
  multiplayer: SocketIO({ server: 'http://localhost:8000' }),
  debug: true
});

function MultiplayerPage() {
  const [matchID, setMatchID] = useState(null);
  const [playerData, setPlayerData] = useState([]);

  /** NOTE: 
   * React's useState does not immediately have the values ready upon updating.
   * You need to save the values in variables manually.
   * 
   * HOWEVER, local variables are not saved and are reset every render, but once
   * the local variables have been cleared, the state variables have been updated.
   */
  let activeMatchID, activePlayerData;
  function saveMatchID(value) {
    activeMatchID = value;
    setMatchID(value);
  }
  function savePlayerData(value) {
    activePlayerData = value;
    setPlayerData(value);
  }

  // Called in Lobby.js
  const onMatchJoined = (matchID, playerToken) => {
    saveMatchID(matchID);
    setMatchID(matchID);
    savePlayerData(playerToken);
    setPlayerData(playerToken);
  };

  return (
    <div style={fullDisplay}>
      <div className="header" style={headerStyle}>
        <p>Connect Four Online</p>
      </div>

      <div style={mainStyle}>
        {/* Render the board on whether or not matchID has been passed from onMatchJoined */}
        {!matchID ? (
          <ConnectFourLobby onMatchJoined={onMatchJoined} />
        ) : (
          <div style={boardFlexStyle}>
            <ConnectFourClient
              playerID={playerData !== undefined ? playerData.playerID : activePlayerData.playerID}
              matchID={matchID !== undefined ? matchID : activeMatchID}
              credentials={playerData !== undefined ? playerData.playerCredentials : activePlayerData.playerCredentials}
            />
            <p>Match ID: {matchID}</p>
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
  flexDirection: 'column',
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
};

const chatFlexStyle = {
  flexBasis: '25%',
  background: 'lightgrey',
};

export default MultiplayerPage;