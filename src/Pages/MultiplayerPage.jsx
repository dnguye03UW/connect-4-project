import React, { useState } from 'react';
import { Client } from 'boardgame.io/react';
import { ConnectFour } from '../Game/Game.js';
import { ConnectFourBoard } from '../Game/Board.js';
import { SocketIO } from 'boardgame.io/multiplayer';
import LobbySetup from '../LobbySetup';
import Chat from '../Chat.js';
import './MultiplayerPage.css'; // Import the CSS

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
    setPlayerID(isCreator ? '0' : '1');
  };

  return (
    <div className="multiplayer-container">
      <div className="multiplayer-header">
        <p>Connect Four Online</p>
      </div>

      <div className="multiplayer-main">
        {!playerID ? (
          <LobbySetup onMatchJoined={onMatchJoined} />
        ) : (
          <div className="board-section">
            <ConnectFourClient
              playerID={playerID}
              matchID={matchID}
              credentials={playerName}
            />
          </div>
        )}

        <div className="chat-section">
          {playerID && playerName && matchID && (
            <Chat matchID={matchID} playerName={playerName} />
          )}
        </div>
      </div>
    </div>
  );
}

export default MultiplayerPage;
