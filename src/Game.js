/*
adapted from tutorials by Patrick Johannessen 
https://www.lonesomecrowdedweb.com/blog/four-in-a-row-boardgameio/
and boardgame.io
https://boardgame.io/documentation/#/tutorial
*/

import { INVALID_MOVE } from 'boardgame.io/core';
import { isVictory, isDraw } from './winCondition';
import { emptyCell, numOfRows, numOfColumns, playerDiscLookup } from './constants';

export const ConnectFour = {
  // create a 2D array filled with 'emptyCell' values
  //  where [0][0] is the top leftmost corner and [numOfRows][numOfColumns] is the bottom rightmost corner
  setup: () => {
    const grid = Array.from({ length: numOfRows }, () => Array(numOfColumns).fill(emptyCell));

    // return as a property with the grid as an attribute to the Game object 
    return ({ grid: grid });
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: {
    clickColumn: ({ G, ctx }, column) => {
      // column is full if top of board is occupied
      if (G.grid[0][column] !== emptyCell) {
        return INVALID_MOVE;
      }

      // start from bottom of grid ( numOfRows - 1 ) and search for empty cell that matches the column index
      for (let row = numOfRows - 1; row >= 0; row--) {
        if (G.grid[row][column] === emptyCell) {
          G.grid[row][column] = playerDiscLookup[ctx.currentPlayer];
          break;
        }
      }
    }
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