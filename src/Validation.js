import { LOTTO, ERROR } from "./Constants.js";

class Validation {
  static #throwError(message) {
    throw new Error(`${ERROR.PREFIX} ${message}`);
  }

  static validatePurchaseAmount(input) {
    const amount = this.#parseNumber(input, ERROR.AMOUNT_NOT_NUMBER);
    if (amount < LOTTO.PRICE) this.#throwError(ERROR.AMOUNT_MIN);
    if (amount % LOTTO.PRICE !== 0) this.#throwError(ERROR.AMOUNT_UNIT);
    return amount;
  }

  static validateWinningNumbers(input) {
    const numbers = input.split(",").map((numStr) => {
      return this.#parseNumber(numStr.trim(), ERROR.NUMBER_NOT_NUMBER);
    });
    this.validateLottoNumbers(numbers);
    return numbers;
  }

  static validateBonusNumber(input, winningNumbers) {
    const number = this.#parseNumber(input, ERROR.NUMBER_NOT_NUMBER);
    this.validateNumberRange(number);
    this.validateBonusDuplication(number, winningNumbers);
    return number;
  }

  static validateLottoNumbers(numbers) {
    if (numbers.length !== LOTTO.NUMBER_COUNT) {
      this.#throwError(ERROR.NUMBER_COUNT);
    }
    if (new Set(numbers).size !== LOTTO.NUMBER_COUNT) {
      this.#throwError(ERROR.NUMBER_DUPLICATE);
    }
    numbers.forEach(this.validateNumberRange.bind(this));
  }

  static validateNumberRange(number) {
    if (number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER) {
      this.#throwError(ERROR.NUMBER_RANGE);
    }
  }

  static validateBonusDuplication(bonusNumber, winningNumbers) {
    if (winningNumbers.includes(bonusNumber)) {
      this.#throwError(ERROR.BONUS_DUPLICATE);
    }
  }

  static #parseNumber(input, errorMessage) {
    if (input.trim() === "") this.#throwError(errorMessage);
    const number = Number(input);
    if (isNaN(number) || !Number.isInteger(number)) {
      this.#throwError(errorMessage);
    }
    return number;
  }
}

export default Validation;
