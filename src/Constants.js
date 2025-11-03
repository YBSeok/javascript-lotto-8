export const LOTTO = Object.freeze({
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  NUMBER_COUNT: 6,
  PRICE: 1000,
});

export const RANK = Object.freeze({
  FIRST: "FIRST",
  SECOND: "SECOND",
  THIRD: "THIRD",
  FOURTH: "FOURTH",
  FIFTH: "FIFTH",
  NONE: "NONE",
});

export const PRIZE_MONEY = Object.freeze({
  [RANK.FIRST]: 2_000_000_000,
  [RANK.SECOND]: 30_000_000,
  [RANK.THIRD]: 1_500_000,
  [RANK.FOURTH]: 50_000,
  [RANK.FIFTH]: 5_000,
  [RANK.NONE]: 0,
});

export const MESSAGES = Object.freeze({
  INPUT_AMOUNT: "구입금액을 입력해 주세요.\n",
  INPUT_WINNING: "\n당첨 번호를 입력해 주세요.\n",
  INPUT_BONUS: "\n보너스 번호를 입력해 주세요.\n",
  PURCHASE_COUNT: "개를 구매했습니다.",
  STATS_HEADER: "\n당첨 통계",
  STATS_DIVIDER: "---",
  ROI: (rate) => `총 수익률은 ${rate}%입니다.`,
});

export const ERROR = Object.freeze({
  PREFIX: "[ERROR]",
  AMOUNT_UNIT: `구입 금액은 ${LOTTO.PRICE}원 단위로 입력해야 합니다.`,
  AMOUNT_MIN: `구입 금액은 ${LOTTO.PRICE}원 이상이어야 합니다.`,
  AMOUNT_NOT_NUMBER: "구입 금액은 유효한 숫자여야 합니다.",
  NUMBER_NOT_NUMBER: "로또 번호는 유효한 숫자여야 합니다.",
  NUMBER_COUNT: "로또 번호는 6개여야 합니다.",
  NUMBER_DUPLICATE: "로또 번호는 중복될 수 없습니다.",
  NUMBER_RANGE: `로또 번호는 ${LOTTO.MIN_NUMBER}부터 ${LOTTO.MAX_NUMBER} 사이의 숫자여야 합니다.`,
  BONUS_DUPLICATE: "보너스 번호는 당첨 번호와 중복될 수 없습니다.",
});
