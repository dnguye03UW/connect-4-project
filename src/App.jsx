import { React } from "react";
import { Client } from "boardgame.io/react";
import { ConnectFour, ConnectFourBoard } from "./Game";
// eslint-disable-next-line
import { Local, SocketIO } from "boardgame.io/multiplayer";
const App = Client({
  game: ConnectFour,
  board: ConnectFourBoard,
  multiplayer: Local(),
  // multiplayer: SocketIO({ server: "localhost:3000" }),
});

const ConnectFourClient = () => (
  <div>
    <App playerID="0" />
    <App playerID="1" />
  </div>
);

export default ConnectFourClient;
