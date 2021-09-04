// 初期プロパティ
export const COIN = 100;

// ステータス
export const READY_ST = '00';
export const GIVE_CARD_ST = '01';
export const SHOW_ANS_ST = '11';
export const SHOW_AUC_ST = '12';
export const AUCTION_ST = '21';
export const AUC_RESULT_ST = '22';
export const CALCULATE_ST = '31';
export const CAL_RESULT_ST = '32';

// 時間設定
export const GIVE_CARD_TIME = 5;
export const SHOW_ANS_TIME = 5;
export const SHOW_AUC_TIME = 5;
export const AUCTION_TIME = 30;
export const AUC_RESULT_TIME = 5;
export const CALCULATE_TIME = 20;

export const NAME_EXP = "[¥$=<>+*]+";

// エラーメッセージ
export const NULL_NAME_ERR = 'Please enter your name.';
export const SYMBOL_ERR = 'Please enter your name.';

// ナビゲーションメッセージ
export const GIVE_CARD_MSG = 'Distributing cards to players...';
export const SHOW_ANS_MSG = 'The goal is to get a result of ';
export const SHOW_AUC_MSG = ' was exhibited';
export const AUCTION_MSG1 = 'Please enter the bid amount and select whether to buy "';
export const AUCTION_MSG2 = '" or pass.';
export const AUCTION_MSG3 = ' bid for ';
export const AUCTION_MSG4 = ' coin.';
export const AUC_RESULT_MSG1 = ' made a successful bid for "';
export const AUC_RESULT_MSG2 = '" with ';
export const AUC_RESULT_MSG3 = ' coin! ';
export const CALCULATE_MSG1 = 'Select from your hand so that the calculation result is "'
export const CALCULATE_MSG2 = '" and press "OK".';