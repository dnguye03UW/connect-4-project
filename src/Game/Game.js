/*
adapted from tutorials by Patrick Johannessen 
https://www.lonesomecrowdedweb.com/blog/four-in-a-row-boardgameio/
and boardgame.io
https://boardgame.io/documentation/#/tutorial
*/

import { INVALID_MOVE } from 'boardgame.io/dist/esm/core.js';
import { isVictory, isDraw } from './winCondition.js';
import { emptyCell, numOfRows, numOfColumns, playerDiscLookup } from '../Data/constants.js';

export const ConnectFour = {
  // create a 2D array filled with 'emptyCell' values
  //  where [0][0] is the top leftmost corner and [numOfRows][numOfColumns] is the bottom rightmost corner
  setup: () => {
    const grid = Array.from({ length: numOfRows }, () => Array(numOfColumns).fill(emptyCell));
    const isCPUEnabled = false;

    // return as a property with the grid as an attribute to the Game object 
    return ({ grid: grid, isCPUEnabled: isCPUEnabled});
    
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
    onEnd: ({ G, ctx }) => {
      if (!G.isCPUEnabled) return; // Ignores onEnd effects if CPU disabled
      
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
    },
    order: {
      // player 0 will always make the first move
      first: () => 0,
      next: ({G, ctx}) => {
        // If CPU is enabled, always skill player 1 turn since CPU acts as that player
        if (G.isCPUEnabled) {
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
      // Handle human move
      if (G.grid[0][column] !== emptyCell) {
        return INVALID_MOVE;
      }
      
      // Make human move only
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

  /* TO DO (tentative): 
      code AI
  */
};