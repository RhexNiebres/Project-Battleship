import Ship from './ship.js';
import Gameboard from './gameboard.js';
import { Player, ComputerPlayer } from './player.js';
import Game from './game.js';
import './styles.css';

document.addEventListener("DOMContentLoaded", () => {
  const playerBoard = new Gameboard();
  const computerBoard = new Gameboard();

  const playerShip = new Ship(4);
  const computerShip = new Ship(3);

  playerBoard.placeShip(playerShip, [0, 0]);
  computerBoard.placeShip(computerShip, [5, 5]);

  const player = new Player("Player");
  player.gameboard = playerBoard;

  const computer = new ComputerPlayer("Computer");
  computer.gameboard = computerBoard;

  const game = new Game("Player", "Computer");

  // Render the boards
  renderBoard(playerBoard, 'player-board', false);
  renderBoard(computerBoard, 'computer-board', true);

  // Add click functionality to the computer's board
  const computerBoardElement = document.getElementById('computer-board');
  computerBoardElement.addEventListener('click', (event) => {
    const cell = event.target;

    if (cell.classList.contains('cell')) {
      const x = parseInt(cell.dataset.row, 10);
      const y = parseInt(cell.dataset.col, 10);

      // Process player's attack
      const hit = computerBoard.receiveAttack(x, y);
      if (hit) {
        cell.classList.add('hit');
      } else {
        cell.classList.add('missed');
      }

      // Check if computer has lost all ships
      if (computerBoard.allShipsSunk()) {
        alert("You win!");
        return;
      }

      // Computer's turn
      computerAttack(playerBoard);
    }
  });

  function renderBoard(gameboard, boardId, hideShips = false) {
    const container = document.getElementById(boardId);
    container.innerHTML = ""; // Clear any existing content in the board
  
    // Iterate through rows and columns of the gameboard
    for (let row = 0; row < gameboard.board.length; row++) {
      for (let col = 0; col < gameboard.board[row].length; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = row;
        cell.dataset.col = col;
  
        // If a ship is present and ships are not hidden, mark it
        if (gameboard.board[row][col] && !hideShips) {
          cell.classList.add("ship");
        }
  
        // Attach the cell to the container
        container.appendChild(cell);
      }
    }
  }
  

  function computerAttack(playerBoard) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (
      playerBoard.board[x][y] === "missed" ||
      playerBoard.board[x][y] === "hit"
    );

    const hit = playerBoard.receiveAttack(x, y);

    const cell = document.querySelector(
      `#player-board .cell[data-row="${x}"][data-col="${y}"]`
    );

    if (hit) {
      cell.classList.add("hit");
    } else {
      cell.classList.add("missed");
    }

    if (playerBoard.allShipsSunk()) {
      alert("Computer wins!");
    }
  }
});