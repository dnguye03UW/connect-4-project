import React from "react";
import { Client } from "boardgame.io/react";
import { ConnectFour, ConnectFourBoard } from "./Game.jsx";
import { Local } from "boardgame.io/multiplayer";

const ConnectFourClient = Client({
  game: ConnectFour,
  board: ConnectFourBoard,
  multiplayer: Local(),
});

const App = () => (
  <div style={fullDisplay}>

    <div class="header" style={mainHeaderStyle}>
      <p>Connect Four Online</p>
    </div>

    <div style={mainStyle}>

      <div style={boardFlexStyle}>
        <ConnectFourClient playerID="0"/>
        <ConnectFourClient playerID="1"/>
      </div>

      <div style={chatFlexStyle}>

      </div>

    </div>
  </div>
);

const fullDisplay = {
  minHeight: "100vh",
};

const boardFlexStyle = {
  flexBasis: "75%",
  justifyContent: "center",
};

const chatFlexStyle = {
  flexBasis: "25%",
  background: "lightgrey",
};

const mainHeaderStyle = {
  padding: "5px",
  lineHeight: "0px",
  textAlign: "center",
  background: "darkblue",
  color: "white",
  fontSize: "30px",
  fontWeight: "bolder",
};

const mainStyle = {
  display: "flex",
  minHeight: "100vh",
};

export default App;
