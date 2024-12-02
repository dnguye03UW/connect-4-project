import React, { useState } from 'react';
import './Pages/LobbySetup.css';

const LobbySetup = ({ onMatchJoined }) => {
  const [playerName, setPlayerName] = useState('');
  const [matchID, setMatchID] = useState('');
  const [creatingMatch, setCreatingMatch] = useState(false);

  const handleCreateMatch = () => {
    const newMatchID = Math.random().toString(36).substr(2, 9);
    setMatchID(newMatchID);
    setCreatingMatch(true);
  };

  const handleJoinMatch = () => {
    onMatchJoined(playerName, matchID, false);
  };

  const handleStartGame = () => {
    onMatchJoined(playerName, matchID, true);
  };

  return (
    <div className="lobby-container">
      <h2 className="lobby-title">Connect Four Lobby</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="lobby-input"
      />
      {!creatingMatch ? (
        <>
          <input
            type="text"
            placeholder="Enter Match ID to join"
            value={matchID}
            onChange={(e) => setMatchID(e.target.value)}
            className="lobby-input"
          />
          <button
            onClick={handleJoinMatch}
            className="lobby-button"
            disabled={!playerName || !matchID}
          >
            Join Match
          </button>
          <button
            onClick={handleCreateMatch}
            className="lobby-button"
            disabled={!playerName}
          >
            Create New Match
          </button>
        </>
      ) : (
        <div className="created-match">
          <p>Match created! Share this Match ID with your opponent:</p>
          <p className="match-id">{matchID}</p>
          <button
            onClick={handleStartGame}
            className="lobby-button"
            disabled={!playerName}
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};

export default LobbySetup;