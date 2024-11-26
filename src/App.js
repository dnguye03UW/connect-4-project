/*
adapted from tutorials by Patrick Johannessen 
https://www.lonesomecrowdedweb.com/blog/four-in-a-row-boardgameio/
and boardgame.io
https://boardgame.io/documentation/#/tutorial
*/

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SocketIO } from 'boardgame.io/multiplayer'
import { headerStyle, mainStyle } from "./Data/inlineStyle.js";
import { Client } from "boardgame.io/react";
import { ConnectFour } from "./Game/Game.js";
import { ConnectFourBoard } from "./Game/Board.js";
import Home from "./Pages/Home.jsx";

const ConnectFourClient = Client({
  game: ConnectFour,
  board: ConnectFourBoard,
  debug: true,
});

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<ConnectFourClient />} />
    </Routes>
  </Router>
)

const fullDisplay = {
  minHeight: "100vh",
};

const boardFlexStyle = {
  flexBasis: "75%",
  justifyContent: "center",
};

const chatFlexStyle = {
  flexBasis: "25%",
  background: "lightgrey",
};

export default App;
