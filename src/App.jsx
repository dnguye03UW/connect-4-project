import React from "react";
import { headerStyle, mainStyle } from "./Game";
import { Client } from "boardgame.io/react";
import { ConnectFour, ConnectFourBoard } from "./Game";
import { Local } from "boardgame.io/multiplayer";

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
  multiplayer: Local(),
  // multiplayer: SocketIO({ server: "localhost:3000" }),
});

const App = () => (
  <div>
    <ConnectFourClient playerID="0" />
    <ConnectFourClient playerID="1" />
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

export default ConnectFourClient;
