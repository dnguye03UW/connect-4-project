/*
    adapted from tutorials by Patrick Johannessen 
    https://www.lonesomecrowdedweb.com/blog/four-in-a-row-boardgameio/
    and boardgame.io
    https://boardgame.io/documentation/#/tutorial
*/

const { emptyCell, numOfRows, numOfColumns, playerDiscLookup } = require('../Data/constants');

// Function to check for victory
function isVictory(grid, player) {
    const playerDisc = playerDiscLookup[player];

    // Horizontal check
    for (let row = 0; row < numOfRows; row++) {
        for (let col = 0; col < numOfColumns - 3; col++) {
            if (
                grid[row][col] === playerDisc &&
                grid[row][col + 1] === playerDisc &&
                grid[row][col + 2] === playerDisc &&
                grid[row][col + 3] === playerDisc
            ) {
                return true;
            }
        }
    }

    // Vertical check
    for (let row = 0; row < numOfRows - 3; row++) {
        for (let col = 0; col < numOfColumns; col++) {
            if (
                grid[row][col] === playerDisc &&
                grid[row + 1][col] === playerDisc &&
                grid[row + 2][col] === playerDisc &&
                grid[row + 3][col] === playerDisc
            ) {
                return true;
            }
        }
    }

    // Ascending diagonal check
    for (let row = 3; row < numOfRows; row++) {
        for (let col = 0; col < numOfColumns - 3; col++) {
            if (
                grid[row][col] === playerDisc &&
                grid[row - 1][col + 1] === playerDisc &&
                grid[row - 2][col + 2] === playerDisc &&
                grid[row - 3][col + 3] === playerDisc
            ) {
                return true;
            }
        }
    }

    // Descending diagonal check
    for (let row = 0; row < numOfRows - 3; row++) {
        for (let col = 0; col < numOfColumns - 3; col++) {
            if (
                grid[row][col] === playerDisc &&
                grid[row + 1][col + 1] === playerDisc &&
                grid[row + 2][col + 2] === playerDisc &&
                grid[row + 3][col + 3] === playerDisc
            ) {
                return true;
            }
        }
    }

    return false;
}

// Function to check for a draw
function isDraw(grid) {
    return grid.every((row) => row.every((cell) => cell !== emptyCell));
}

module.exports = { isVictory, isDraw };
