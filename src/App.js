const { Car, MoveDecider, RacingCarGame } = require('./domain');
const { validateCarNames, validateMovingCount } = require('./domain/validator');
const { InputView, OutputView } = require('./view');

const { CAR_RULE } = require('./constants');
const { Console } = require('./utils');

class App {
  #game;

  play() {
    InputView.readCarName(this.#onSubmitCarNames.bind(this));
  }

  #onSubmitCarNames(carNames) {
    try {
      validateCarNames(carNames);
      const cars = carNames.split(CAR_RULE.NAME_SEPARATOR).map((carName) => new Car(carName));
      this.#game = new RacingCarGame(cars);
      InputView.readMovingCount(this.#onSubmitMovingCount.bind(this));
    } catch (error) {
      OutputView.printError(error.message);
      InputView.readCarName(this.#onSubmitCarNames.bind(this));
    }
  }

  #onSubmitMovingCount(movingCount) {
    try {
      validateMovingCount(movingCount);
      const carCount = this.#game.getCarCount();
      this.#printResult(movingCount, carCount);
      Console.close();
    } catch (error) {
      OutputView.printError(error.message);
      InputView.readMovingCount(this.#onSubmitMovingCount.bind(this));
    }
  }

  #printResult(movingCount, carCount) {
    OutputView.printResultTitle();
    OutputView.printCars(this.#game.getCarsInfo());
    Array.from({ length: movingCount }).forEach(() => {
      const carMoveSuccesses = MoveDecider.getCarMoveSuccesses(carCount);
      this.#game.moveCars(carMoveSuccesses);
      OutputView.printCars(this.#game.getCarsInfo());
    });
    OutputView.printWinner(this.#game.getWinner());
  }
}

module.exports = App;
