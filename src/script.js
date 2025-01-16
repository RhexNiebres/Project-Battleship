// Commit message: "Set up initial gameboards and place ships"
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
