import React from "react";
import { p1disc, p2disc, numOfRows, numOfColumns } from "../Data/constants";
import { imgStyle, cellStyle, boardStyle } from "../Data/inlineStyle";
import WhiteDisc from "../Assets/circle-white.png";
import BlueDisc from "../Assets/circle-blue.png";
import RedDisc from "../Assets/circle-red.png";

const Cell = ({ cell }) => {
  let cellImg;
  let cellStr;

  switch (cell) {
    case p1disc:
      cellStr = "Player 1 Disc";
      cellImg = RedDisc;
      break;
    case p2disc:
      cellStr = "Player 2 Disc";
      cellImg = BlueDisc;
      break;
    default:
      cellStr = "Empty Cell";
      cellImg = WhiteDisc;
      break;
  }

  return <img style={imgStyle} alt={cellStr} src={cellImg} />;
};

export function ConnectFourBoard({ ctx, G, moves, playerNames }) {
  const clickColumn = (clickedCol) => moves.clickColumn(clickedCol);

  let boardBody = [];
  for (let row = 0; row < numOfRows; row++) {
    let cells = [];
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

  const currentPlayerName = playerNames[ctx.currentPlayer] || "Unknown Player";

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2>Current Turn: {currentPlayerName}</h2>
      </div>
      <div style={{ marginTop: "50px" }}>
        <table style={boardStyle} id="board">
          <tbody>{boardBody}</tbody>
        </table>
      </div>
    </div>
  );
}
