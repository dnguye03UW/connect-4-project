import { INVALID_MOVE } from "boardgame.io/dist/cjs/core.js";
import { isVictory, isDraw } from "./winCondition";
import { emptyCell, numOfRows, numOfColumns, playerDiscLookup } from "../Data/constants";

export const ConnectFour = {
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
      // Defensive check for invalid column
      if (column < 0 || column >= numOfColumns) {
        console.error(`Invalid column: ${column}`);
        return INVALID_MOVE;
      }

      // Create a copy of the grid for immutability
      const newGrid = G.grid.map((row) => [...row]);

      // Column is full if the top cell is occupied
      if (newGrid[0][column] !== emptyCell) {
        return INVALID_MOVE;
      }

      // Drop the token in the lowest available cell
      for (let row = numOfRows - 1; row >= 0; row--) {
        if (newGrid[row][column] === emptyCell) {
          newGrid[row][column] = playerDiscLookup[ctx.currentPlayer];
          break;
        }
      }

      // Update the grid state
      return { ...G, grid: newGrid };
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
