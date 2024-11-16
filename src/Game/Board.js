/*
adapted from tutorials by Patrick Johannessen 
https://www.lonesomecrowdedweb.com/blog/four-in-a-row-boardgameio/
and boardgame.io
https://boardgame.io/documentation/#/tutorial
*/

import React from "react";
import { p1disc, p2disc, numOfRows, numOfColumns } from "../Data/constants";
import { imgStyle, cellStyle, boardStyle } from "../Data/inlineStyle";
import WhiteDisc from "../Assets/circle-white.png";
import BlueDisc from "../Assets/circle-blue.png";
import RedDisc from "../Assets/circle-red.png";

// takes in a cell's attribute and checks its value
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
    return (
        <img style={imgStyle} alt={cellStr} src={cellImg} />
    );
}

export function ConnectFourBoard({ ctx, G, moves }) {
    // call the click event handler with the keys in the 2D array
    const clickColumn = (clickedCol) => moves.clickColumn(clickedCol);

    // create a 2D array where [0][0] is the top leftmost corner and [numOfRows][numOfColumns] is the bottom rightmost corner
    let boardBody = [];
    for (let row = 0; row < numOfRows; row++) {
        let cells = [];
        for (let column = 0; column < numOfColumns; column++) {
            // fill table with table data that passes its column number when clicked on 
            //   and uses the functional component Cell to return the appropriate image
            cells.push(
                <td key={column}>
                    <div style={cellStyle} onClick={() => clickColumn(column)}>
                        <Cell cell={G.grid[row][column]} />
                    </div>
                </td>
            );
        }
        // push the completed row into the array
        boardBody.push(<tr key={row}>{cells}</tr>);
    }

    return (
        <div style={boardMargin}>
            <table style={boardStyle} id="board">
                <tbody>{boardBody}</tbody>
            </table>
        </div>
    );

    /* TO DO (tentative):
            display players at the bottom (refer to mockup)
            display whose turn it is or winner at top (use "Your turn" for player's side, username for other player)
            have available slots glow (refer to mockup)
    */

    /*
    let winner = "";
    if (ctx.gameover) {
        winner = ctx.gameover.winner !== undefined ? <div id="winner">Winner: {ctx.gameover.winner}</div> : <div id="winner">Draw!</div>;
    }
    */
}

const boardMargin = {
    marginTop: "50px",
};