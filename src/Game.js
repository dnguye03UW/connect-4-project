import React from "react";
import { INVALID_MOVE } from "boardgame.io/core";
import { imgStyle, cellStyle, boardStyle } from "./inlineStyle";
import WhiteDisc from "./Assets/circle-white.png";
import BlueDisc from "./Assets/circle-blue.png";
import RedDisc from "./Assets/circle-red.png";

// Game constants
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
      if (G.grid[0][column] !== emptyCell) {
        return INVALID_MOVE;
      }

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
  let row, column;

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

// Component to render a single cell
const Cell = ({ cell }) => {
  let cellImg;
  let cellStr;

  switch (cell) {
    case p1disc:
      cellStr = "p1 disc";
      cellImg = RedDisc;
      break;
    case p2disc:
      cellStr = "p2 disc";
      cellImg = BlueDisc;
      break;
    default:
      cellStr = "no disc";
      cellImg = WhiteDisc;
      break;
  }

  return <img style={imgStyle} alt={cellStr} src={cellImg} />;
};

// Component to render the Connect Four board
export function ConnectFourBoard({ ctx, G, moves }) {
  const clickColumn = (clickedCol) => moves.clickColumn(clickedCol);

  const boardBody = [];
  for (let row = 0; row < numOfRows; row++) {
    const cells = [];
    for (let column = 0; column < numOfColumns; column++) {
      cells.push(
        <td key={column}>
          <div style={cellStyle} onClick={() => clickColumn(column)}>
            <Cell cell={G.grid[row][column]} />
          </div>
        </td>
      );
    }
    boardBody.push(<tr key={row}>{cells}</tr>);
  }

  return (
    <div style={boardMargin}>
      <table style={boardStyle} id="board">
        <tbody>{boardBody}</tbody>
      </table>
    </div>
  );
}

const boardMargin = {
  marginTop: "50px",
};