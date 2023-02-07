import Console from '../utils/console';

const InputView = {
  readCarName(callback) {
    Console.readLine(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n',
      callback
    );
  },

  readMovingCount(callback) {
    Console.readLine('시도할 회수는 몇회인가요?\n', callback);
  },
};

export default InputView;
