import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { ConnectFour } from "./Game/Game";
import { ConnectFourBoard } from "./Game/Board";

const ConnectFourClient = Client({
  game: ConnectFour,
  board: ConnectFourBoard,
  multiplayer: SocketIO({ server: "localhost:8000" }), // Ensure server address matches
});

export default ConnectFourClient;
