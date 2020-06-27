import "./styles.css";

var board = [
  [" ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " "]
];
var size = 5;
var players = { X: 1, O: 2 };

// player 1: X, playter 2: O
var turn = "X";
var moves = 0;

function generateTable(table, board) {
  for (let element of board) {
    let row = table.insertRow();
    for (let e of element) {
      let cell = row.insertCell();
      let text = document.createTextNode(e);
      cell.appendChild(text);
    }
  }
}

function switchTurn() {
  if (turn === "X") {
    turn = "O";
  } else {
    turn = "X";
  }
}

// return playter 1 or 2 if there's a winnder, otherwise return 0
function getWinner(row, col, turn) {
  // row
  let rowElements = board[row];
  let rowCount = 0;
  for (let e of rowElements) {
    if (e === turn) {
      rowCount++;
    } else {
      break;
    }
  }
  if (rowCount === size) {
    return players[turn];
  }
  // column
  let colCount = 0;
  for (let j = 0; j < size; j++) {
    let e = board[j][col];
    if (e === turn) {
      colCount++;
    } else {
      break;
    }
  }
  if (colCount === size) {
    return players[turn];
  }
  // diagonal
  if (row === col || row + col === size - 1) {
    let leftDiagCount = 0;
    for (let j = 0; j < size; j++) {
      let e = board[j][j];
      if (e === turn) {
        leftDiagCount++;
      } else {
        break;
      }
    }
    if (leftDiagCount === size) {
      return players[turn];
    }

    let rightDiagCount = 0;
    for (let j = 4; j >= 0; j--) {
      let e = board[size - 1 - j][j];
      if (e === turn) {
        rightDiagCount++;
      } else {
        break;
      }
    }
    if (rightDiagCount === size) {
      return players[turn];
    }
  }

  return 0;
}

let table = document.createElement("table");
generateTable(table, board);
document.getElementById("board").appendChild(table);
table.onclick = function(event) {
  let td = event.target;
  let row = td.parentNode.rowIndex;
  let col = td.cellIndex;
  let value = td.textContent;
  if (value === " ") {
    // empty box
    let text = document.createTextNode(turn);
    td.appendChild(text);
    moves++;
    board[row][col] = turn;
    let winner = getWinner(row, col, turn);
    console.log(board);
    console.log(winner);
    if (winner === 0) {
      if (moves < size * size) {
        switchTurn();
      } else {
        alert("Nobody won!");
      }
    } else {
      alert("Player " + winner + " won!");
    }
  }
};
