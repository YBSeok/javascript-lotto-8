import { ERROR, LOTTO } from "../src/Constants.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== LOTTO.NUMBER_COUNT) {
      throw new Error(ERROR.NUMBER_COUNT);
    }

    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(ERROR.NUMBER_DUPLICATE);
    }

    numbers.forEach((number) => {
      this.#validateNumberRange(number);
    });
  }

  #validateNumberRange(number) {
    if (
      !Number.isInteger(number) ||
      number < LOTTO.MIN_NUMBER ||
      number > LOTTO.MAX_NUMBER
    ) {
      throw new Error(ERROR.NUMBER_RANGE);
    }
  }

  getNumbers() {
    return this.#numbers.slice().sort((a, b) => a - b);
  }

  contains(number) {
    return this.#numbers.includes(number);
  }
}

export default Lotto;
