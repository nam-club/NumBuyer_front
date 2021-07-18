// 初期プロパティ
export const MONEY = 100;

// ステータス
export const READY_ST = '00';
export const GIVE_CARD_ST = '01';
export const SHOW_ANS_ST = '11';
export const SHOW_AUC_ST = '12';
export const AUCTION_ST = '21';
export const CALCULATE_ST = '31';
export const RESULT_ST = '41';

// 時間設定
export const GIVE_CARD_TIME = 5;
export const SHOW_ANS_TIME = 5;
export const SHOW_AUC_TIME = 5;
export const AUCTION_TIME = 30;
export const CALCULATE_TIME = 20;

export const NAME_EXP = "[¥$=<>+*]+";

// エラーメッセージ
export const NULL_NAME_ERR = 'Please enter your name.';
export const SYMBOL_ERR = 'Please enter your name.';

// ナビゲーションメッセージ
export const GIVE_CARD_MSG = 'Distributing cards to players...';
export const SHOW_ANS_MSG = 'The goal is to get a result of ';
export const SHOW_AUC_MSG = ' was exhibited';
export const AUCTION_MSG1 = 'Please enter the bid amount and select whether to buy ';
export const AUCTION_MSG2 = ' or pass.';