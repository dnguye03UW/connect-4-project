import React from "react";
// import { headerStyle, mainStyle } from "./Game";
import { Client } from "boardgame.io/react";
import { ConnectFour, ConnectFourBoard } from "./Game";
import { Local, SocketIO } from "boardgame.io/multiplayer";

// const fullDisplay = {
//   minHeight: "100vh",
// };

// const boardFlexStyle = {
//   flexBasis: "75%",
//   justifyContent: "center",
// };

// const chatFlexStyle = {
//   flexBasis: "25%",
//   background: "lightgrey",
// };

const ConnectFourClient = Client({
  game: ConnectFour,
  board: ConnectFourBoard,
  // multiplayer: Local(),
  multiplayer: SocketIO({ server: "localhost:8000" }),
});

const App = () => (
  <div>
    <ConnectFourClient playerID="0" />
    <ConnectFourClient playerID="1" />
  </div>
);

export default App;
