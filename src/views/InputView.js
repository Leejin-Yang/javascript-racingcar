const { INPUT_MESSAGE } = require('../constants/message');
const Console = require('../utils/console');

const InputView = {
  readCarName(callback) {
    Console.read(INPUT_MESSAGE.CAR_NAMES, callback);
  },

  readMovingCount(callback) {
    Console.read(INPUT_MESSAGE.MOVING_COUNT, callback);
  },
};

module.exports = InputView;
