/*
    adapted from tutorials by Patrick Johannessen 
        https://www.lonesomecrowdedweb.com/blog/four-in-a-row-boardgameio/
    and boardgame.io
        https://boardgame.io/documentation/#/tutorial
*/

const emptyCell = 0;
const p1disc = 1;
const p2disc = 2;
const numOfRows = 10;
const numOfColumns = 10;
const playerDiscLookup = {
  0: p1disc,
  1: p2disc,
};

export { emptyCell, p1disc, p2disc, numOfRows, numOfColumns, playerDiscLookup };
