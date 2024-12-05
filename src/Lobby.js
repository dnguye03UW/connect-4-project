import React, { useState } from 'react';
import { LobbyClient } from 'boardgame.io/client';
import './Pages/Lobby.css';

const lobbyClient = new LobbyClient({ server: 'http://localhost:8000' });

const ConnectFourLobby = ({ onMatchJoined }) => {
  const [playerName, setPlayerName] = useState('');
  const [matchID, setMatchID] = useState('');
  const [creatingMatch, setCreatingMatch] = useState(false);
  const [matchFull, setMatchFull] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [playerData, setPlayerData] = useState({});

  /** NOTE: 
   * React's useState does not immediately have the values ready upon updating.
   * You need to save the values in variables manually.
   * 
   * HOWEVER, local variables are not saved and are reset every render, but once
   * the local variables have been cleared, the state variables have been updated.
   * This means by the time onMatchJoined(matchID, playerData) is called when the host is joining,
   * the state variables have been updated and the local variables are now undefined.
   */
  var activeMatchID, activePlayerName, activePlayerData;
  function saveMatchID(value) {
    activeMatchID = value;
    setMatchID(value);
  }
  function savePlayerName(value) {
    activePlayerName = value;
    setPlayerName(value);
  }
  function savePlayerData(value) {
    console.log(value);
    activePlayerData = value;
    setPlayerData(value);
  }

  const handleCreateMatch = async () => {
    // Save the player name
    savePlayerName(document.getElementById('name_input').value);

    // Create a new match and save the ID
    const newMatch = await lobbyClient.createMatch('connect-four', {
      numPlayers: 2
    });
    saveMatchID(newMatch.matchID);

    // Change HTML layout
    setCreatingMatch(true);

    // Join the match and save token for authentication
    const playerToken = await lobbyClient.joinMatch(
      'connect-four', activeMatchID, { playerName: activePlayerName }
    );
    savePlayerData(playerToken);
  };

  const handleJoinMatch = async () => {
    // Reset error conditions
    setNotFound(false);
    setMatchFull(false);

    // Save the player name and lobby ID
    savePlayerName(document.getElementById('name_input').value);
    saveMatchID(document.getElementById('lobby_input').value);

    // Attempt to connect to given match, stop if not found
    let match;
    try {
      match = await lobbyClient.getMatch('connect-four', activeMatchID);
    }
    catch (exception) {
      setNotFound(true);
      return;
    }

    // Attempt to connect to match, check if lobby is full by checking if 2nd player has a name and stop if full
    //   (if it does not, there is no 2nd player)
    if ('name' in match.players[1]) {
      setMatchFull(true);
      return;
    }

    // Join the match and save token for authentication
    const playerToken = await lobbyClient.joinMatch(
      'connect-four', activeMatchID, { playerName: activePlayerName }
    );
    savePlayerData(playerToken);

    onMatchJoined(activeMatchID, activePlayerData);
    setMatchFull(false);
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
        id='name_input'
        disabled={matchID}
      />
      {!creatingMatch ? (
        <>
          <input
            type="text"
            placeholder="Enter Match ID to join"
            value={matchID}
            onChange={(e) => setMatchID(e.target.value)}
            className="lobby-input"
            id='lobby_input'
          />
          <button
            onClick={handleJoinMatch}
            className="lobby-button"
            disabled={!playerName || !matchID}
          >
            Join Match
          </button>

          {matchFull &&
            <p className='error-message'>Lobby is full!</p>
          }

          {notFound &&
            <p className='error-message'>Lobby not found!</p>
          }

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
          <p>After you have shared the code, join the lobby!</p>
          <button
            onClick={() => onMatchJoined(matchID, playerData)}
            className="lobby-button"
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectFourLobby;