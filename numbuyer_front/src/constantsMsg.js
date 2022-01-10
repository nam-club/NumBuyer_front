export const English = {
    // 言語
    LANGUAGE: 'English',

    // ボタン・タグ
    PLAYER_NAME: 'Player Name',
    QUICK_MATCH: 'Quick Match',
    FRIEND_MATCH: 'Play with Friend',
    CREATE_BTN: 'Create',
    JOIN_BTN: 'Join',
    ROOM_ID: 'Room ID',
    LOBBY: 'Lobby',
    START_BTN: 'Start',
    BACK_BTN: 'Back',
    TARGET: 'Target Card',
    AUCTION: 'Auction Card',
    BID_MSG: 'Please enter the bid amount',
    BID_BTN: 'Bid',
    PASS_BTN: 'Pass',
    ANSWER_BTN: 'Answer',
    YOUR_CARDS: 'Your Cards',
    CALCULATE_FIELD: 'Calculate Field',
    YES_BTN: 'Yes',
    NO_BTN: 'No',
    TIME: 'Time',
    WIN_CONDITIONS: 'Win conditions',
    WIN_MSG: 'Have',
    COIN: 'Coin',

    // エラーメッセージ
    NULL_NAME_ERR: 'Please enter your name.', // 名前が未入力
    SYMBOL_ERR: 'You cannot enter that character.', // 禁止文字が入力されている
    NULL_BID_ERR: 'Please enter the amount.', // 金額が未入力
    NUM_ERR: 'You can only enter numbers.', // 数字以外が入力されている
    BID_ERR: 'Please enter an amount higher than the highest bid.', // 最高入札額以下の金額が入力されている
    LACK_ERR: "you don't have enough money", // 所持金が足りない

    // ナビゲーションメッセージ
    GIVE_CARD_MSG: 'Distributing cards to players...',
    SHOW_TAR_MSG: 'The target card is ',
    SHOW_AUC_MSG: ' was exhibited',
    AUCTION_MSG1: 'Please enter the bid amount and select whether to bid for "',
    AUCTION_MSG2: '" or pass.',
    AUC_BID_MSG1: ' bid for ',
    AUC_BID_MSG2: ' coin.',
    AUC_HIGHEST_MSG1: 'Current highest bid: ',
    AUC_HIGHEST_MSG2: 'coin ( ',
    AUC_HIGHEST_MSG3: ' )',
    AUC_RESULT_MSG0: 'No one bid.',
    AUC_RESULT_MSG1: ' made a successful bid for "',
    AUC_RESULT_MSG2: '" with ',
    AUC_RESULT_MSG3: ' coin! ',
    CALCULATE_MSG1: 'Select from your cards so that the calculation result is "',
    CALCULATE_MSG2: '" and press "ANSWER" button.',
    CALC_ERR_MSG: 'Please select your Cards!',
    CALC_RESULT_MSG0: 'Incorrect...! Calc again or pass.',
    CALC_RESULT_MSG1: 'Correct!! Please wait for other players...',
    CALC_FINISH_MSG0: 'There was no one giving correct answer...',
    CALC_FINISH_MSG1: 'It was ',
    CALC_FINISH_MSG2: ' who gave the correct answer! ',
    CALC_FINISH_MSG3: ' coin will be given to the person giving correct answer!',
    PASS_TITLE: 'Are you sure you want to pass?',
    PASS_MSG: 'If you want to pass, press the "YES" button',

}

