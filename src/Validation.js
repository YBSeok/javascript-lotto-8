import { LOTTO, ERROR } from "./Constants.js";

/**
 * 모든 유효성 검사 로직을 담당하는 정적 클래스
 */
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
    // Lotto 생성 '전'에 길이, 중복, 범위를 여기서 모두 검증
    this.validateLottoNumbers(numbers);
    return numbers;
  }

  static validateBonusNumber(input, winningNumbers) {
    const number = this.#parseNumber(input, ERROR.NUMBER_NOT_NUMBER);
    this.validateNumberRange(number); // 1~45 범위 검사
    this.validateBonusDuplication(number, winningNumbers); // 당첨번호와 중복 검사
    return number;
  }

  /**
   * Lotto 객체 생성 '전'에 호출되는 핵심 검증
   * (Lotto 생성자는 길이만 검증하므로)
   */
  static validateLottoNumbers(numbers) {
    // 1. Lotto 생성자가 검증할 길이 (제약조건 일치)
    if (numbers.length !== LOTTO.NUMBER_COUNT) {
      this.#throwError(ERROR.NUMBER_COUNT);
    }
    // 2. 중복 검증
    if (new Set(numbers).size !== LOTTO.NUMBER_COUNT) {
      this.#throwError(ERROR.NUMBER_DUPLICATE);
    }
    // 3. 범위 검증
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
