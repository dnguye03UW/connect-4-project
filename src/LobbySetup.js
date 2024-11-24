import React, { useState } from 'react';

const LobbySetup = ({ onMatchJoined }) => {
  const [playerName, setPlayerName] = useState('');
  const [matchID, setMatchID] = useState('');
  const [creatingMatch, setCreatingMatch] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleCreateMatch = () => {
    const newMatchID = Math.random().toString(36).substr(2, 9);
    setMatchID(newMatchID);
    setCreatingMatch(true);
    // Do not call onMatchJoined yet
  };

  const handleJoinMatch = () => {
    onMatchJoined(playerName, matchID, false);
  };

  const handleStartGame = () => {
    // Now call onMatchJoined
    onMatchJoined(playerName, matchID, true);
  };

  return (
    <div style={lobbyContainerStyle}>
      <h2>Connect Four Lobby</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        style={inputStyle}
      />
      {!creatingMatch ? (
        <>
          <input
            type="text"
            placeholder="Enter Match ID to join"
            value={matchID}
            onChange={(e) => setMatchID(e.target.value)}
            style={inputStyle}
          />
          <button
            onClick={handleJoinMatch}
            style={buttonStyle}
            disabled={!playerName || !matchID}
          >
            Join Match
          </button>
          <button
            onClick={handleCreateMatch}
            style={buttonStyle}
            disabled={!playerName}
          >
            Create New Match
          </button>
        </>
      ) : (
        <div style={createdMatchStyle}>
          <p>Match created! Share this Match ID with your opponent:</p>
          <p style={matchIDStyle}>{matchID}</p>
          <button
            onClick={handleStartGame}
            style={buttonStyle}
            disabled={!playerName}
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};


const lobbyContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '50px',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  margin: '10px',
  width: '300px',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  margin: '10px',
};

const matchIDStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
};

const createdMatchStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};


export default LobbySetup;
