/*
adapted from tutorials by Patrick Johannessen 
https://www.lonesomecrowdedweb.com/blog/four-in-a-row-boardgameio/
and boardgame.io
https://boardgame.io/documentation/#/tutorial
*/

import React from "react";
import { headerStyle, mainStyle } from "./Data/inlineStyle";
import { Client } from "boardgame.io/react";
import { ConnectFour } from "./Game/Game";
import { ConnectFourBoard } from "./Game/Board";

const ConnectFourClient = Client({
  game: ConnectFour,
  board: ConnectFourBoard,
});

const App = () => (
  <div style={fullDisplay}>

    <div class="header" style={headerStyle}>
      <p>Connect Four Online</p>
    </div>

    <div style={mainStyle}>

      <div style={boardFlexStyle}>
        <ConnectFourClient />
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
