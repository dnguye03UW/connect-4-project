import React, { useState, useEffect } from "react";
import { headerStyle, mainStyle } from "./Data/inlineStyle";
import ConnectFourClient from "./Client"; // Assuming Client.js exports ConnectFourClient

const App = () => {
  const [playerNames, setPlayerNames] = useState({});

  useEffect(() => {
    if (!playerNames[0] || !playerNames[1]) {
      const name1 = prompt("Enter Player 1 Name:") || "Player 1";
      const name2 = prompt("Enter Player 2 Name:") || "Player 2";
      setPlayerNames({ 0: name1, 1: name2 });
    }
  }, [playerNames]);

  // Render a loading state until player names are set
  if (!playerNames[0] || !playerNames[1]) {
    return <div>Loading...</div>;
  }

  return (
    <div style={fullDisplay}>
      {/* Header Section */}
      <div className="header" style={headerStyle}>
        <p>Connect Four Online</p>
      </div>

      {/* Main Content Section */}
      <div style={mainStyle}>
        <div style={boardFlexStyle}>
          {/* Pass playerNames dynamically */}
          <ConnectFourClient playerID={null} playerNames={playerNames} />
        </div>
      </div>
    </div>
  );
};

const fullDisplay = {
  minHeight: "100vh",
};

const boardFlexStyle = {
  flexBasis: "75%",
  display: "flex",
  justifyContent: "center",
};

export default App;
