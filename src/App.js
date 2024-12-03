import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
