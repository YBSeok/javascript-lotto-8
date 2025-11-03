import { Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";
import { LOTTO, RANK, PRIZE_MONEY } from "./Constants.js";

class LottoMachine {
  issueLottos(purchaseAmount) {
    const count = purchaseAmount / LOTTO.PRICE;
    const lottos = [];
    for (let i = 0; i < count; i++) {
      lottos.push(this.#createLotto());
    }
    return lottos;
  }

  #createLotto() {
    const numbers = Random.pickUniqueNumbersInRange(
      LOTTO.MIN_NUMBER,
      LOTTO.MAX_NUMBER,
      LOTTO.NUMBER_COUNT
    );
    return new Lotto(numbers);
  }

  calculateStatistics(lottos, winningLotto) {
    const statistics = {
      [RANK.FIRST]: 0,
      [RANK.SECOND]: 0,
      [RANK.THIRD]: 0,
      [RANK.FOURTH]: 0,
      [RANK.FIFTH]: 0,
      [RANK.NONE]: 0,
    };

    lottos.forEach((lotto) => {
      const rank = winningLotto.calculateRank(lotto);
      statistics[rank]++;
    });

    return statistics;
  }

  calculateTotalReturnRate(purchaseAmount, statistics) {
    let totalPrize = 0;
    for (const rank in PRIZE_MONEY) {
      if (rank !== RANK.NONE) {
        totalPrize += statistics[rank] * PRIZE_MONEY[rank];
      }
    }

    const rate = (totalPrize / purchaseAmount) * 100;
    return rate.toFixed(1);
  }
}

export default LottoMachine;
