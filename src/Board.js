/*
    adapted from tutorials by Patrick Johannessen 
        https://www.lonesomecrowdedweb.com/blog/four-in-a-row-boardgameio/
    and boardgame.io
        https://boardgame.io/documentation/#/tutorial
*/

import React from "react";
import { emptyCell, p1disc, p2disc } from "./constants";

export function ConnectFourBoard({ ctx, G, moves }) {
  const onClick = (columnIdx) => {
    moves.clickColumn(columnIdx); // Directly call clickColumn with column index
  };

  let winner = "";
  if (ctx.gameover) {
    winner = ctx.gameover.winner !== undefined ? <div id="winner">Winner: {ctx.gameover.winner}</div> : <div id="winner">Draw!</div>;
  }

  const cellStyle = {
    border: "1px solid #555",
    width: "50px",
    height: "50px",
    lineHeight: "50px",
    textAlign: "center",
    cursor: "pointer",
  };

  let tbody = [];
  for (let i = 0; i < 6; i++) {
    let cells = [];
    for (let j = 0; j < 7; j++) {
      cells.push(
        <td key={`${i}-${j}`}>{G.grid[i][j] !== emptyCell ? <div style={cellStyle}>{G.grid[i][j] === p1disc ? "🔴" : "🔵"}</div> : <button style={cellStyle} onClick={() => onClick(j)} />}</td>
      );
    }
    tbody.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <div>
      <table id="board">
        <tbody>{tbody}</tbody>
      </table>
      {winner}
    </div>
  );
}
