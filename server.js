// server.js
const { Server, Origins } = require('boardgame.io/server');
const { ConnectFour } = require('./src/Game/Game');
const { Server: SocketIOServer } = require('socket.io');

const server = Server({
  games: [ConnectFour()],
  origins: [Origins.LOCALHOST],
});

(async ()   => {
  const { appServer } = await server.run({ port: 8000 });

  const io = new SocketIOServer(appServer, {
    path: '/chat',
    cors: { origin: "*" },
  });

  io.on('connection', (socket) => {
    // Add this line to log all events coming from the client
    socket.onAny((event, ...args) => {
      console.log('Event received:', event, args);
    });

    const { matchID } = socket.handshake.query;
    console.log(`Socket connected to chat, matchID: ${matchID}`);
    socket.join(matchID);

    socket.on('chat', (data) => {
      console.log('Received chat message:', data);
      const { playerName, message } = data;
      io.to(matchID).emit('chat', {
        playerName,
        message,
        timestamp: Date.now(),
      });
    });
  });

  console.log("Server running on port 8000 with chat enabled!");
})();
