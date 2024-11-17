const { Server } = require("boardgame.io/server");
const { ConnectFour } = require("./Game");

const server = Server({ games: [ConnectFour] });

server.run(8000);
