import { isVictory, isDraw } from "./winCondition";
import { emptyCell, p1disc, p2disc, numOfRows, numOfColumns, playerDiscLookup } from "./constants";

export const ConnectFour = {
  setup: () => {
    const grid = Array.from({ length: numOfRows }, () => Array(numOfColumns).fill(emptyCell));
    return { grid }; // 2D array grid
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: {
    clickColumn(G, ctx, column) {
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
