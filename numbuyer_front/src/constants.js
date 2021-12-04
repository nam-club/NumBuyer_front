// 初期プロパティ
export const COIN = 100;

// フェーズ
export const READY_PH = 'READY';
export const GIVE_CARD_PH = 'GIVE_CARDS';
export const SHOW_TAR_PH = 'SHOW_TARGET';
export const SHOW_AUC_PH = 'SHOW_AUCTION';
export const AUCTION_PH = 'AUCTION';
export const AUC_RESULT_PH = 'AUCTION_RESULT';
export const CALCULATE_PH = 'CALCULATE';
export const CALC_RESULT_PH = 'CALCULATE_RESULT';
export const NEXT_TURN_PH = 'NEXT_TURN';
export const END_PH = 'END';

// 時間設定
export const READY_TIME = 2;
export const GIVE_CARD_TIME = 3;
export const SHOW_TAR_TIME = 5;
export const SHOW_AUC_TIME = 5;
export const AUCTION_TIME = 30;
export const AUC_RESULT_TIME = 5;
export const CALCULATE_TIME = 20;
export const CALC_RESULT_TIME = 5;
export const NEXT_TURN_TIME = 2;

export const NAME_EXP = "[¥$=<>+*]+";
export const BID_EXP = "[0-9]+";

// エラーメッセージ
export const NULL_NAME_ERR = 'Please enter your name.'; // 名前が未入力
export const SYMBOL_ERR = 'You cannot enter that character.'; // 禁止文字が入力されている
export const NULL_BID_ERR = 'Please enter the amount.'; // 金額が未入力
export const NUM_ERR = 'You can only enter numbers.'; // 数字以外が入力されている
export const BID_ERR = 'Please enter an amount higher than the highest bid.'; // 最高入札額以下の金額が入力されている
export const LACK_ERR = "you don't have enough money"; // 所持金が足りない

// ナビゲーションメッセージ
export const GIVE_CARD_MSG = 'Distributing cards to players...';
export const SHOW_TAR_MSG = 'The goal is to get a result of ';
export const SHOW_AUC_MSG = ' was exhibited';
export const AUCTION_MSG1 = 'Please enter the bid amount and select whether to bid "';
export const AUCTION_MSG2 = '" or pass.';
export const AUC_BID_MSG1 = ' bid for ';
export const AUC_BID_MSG2 = ' coin.';
export const AUC_HIGHEST_MSG1 = 'Current highest bid: ';
export const AUC_HIGHEST_MSG2 = 'coin ( ';
export const AUC_HIGHEST_MSG3 = ' )';
export const AUC_RESULT_MSG0 = 'No one bid.';
export const AUC_RESULT_MSG1 = ' made a successful bid for "';
export const AUC_RESULT_MSG2 = '" with ';
export const AUC_RESULT_MSG3 = ' coin! ';
export const CALCULATE_MSG1 = 'Select from your hand so that the calculation result is "'
export const CALCULATE_MSG2 = '" and press "ANSWER".';
export const CALC_ERR_MSG = 'Please select your Cards!';
export const CALC_RESULT_MSG0 = 'Incorrect...! Calc again or pass.'
export const CALC_RESULT_MSG1 = 'Correct!! Please wait for other players...';
export const CALC_FINISH_MSG0 = 'There was no one giving correct answer...';
export const CALC_FINISH_MSG1 = 'It was ';
export const CALC_FINISH_MSG2 = ' who gave the correct answer! ';
export const CALC_FINISH_MSG3 = ' coin will be given to the person giving correct answer!';