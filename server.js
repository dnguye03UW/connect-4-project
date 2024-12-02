// server.js
const { Server, Origins } = require('boardgame.io/server');
const path = require('path');
const { ConnectFour } = require('./src/Game/Game'); // Adjust the path if necessary

const server = Server({
  games: [ConnectFour()],
  origins: [Origins.LOCALHOST],
});

server.run(8000);
