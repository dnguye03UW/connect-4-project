import React from "react";
import { headerStyle, mainStyle } from "./Game";
import { Client } from "boardgame.io/react";
import { ConnectFour } from "./Game";
import { ConnectFourBoard } from "./Game";

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

      <div style={chatFlexStyle}></div>
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

export default App;
