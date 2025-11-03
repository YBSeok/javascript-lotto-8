import { Console } from "@woowacourse/mission-utils";
import Validation from "./Validation.js";
import WinningLotto from "./WinningLotto.js";
import { MESSAGES } from "./Constants.js";

class InputManager {
  static async #retryValidation(asyncInputFunction) {
    while (true) {
      try {
        return await asyncInputFunction();
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  static async getPurchaseAmount() {
    return this.#retryValidation(async () => {
      const input = await Console.readLineAsync(MESSAGES.INPUT_AMOUNT);
      return Validation.validatePurchaseAmount(input);
    });
  }

  static async getWinningNumbers() {
    return this.#retryValidation(async () => {
      const input = await Console.readLineAsync(MESSAGES.INPUT_WINNING);
      return Validation.validateWinningNumbers(input);
    });
  }

  static async getBonusNumber(winningNumbers) {
    return this.#retryValidation(async () => {
      const input = await Console.readLineAsync(MESSAGES.INPUT_BONUS);
      return Validation.validateBonusNumber(input, winningNumbers);
    });
  }

  static async getWinningLotto() {
    const winningNumbers = await this.getWinningNumbers();
    const bonusNumber = await this.getBonusNumber(winningNumbers);
    return new WinningLotto(winningNumbers, bonusNumber);
  }
}

export default InputManager;
