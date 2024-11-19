import { Server, Origins } from 'boardgame.io/dist/cjs/server.js';
import { ConnectFour } from './Game/Game.js';

const server = Server({
    games: [ConnectFour],
    origins: [Origins.LOCALHOST],
});

server.run(8000);