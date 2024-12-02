// App.js
import React, { useState } from 'react';
import { Client } from 'boardgame.io/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SocketIO } from 'boardgame.io/multiplayer';
import { headerStyle, mainStyle } from './Data/inlineStyle.js';
import { ConnectFour } from './Game/Game.js';
import { ConnectFourBoard } from './Game/Board.js';
import LobbySetup from './LobbySetup';
import MultiplayerPage from './Pages/MultiplayerPage.jsx';
import Home from './Pages/Home.jsx';
import SoloPage from './Pages/SoloPage.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/solo" element={<SoloPage />} />
        <Route path="/multiplayer" element={<MultiplayerPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
