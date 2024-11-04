/*
    adapted from tutorials by Patrick Johannessen 
        https://www.lonesomecrowdedweb.com/blog/four-in-a-row-boardgameio/
    and boardgame.io
        https://boardgame.io/documentation/#/tutorial
*/

import { Client } from 'boardgame.io/react';
import { ConnectFour } from './Game';
import { ConnectFourBoard } from './Board';

const App = Client({
  game: ConnectFour,
  //board: ConnectFourBoard,
});

export default App;