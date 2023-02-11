const { GAME_RULE } = require('../constants/rule');
const pickNumberInRange = require('../utils/pickNumberInRange');

class RacingCarGame {
  #cars;

  constructor(cars) {
    this.#cars = cars;
  }

  moveCars() {
    const isMovable = this.#getCarMoveSuccesses();
    this.#cars.forEach((car, index) => {
      if (!isMovable[index]) return;
      car.move();
    });
  }

  #getCarMoveSuccesses() {
    return Array.from({ length: this.#cars.length }, () => this.#isCarMove());
  }

  #isCarMove() {
    return (
      pickNumberInRange(GAME_RULE.randomNumberRangeStart, GAME_RULE.randomNumberRangeEnd) >=
      GAME_RULE.movingCondition
    );
  }

  getCarsInfo() {
    return new Map(this.#cars.map((car) => car.getInfo()));
  }

  getWinner() {
    const carsInfo = this.getCarsInfo();
    const maxDistance = Math.max(...carsInfo.values());
    const winners = [...carsInfo.entries()]
      .filter(([, distance]) => distance === maxDistance)
      .map(([name]) => name);
    return winners;
  }
}

module.exports = RacingCarGame;
