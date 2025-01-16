import Gameboard from './gameboard.js';

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  attack(enemyGameboard, x, y) {
    return enemyGameboard.receiveAttack(x, y);
  }
}

class ComputerPlayer extends Player {
  constructor(name) {
    super(name);
  }

  randomAttack(enemyGameboard) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (enemyGameboard.board[x][y] !== null);
    return this.attack(enemyGameboard, x, y);
  }
}

export { Player, ComputerPlayer };
