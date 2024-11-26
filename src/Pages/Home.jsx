import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Connect Four Game</h1>
      <Link to="/game">Start Game</Link>
    </div>
  );
}

export default Home;