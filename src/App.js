import InputManager from "./InputManager.js";
import OutputManager from "./OutputManager.js";
import LottoMachine from "./LottoMachine.js";
import { Console } from "@woowacourse/mission-utils";

class App {
  #lottoMachine;

  constructor() {
    this.#lottoMachine = new LottoMachine();
  }

  async run() {
    const purchaseAmount = await InputManager.getPurchaseAmount();
    const lottos = this.#lottoMachine.issueLottos(purchaseAmount);
    OutputManager.printPurchasedLottos(lottos);

    const winningLotto = await InputManager.getWinningLotto();
    const statistics = this.#lottoMachine.calculateStatistics(
      lottos,
      winningLotto
    );

    const totalReturnRate = this.#lottoMachine.calculateTotalReturnRate(
      purchaseAmount,
      statistics
    );

    OutputManager.printStatistics(statistics, totalReturnRate);
  }
}

export default App;
