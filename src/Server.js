const { Server } = require("boardgame.io/server");
const { ConnectFour } = require("./Game/Game");

const server = Server({
  games: [ConnectFour],
});

server.run(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
