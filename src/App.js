/*
adapted from tutorials by Patrick Johannessen 
https://www.lonesomecrowdedweb.com/blog/four-in-a-row-boardgameio/
and boardgame.io
https://boardgame.io/documentation/#/tutorial
*/

import React from "react";
import { SocketIO } from 'boardgame.io/multiplayer'
import { headerStyle, mainStyle } from "./Data/inlineStyle.js";
import { Client } from "boardgame.io/react";
import { ConnectFour } from "./Game/Game.js";
import { ConnectFourBoard } from "./Game/Board.js";

const ConnectFourClient = Client({
  game: ConnectFour,
  board: ConnectFourBoard,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
});

const App = () => (
  <div style={fullDisplay}>

    <div class="header" style={headerStyle}>
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
)

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

export default App;
