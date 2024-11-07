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
      /*
      start from bottom of grid ( numOfRows - 1 ) and search for empty cell that matches the column index
        ( G.grid[numOfRows - 1][column] ... G.grid[numOfRows - 2][column] ... G.grid[0][column])
      if column is full, 
        return INVALID_MOVE;
      
      once found, use:
        G.grid[row][column] = playerDiscLookup[ctx.currentPlayer];
      */
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