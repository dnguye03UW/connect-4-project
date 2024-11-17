import { emptyCell, numOfRows, numOfColumns, playerDiscLookup } from "../Data/constants";

function isVictory(grid, player) {
  const playerDisc = playerDiscLookup[player];

  let row = 0;
  let column = 0;

  // horizontalCheck
  for (column = 0; column < numOfColumns - 3; column++) {
    for (row = 0; row < numOfRows; row++) {
      if (grid[row][column] === playerDisc && grid[row][column + 1] === playerDisc && grid[row][column + 2] === playerDisc && grid[row][column + 3] === playerDisc) {
        return true;
      }
    }
  }

  // verticalCheck
  for (row = 0; row < numOfRows - 3; row++) {
    for (column = 0; column < numOfColumns; column++) {
      if (grid[row][column] === playerDisc && grid[row + 1][column] === playerDisc && grid[row + 2][column] === playerDisc && grid[row + 3][column] === playerDisc) {
        return true;
      }
    }
  }

  // ascendingDiagonalCheck
  for (row = 3; row < numOfRows; row++) {
    for (column = 0; column < numOfColumns - 3; column++) {
      if (grid[row][column] === playerDisc && grid[row - 1][column + 1] === playerDisc && grid[row - 2][column + 2] === playerDisc && grid[row - 3][column + 3] === playerDisc) {
        return true;
      }
    }
  }

  // descendingDiagonalCheck
  for (row = 3; row < numOfRows; row++) {
    for (column = 3; column < numOfColumns; column++) {
      if (grid[row][column] === playerDisc && grid[row - 1][column - 1] === playerDisc && grid[row - 2][column - 2] === playerDisc && grid[row - 3][column - 3] === playerDisc) {
        return true;
      }
    }
  }

  return false;
}

// returns true if grid is completely occupied
function isDraw(grid) {
  // return grid.every((row) => row.every((cell) => cell !== emptyCell));
  return grid.every((row) => row.every((cell) => cell !== emptyCell));
}

export { isVictory, isDraw };
