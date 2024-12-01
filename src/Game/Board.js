// Board.js
import React from 'react';
import { p1disc, p2disc, numOfRows, numOfColumns } from '../Data/constants.js';
import { imgStyle, cellStyle, boardStyle } from '../Data/inlineStyle.js';
import WhiteDisc from '../Assets/circle-white.png';
import BlueDisc from '../Assets/circle-blue.png';
import RedDisc from '../Assets/circle-red.png';

// Component to render each cell in the grid
const Cell = ({ cell }) => {
  let cellImg;
  let cellStr;

  switch (cell) {
    case p1disc:
      cellStr = 'Player 1 disc';
      cellImg = RedDisc;
      break;
    case p2disc:
      cellStr = 'Player 2 disc';
      cellImg = BlueDisc;
      break;
    default:
      cellStr = 'Empty cell';
      cellImg = WhiteDisc;
      break;
  }
  return <img style={imgStyle} alt={cellStr} src={cellImg} />;
};

export function ConnectFourBoard({ ctx, G, moves, playerID, matchData }) {
  // Handle column click event
  const clickColumn = (clickedCol) => {
    if (ctx.currentPlayer === playerID && !ctx.gameover) {
      moves.clickColumn(clickedCol);
    }
  };

  // Build the game board
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

  // Display game status
  let status;
  if (ctx.gameover) {
    if (ctx.gameover.winner !== undefined) {
      status = `Winner: Player ${parseInt(ctx.gameover.winner) + 1}`;
    } else {
      status = 'Draw!';
    }
  } else {
    status = ctx.currentPlayer === playerID ? 'Your turn' : `Waiting for opponent...`;
  }

  return (
    <div style={boardMargin}>
      <div style={statusStyle}>{status}</div>
      <table style={boardStyle} id="board">
        <tbody>{boardBody}</tbody>
      </table>
    </div>
  );
}

const boardMargin = {
  marginTop: '50px',
};

const statusStyle = {
  textAlign: 'center',
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '10px',
};
