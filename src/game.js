import { Player, ComputerPlayer } from './player.js';

class Game {
  constructor(playerName, computerName) {
    this.player = new Player(playerName);
    this.computer = new ComputerPlayer(computerName);
    this.currentPlayer = this.player;
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === this.player ? this.computer : this.player;
  }

  checkGameEnd() {
    if (this.player.gameboard.allShipsSunk()) {
      console.log("Computer Wins!");
      return true;
    } else if (this.computer.gameboard.allShipsSunk()) {
      console.log("Player Wins!");
      return true;
    }
    return false;
  }
}

export default Game;
