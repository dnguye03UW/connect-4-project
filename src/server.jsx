// src/server.js
const { Server, Origins } = require("boardgame.io/server");
const { ConnectFour } = require("./Game.jsx");

const server = Server({
  games: [ConnectFour],
  origins: [Origins.LOCALHOST],
});

server.run(8000);
