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


renderBoard(playerBoard, 'player-board', false);
renderBoard(computerBoard, 'computer-board', true);
             
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