export const Japanese = {
    // 言語
    LANGUAGE: 'Japanese',

    // ボタン・タグ
    PLAYER_NAME: 'プレイヤー名',
    QUICK_MATCH: '誰かと対戦する',
    FRIEND_MATCH: '友達と対戦する',
    CREATE_BTN: '部屋を作る',
    JOIN_BTN: '部屋に参加する',
    ROOM_ID: 'ルームID',
    LOBBY: 'ロビー',
    START_BTN: 'スタート',
    BACK_BTN: '退出する',
    TARGET: '目標カード',
    AUCTION: 'オークションカード',
    BID_MSG: '入札金額を入力してください。',
    BID_BTN: '入札',
    PASS_BTN: 'パス',
    ANSWER_BTN: '解答',
    YOUR_CARDS: 'あなたの手札',
    CALCULATE_FIELD: '計算フィールド',
    YES_BTN: 'はい',
    NO_BTN: 'いいえ',
    TIME: '残り時間',
    WIN_CONDITIONS: '勝利条件',
    WIN_MSG: 'を集める',
    COIN: 'コイン',

    // エラーメッセージ
    NULL_NAME_ERR: '名前を入力してください。', // 名前が未入力
    SYMBOL_ERR: 'その文字は入力できません。', // 禁止文字が入力されている
    NULL_BID_ERR: '金額を入力してください。', // 金額が未入力
    NUM_ERR: '数字を入力してください。', // 数字以外が入力されている
    BID_ERR: '最高入札額より高い金額を入力してください。', // 最高入札額以下の金額が入力されている
    LACK_ERR: "所持金が足りません。", // 所持金が足りない

    // ナビゲーションメッセージ
    GIVE_CARD_MSG: 'カードを配布しています…',
    SHOW_TAR_MSG1: '目標カードは ',
    SHOW_TAR_MSG2: ' です。',
    SHOW_AUC_MSG: ' が出品されました。',
    AUCTION_MSG1: '入札金額を入力し、"',
    AUCTION_MSG2: '" に入札するかパスするかを選択してください。',
    AUC_BID_MSG1: ' が ',
    AUC_BID_MSG2: 'コインで入札しました。',
    AUC_HIGHEST_MSG1: '現在の最高入札額: ',
    AUC_HIGHEST_MSG2: 'コイン ( ',
    AUC_HIGHEST_MSG3: ' )',
    AUC_RESULT_MSG0: '誰も入札しませんでした。',
    AUC_RESULT_MSG1: ' が "',
    AUC_RESULT_MSG2: '" を',
    AUC_RESULT_MSG3: 'コインで落札しました!',
    CALCULATE_MSG1: 'あなたの手札から計算結果が "',
    CALCULATE_MSG2: '" になるようにカードを選択して、「解答」ボタンを押してください。',
    CALC_ERR_MSG: '手札からカードを選択してください!',
    CALC_RESULT_MSG0: '不正解です…! 再び解答するかパスをしてください。',
    CALC_RESULT_MSG1: '正解!! 他のプレイヤーが解答するのを待っています…',
    CALC_FINISH_MSG0: '正解者は誰もいませんでした…',
    CALC_FINISH_MSG1: '正解者は ',
    CALC_FINISH_MSG2: ' です! 正解者には',
    CALC_FINISH_MSG3: 'コインが配られます!',
    PASS_TITLE: '本当にパスしますか？',
    PASS_MSG: 'パスする場合は「はい」ボタンを押してください。',

}

export const Chinese = {
    // 言語
    LANGUAGE: 'Chinese',

    // ボタン・タグ
    PLAYER_NAME: '选手姓名',
    QUICK_MATCH: '与某人比赛',
    FRIEND_MATCH: '与朋友对战',
    CREATE_BTN: '做一个房间',
    JOIN_BTN: '加入房间',
    ROOM_ID: '房间号',
    LOBBY: '大堂',
    START_BTN: '开始',
    BACK_BTN: '出口',
    TARGET: '目标卡',
    AUCTION: '拍卖卡',
    BID_MSG: '请输入投标金额。',
    BID_BTN: '投标',
    PASS_BTN: '不叫牌',
    ANSWER_BTN: '回答',
    YOUR_CARDS: '你的手',
    CALCULATE_FIELD: '计算字段',
    YES_BTN: '是的',
    NO_BTN: '不是',
    TIME: '剩余时间',
    WIN_CONDITIONS: '胜利条件',
    WIN_MSG: '有',
    COIN: '硬币',

    // エラーメッセージ
    NULL_NAME_ERR: '请输入你的名字。', // 名前が未入力
    SYMBOL_ERR: '您不能输入该字符。', // 禁止文字が入力されている
    NULL_BID_ERR: '请输入金额。', // 金額が未入力
    NUM_ERR: '您只能输入数字。', // 数字以外が入力されている
    BID_ERR: '请输入高于最高出价的金额。', // 最高入札額以下の金額が入力されている
    LACK_ERR: "你没有足够的钱。", // 所持金が足りない

    // ナビゲーションメッセージ
    GIVE_CARD_MSG: '向玩家分发卡片…',
    SHOW_TAR_MSG: '目标卡是 ',
    SHOW_AUC_MSG: ' 被展出。',
    AUCTION_MSG1: '输入您的出价金额、选择出价 "',
    AUCTION_MSG2: '" 或通过。',
    AUC_BID_MSG1: ' 出价 ',
    AUC_BID_MSG2: ' 硬币。',
    AUC_HIGHEST_MSG1: '当前最高出价: ',
    AUC_HIGHEST_MSG2: '硬币 ( ',
    AUC_HIGHEST_MSG3: ' )',
    AUC_RESULT_MSG0: '无人出价。',
    AUC_RESULT_MSG1: ' 用',
    AUC_RESULT_MSG2: '硬币中标了 "',
    AUC_RESULT_MSG3: '"!',
    CALCULATE_MSG1: '从你的手牌中选择一张牌、使计算结果为"',
    CALCULATE_MSG2: '"、然后按「回答」按钮。',
    CALC_ERR_MSG: '请从您的手牌中选择一张牌!',
    CALC_RESULT_MSG0: '不正确…! 再次计算或通过。',
    CALC_RESULT_MSG1: '正确!! 请等待其他玩家…',
    CALC_FINISH_MSG0: '没有人给出正确答案…',
    CALC_FINISH_MSG1: '正确答案是 ',
    CALC_FINISH_MSG2: '! 正确答案将获得',
    CALC_FINISH_MSG3: '硬币!',
    PASS_TITLE: '你确定你不想出价吗？',
    PASS_MSG: '如果要通过，请按「是的」按钮。',

}