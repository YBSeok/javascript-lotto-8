import { Console } from "@woowacourse/mission-utils";
import { RANK, PRIZE_MONEY, MESSAGES } from "./Constants.js";

class OutputManager {
  static printPurchasedLottos(lottos) {
    Console.print(`\n${lottos.length}${MESSAGES.PURCHASE_COUNT}`);
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getNumbers().join(", ")}]`);
    });
  }

  static printStatistics(statistics, totalReturnRate) {
    Console.print(MESSAGES.STATS_HEADER);
    Console.print(MESSAGES.STATS_DIVIDER);

    const rankOrder = [
      RANK.FIFTH,
      RANK.FOURTH,
      RANK.THIRD,
      RANK.SECOND,
      RANK.FIRST,
    ];

    rankOrder.forEach((rank) => {
      const message = this.#getRankMessage(rank, statistics[rank]);
      Console.print(message);
    });

    Console.print(MESSAGES.ROI(totalReturnRate));
  }

  static #getRankMessage(rank, count) {
    const prize = PRIZE_MONEY[rank].toLocaleString();
    const messages = {
      [RANK.FIFTH]: `3개 일치 (${prize}원) - ${count}개`,
      [RANK.FOURTH]: `4개 일치 (${prize}원) - ${count}개`,
      [RANK.THIRD]: `5개 일치 (${prize}원) - ${count}개`,
      [RANK.SECOND]: `5개 일치, 보너스 볼 일치 (${prize}원) - ${count}개`,
      [RANK.FIRST]: `6개 일치 (${prize}원) - ${count}개`,
    };
    return messages[rank];
  }
}

export default OutputManager;
