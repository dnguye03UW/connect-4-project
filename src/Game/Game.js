/*
Adapted from tutorials by Patrick Johannessen 
https://www.lonesomecrowdedweb.com/blog/four-in-a-row-boardgameio/
and boardgame.io
https://boardgame.io/documentation/#/tutorial
*/

import { INVALID_MOVE } from "boardgame.io/core";
// import { emptyCell, numOfRows, numOfColumns, playerDiscLookup } from "../Data/constants";

const emptyCell = 0;
const p1disc = 1;
const p2disc = 2;
const numOfRows = 6;
const numOfColumns = 7;
const playerDiscLookup = {
  0: p1disc,
  1: p2disc,
};

export { emptyCell, p1disc, p2disc, numOfRows, numOfColumns, playerDiscLookup };

export const ConnectFour = {
  // Create a 2D array filled with 'emptyCell' values
  // where [0][0] is the top-left corner and [numOfRows][numOfColumns] is the bottom-right corner
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
      // Column is full if the top of the board is occupied
      if (G.grid[0][column] !== emptyCell) {
        return INVALID_MOVE;
      }

      // Start from the bottom of the grid and search for an empty cell in the given column
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

// Check if the grid is in a winning configuration
function isVictory(grid, player) {
  const playerDisc = playerDiscLookup[player];
  let row = 0;
  let column = 0;

  // Horizontal Check
  for (column = 0; column < numOfColumns - 3; column++) {
    for (row = 0; row < numOfRows; row++) {
      if (grid[row][column] === playerDisc && grid[row][column + 1] === playerDisc && grid[row][column + 2] === playerDisc && grid[row][column + 3] === playerDisc) {
        return true;
      }
    }
  }

  // Vertical Check
  for (row = 0; row < numOfRows - 3; row++) {
    for (column = 0; column < numOfColumns; column++) {
      if (grid[row][column] === playerDisc && grid[row + 1][column] === playerDisc && grid[row + 2][column] === playerDisc && grid[row + 3][column] === playerDisc) {
        return true;
      }
    }
  }

  // Ascending Diagonal Check
  for (row = 3; row < numOfRows; row++) {
    for (column = 0; column < numOfColumns - 3; column++) {
      if (grid[row][column] === playerDisc && grid[row - 1][column + 1] === playerDisc && grid[row - 2][column + 2] === playerDisc && grid[row - 3][column + 3] === playerDisc) {
        return true;
      }
    }
  }

  // Descending Diagonal Check
  for (row = 3; row < numOfRows; row++) {
    for (column = 3; column < numOfColumns; column++) {
      if (grid[row][column] === playerDisc && grid[row - 1][column - 1] === playerDisc && grid[row - 2][column - 2] === playerDisc && grid[row - 3][column - 3] === playerDisc) {
        return true;
      }
    }
  }

  return false;
}

// Check if the grid is completely occupied
function isDraw(grid) {
  return grid.every((row) => row.every((cell) => cell !== emptyCell));
}
