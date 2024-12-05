import { MCTSBot, RandomBot } from 'boardgame.io/ai';
import { emptyCell, numOfRows, numOfColumns, playerDiscLookup } from './Data/constants';
import { isVictory } from './Game/winCondition';

export const EasyBot = {
  enumerate: (G, ctx) => {
    console.log('EasyBot is making a move');
    const moves = [];
    for (let col = 0; col < numOfColumns; col++) {
      if (G.grid[0][col] === emptyCell) {
        moves.push({ move: 'clickColumn', args: [col] });
      }
    }
    return moves;
  },
};

export const MediumBot = {
  enumerate: (G, ctx) => {
    console.log('MediumBot is making a move');
    const moves = [];
    const opponent = ctx.currentPlayer === '0' ? '1' : '0';
    for (let col = 0; col < numOfColumns; col++) {
      if (G.grid[0][col] === emptyCell) {
        // Simulate the opponent's move
        const tempG = JSON.parse(JSON.stringify(G));
        for (let row = numOfRows - 1; row >= 0; row--) {
          if (tempG.grid[row][col] === emptyCell) {
            tempG.grid[row][col] = playerDiscLookup[opponent];
            break;
          }
        }
        if (isVictory(tempG.grid, opponent)) {
          // Block this column
          moves.unshift({ move: 'clickColumn', args: [col] });
        } else {
          moves.push({ move: 'clickColumn', args: [col] });
        }
      }
    }
    return moves;
  },
};

export const HardBot = new MCTSBot({
  iterations: 1000,
  playoutDepth: 3,
});
