import Ship from './ship.js';

class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.board = this.createBoard();
  }

  createBoard() {
    return Array.from({ length: 10 }, () => Array(10).fill(null));
  }

  placeShip(ship, [x, y]) {
    for (let i = 0; i < ship.length; i++) {
      this.board[x][y + i] = ship;
    }
    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    const ship = this.board[x][y];
    if (ship) {
      ship.hit();
      return true;
    } else {
      this.missedAttacks.push([x, y]);
      return false;
    }
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
}

export default Gameboard;
