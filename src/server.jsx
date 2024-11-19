const { Server, Origins } = require("boardgame.io/server");
const { ConnectFour } = require("./Game");

const server = Server({
  games: [ConnectFour],
  //   origins: [Origins.LOCALHOST],
});

server.run(8000);
