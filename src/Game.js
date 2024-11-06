/*
    adapted from tutorials by Patrick Johannessen 
        https://www.lonesomecrowdedweb.com/blog/four-in-a-row-boardgameio/
    and boardgame.io
        https://boardgame.io/documentation/#/tutorial
*/

import { isVictory, isDraw } from './winCondition';
import {
    emptyCell,
    p1disc,
    p2disc,
    numOfRows,
    numOfColumns,
    playerDiscLookup
} from './constants';


export const ConnectFour = {
    // create a 2D array filled with 'emptyCell' value
    setup: () => {
        const grid = {};
        for (var row = 0; row < numOfRows; row++) {
            grid[row] = Array(numOfColumns).fill(emptyCell);
        }
        return ({ grid: grid });
    },

    turn: {
        minMoves: 1,
        maxMoves: 1,
    },

    moves: {
        clickColumn(G, ctx, column) {
            // start from bottom of grid ( numOfRows - 1 ) and search for empty cell
            for (var rowId = numOfRows - 1; rowId >= 0; rowId--) {
                if (G.grid[rowId][column] === emptyCell) {
                    G.grid[rowId][column] = playerDiscLookup[ctx.currentPlayer];
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
    /*
    ai: {
        enumerate: (G, ctx) => {
            let moves = [];
            for (let i = 0; i < 9; i++) {
                if (G.grid[i] === null) {
                    moves.push({ move: 'clickCell', args: [i] });
                }
            }
            return moves;
        },
    },
    */
};