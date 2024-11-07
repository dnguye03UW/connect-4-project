/*
adapted from tutorials by Patrick Johannessen 
https://www.lonesomecrowdedweb.com/blog/four-in-a-row-boardgameio/
and boardgame.io
https://boardgame.io/documentation/#/tutorial
*/

import React from "react";
import { Client } from "boardgame.io/react";
import { ConnectFour } from "./Game";
import { ConnectFourBoard } from "./Board";

const ConnectFourClient = Client({
  game: ConnectFour,
  board: ConnectFourBoard,
});

// TO DO: create header and space on right side for chat feature
const App = () => (
  <div>
    <ConnectFourClient/>
  </div>
)

export default App;
