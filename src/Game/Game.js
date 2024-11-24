// Game.js
const { INVALID_MOVE } = require('boardgame.io/core');
const { isVictory, isDraw } = require('./winCondition');
const { emptyCell, numOfRows, numOfColumns, playerDiscLookup } = require('../Data/constants');

const ConnectFour = {
  name: 'connect-four', // Added a name property for the lobby
  setup: () => {
    const grid = Array.from({ length: numOfRows }, () => Array(numOfColumns).fill(emptyCell));
    return { grid };
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: {
    clickColumn: ({ G, ctx }, column) => {
      // Check if the top cell in the column is empty
      if (G.grid[0][column] !== emptyCell) {
        return INVALID_MOVE;
      }

      // Place the disc in the lowest available cell in the column
      for (let row = numOfRows - 1; row >= 0; row--) {
        if (G.grid[row][column] === emptyCell) {
          G.grid[row][column] = playerDiscLookup[ctx.currentPlayer];
          break;
        }
      }
    },
  },

  endIf: ({ G, ctx }) => {
    if (isVictory(G.grid, ctx.currentPlayer)) {
      return { winner: ctx.currentPlayer };
    }
    if (isDraw(G.grid)) {
      return { draw: true };
    }
  },
};

module.exports = { ConnectFour };
