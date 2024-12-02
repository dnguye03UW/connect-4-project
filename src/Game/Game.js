// Game.js
const { INVALID_MOVE } = require('boardgame.io/core');
const { isVictory, isDraw } = require('./winCondition');
const { emptyCell, numOfRows, numOfColumns, playerDiscLookup } = require('../Data/constants');

const ConnectFour = customData => ({
  name: 'connect-four', // Added a name property for the lobby
  setup: ctx => {
    const grid = Array.from({ length: numOfRows }, () => Array(numOfColumns).fill(emptyCell));
    const isCPU = customData?.isCPU || false;
    console.log("isCPU: " + isCPU);
    return { grid, isCPU };
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
    onEnd: ({ G, ctx }) => {
      if (G.isCPU) {
        // If move was made by player 0 (user), find all valid moves
      if (ctx.currentPlayer === "0") {
        let validColumns = [];
        for (let col = 0; col < numOfColumns; col++) {
          if (G.grid[0][col] === emptyCell) {
            validColumns.push(col);
          }
        }
        
        // CPU randomly selects a move of the valid options and plays it
        if (validColumns.length > 0) {
          const cpuColumn = validColumns[Math.floor(Math.random() * validColumns.length)];
          for (let row = numOfRows - 1; row >= 0; row--) {
            if (G.grid[row][cpuColumn] === emptyCell) {
              G.grid[row][cpuColumn] = playerDiscLookup["1"];
              break;
            }
          }
        }
      }
        console.log("Game ended in CPU mode");
      }
    },
    order: {
      // player 0 will always make the first move
      first: () => 0,
      next: ({G, ctx}) => {
        // If CPU is enabled, always skill player 1 turn since CPU acts as that player
        if (G.isCPU) {
          return 0;
        }
        // If CPU is disabled, go to next player turn
        if (ctx.currentPlayer === "0") {
          return 1;
        } else {
          return 0;
        }
      }
    }
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
});

module.exports = { ConnectFour };
