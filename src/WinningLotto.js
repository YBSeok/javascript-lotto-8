import Lotto from "./Lotto.js";
import Validation from "./Validation.js";
import { RANK } from "./Constants.js";

class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#lotto = new Lotto(winningNumbers);
    Validation.validateBonusDuplication(bonusNumber, winningNumbers);
    this.#bonusNumber = bonusNumber;
  }

  calculateRank(userLotto) {
    const matchCount = this.#countMatches(userLotto);
    const hasBonus = userLotto.contains(this.#bonusNumber);

    if (matchCount === 6) return RANK.FIRST;
    if (matchCount === 5 && hasBonus) return RANK.SECOND;
    if (matchCount === 5) return RANK.THIRD;
    if (matchCount === 4) return RANK.FOURTH;
    if (matchCount === 3) return RANK.FIFTH;
    return RANK.NONE;
  }

  #countMatches(userLotto) {
    const userNumbers = userLotto.getNumbers();
    const winningNumbers = this.#lotto.getNumbers();

    return userNumbers.filter((number) => winningNumbers.includes(number))
      .length;
  }
}

export default WinningLotto;
