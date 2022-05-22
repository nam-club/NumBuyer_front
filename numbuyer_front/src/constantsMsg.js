export const English = {
    // 言語
    LANGUAGE: 'English',

    // ボタン・タグ
    PLAYER_NAME: "Player Name",
    QUICK_MATCH: "Quick Match",
    FRIEND_MATCH: "Play with Friend",
    LANG_EN: "English",
    LANG_JP: "Japanese",
    LANG_CN: "Chinese",
    TUTORIAL: "Tutorial",
    INTRODUCTION: "What is NumBuyer?",
    CAPTION: "Game Flow",
    TIME_LINE1: "Before Game",
    TIME_LINE2: "Distribution and Publication",
    TIME_LINE3: "Auction",
    TIME_LINE4: "Calculation",
    CREATE_BTN: "Create",
    JOIN_BTN: "Join",
    ROOM_ID: "Room ID",
    ABILITY: "Please select two abilities.",
    ABILITY_EXP1: "Abilities are special abilities that can be activated during the game.",
    ABILITY_EXP2: "There are active abilities that can be used only a limited number of times and passive abilities that are always in effect.",
    BST_TYPE: 'Boost Type',
    ATK_TYPE: 'Attack Type',
    RCV_TYPE: 'Recover Type',
    JAM_TYPE: 'Jamming Type',
    CNF_TYPE: 'Confusion Type',
    LOBBY: 'Lobby',
    SETTING: 'Settings',
    MULTIPLICATION: 'Multiplication',
    DIVISION: 'Division',
    LIMIT: 'Limit of Number',
    START_BTN: 'Start',
    BACK_BTN: 'Back',
    TARGET: 'Target Card',
    AUCTION: 'Auction Cards',
    BID_MSG: 'Please enter the bid amount',
    BID_BTN: 'Bid',
    SUCCESS_BID: 'Successful bid!',
    PASS_BTN: 'Pass',
    ANSWER_BTN: 'Answer',
    ABILITY_TAG: 'Use Abilities',
    YOUR_CARDS: 'Your Cards',
    CALCULATE_FIELD: 'Calculate Field',
    YES_BTN: 'Yes',
    NO_BTN: 'No',
    SUCCESS: 'SUCCESS!',
    FAILED: 'FAILED…!',
    CONFIRM_BTN: 'Done',
    TIME: 'Time',
    WIN_CONDITIONS: 'Win conditions',
    WIN_MSG: 'Have',
    COIN: 'Coin',
    RANKING: 'RANKING',
    FINISH_BTN: 'Finish Game',
    AGAIN_BTN: 'Play Again',

    // チュートリアルメッセージ
    INTRODUCTION_MSG1: "NumBuyer is a title born from the two words Number and Buyer, and as the name implies, it is a new type of card game that combines a calculation card game with an auction element.",
    INTRODUCTION_MSG2: "Game rules",
    INTRODUCTION_MSG3: "First, 5 cards of 2 types, numbers and operators, are randomly dealt.",
    INTRODUCTION_MSG4: "After that, a Target card with numbers will be released. You can earn coins by combining the cards you have to make the number of Target card.",
    INTRODUCTION_MSG5: "The first person to collect the amount of coins presented as a victory condition is the winner of this game!",
    INTRODUCTION_MSG6: "One card will be dealt each turn, but that alone will not be enough to make the number of Target card. Therefore, the Auction card will be released after the Target card is released.",
    INTRODUCTION_MSG7: "This Auction card can be obtained in an auction format using your coins.",
    INTRODUCTION_MSG8: "Let's make good use of Auction cards and efficiently create numbers for Target card!",
    INTRODUCTION_MSG9: "After the end of the auction phase, the calculation phase comes. Let's make a calculation formula so that the number of the Target card will be the calculation result with the card you have. (Of course, you can use only one card that has exactly the same number as the Target card)",
    INTRODUCTION_MSG10: "If you can make the numbers of the Target card brilliantly, you will get coins for the value of the Target card and the number of cards you used! (You will get bonus coins according to the number of cards you used!)",
    INTRODUCTION_MSG11: "After that, let's just repeat this series of steps and collect a lot of coins faster than anyone else!",

    // エラーメッセージ
    NULL_NAME_ERR: "Please enter your name.", // 名前が未入力
    SYMBOL_ERR: "You cannot enter that character.", // 禁止文字が入力されている
    NULL_ROOM_ID_ERR: "Please enter Room ID.", // ルームが未入力
    LENGTH_ROOM_ID_ERR: 'Please enter the room ID in 10 digits.', // ルームIDが10桁以外
    NOT_EXIST_ROOM_ERR: 'This room ID does not exist.', // 存在しないルームID
    ABILITY_ERR: 'Please select two abilities.', // アビリティを2つ選択していない
    NULL_BID_ERR: "Please enter the amount.", // 金額が未入力
    NUM_ERR: "You can only enter numbers.", // 数字以外が入力されている
    BID_ERR: "Please enter an amount higher than the highest bid.", // 最高入札額以下の金額が入力されている
    LACK_ERR: "You don't have enough money.", // 所持金が足りない
    DOUBLE_ERR: "You cannot bid twice in a row.", // ２回連続入札
    BAD_TIMING_ABILITY_AUC_ERR: "This ability cannot be used during the auction phase.", // オークションフェーズに発動できないアビリティ

    // ナビゲーションメッセージ
    QUICK_MSG: 'The game will start automatically when all four players are together.',
    GIVE_CARD_MSG: 'Distributing cards to players...',
    SHOW_TAR_MSG: 'The target card is ',
    SHOW_AUC_MSG: ' was exhibited',
    AUCTION_MSG1: "Please enter the bid amount and select whether to bid for ' ",
    AUCTION_MSG2: " ' or pass.",
    AUC_BID_MSG1: ' bid for ',
    AUC_BID_MSG2: ' coin.',
    AUC_HIGHEST_MSG1: 'Current highest bid: ',
    AUC_HIGHEST_MSG2: 'coin ( ',
    AUC_HIGHEST_MSG3: ' )',
    AUC_RESULT_MSG0: 'No one bid.',
    AUC_RESULT_MSG1: " made a successful bid for ' ",
    AUC_RESULT_MSG2: " ' with ",
    AUC_RESULT_MSG3: ' coin! ',
    CALCULATE_MSG1: "Select from your cards so that the calculation result is ' ",
    CALCULATE_MSG2: " ' and press 'ANSWER'.",
    CALC_ERR_MSG1: 'Please select your Cards!',
    CALC_ERR_MSG2: 'Code is at the end!',
    CALC_RESULT_MSG0: 'Incorrect...! Calc again or pass.',
    CALC_RESULT_MSG1: 'Correct!! One card will be given! Please wait for other players...',
    CALC_FINISH_MSG0: 'There was no one giving correct answer...',
    CALC_FINISH_MSG1: 'It was ',
    CALC_FINISH_MSG2: ' who gave the correct answer! ',
    CALC_FINISH_MSG3_1: ' get ',
    CALC_FINISH_MSG3_2: ' coin(card number bonus : ',
    CALC_FINISH_MSG3_3: ' coin) and one card! ',
    PASS_TITLE: 'Are you sure you want to pass?',
    PASS_MSG: "If you want to pass, press the 'YES'",
    ABILITY_TITLE: "Do you really use it?",
    ABILITY_MSG: "If you want to use, press the 'YES'",
    FIRED_ABILITY_MSG1: " activates '",
    FIRED_ABILITY_MSG2: "'!",

}

export const Japanese = {
    // 言語
    LANGUAGE: 'Japanese',

    // ボタン・タグ
    PLAYER_NAME: 'プレイヤー名',
    QUICK_MATCH: '誰かと対戦する',
    FRIEND_MATCH: '友達と対戦する',
    LANG_EN: '英語',
    LANG_JP: '日本語',
    LANG_CN: '中国語',
    TUTORIAL: 'チュートリアル',
    INTRODUCTION: 'NumBuyerとは',
    CAPTION: 'ゲームの流れ',
    TIME_LINE1: 'ゲームを始めるまで',
    TIME_LINE2: 'カードの配布と公開',
    TIME_LINE3: 'オークション',
    TIME_LINE4: '計算',
    CREATE_BTN: '部屋を作る',
    JOIN_BTN: '部屋に参加する',
    ROOM_ID: 'ルームID',
    ABILITY: 'アビリティを2つ選択してください。',
    ABILITY_EXP1: "アビリティはゲーム中に発動できる特殊能力です。",
    ABILITY_EXP2: "使用回数の限られているアクティブアビリティと常に効果が発動しているパッシブアビリティがあります。",
    BST_TYPE: '速攻タイプ',
    ATK_TYPE: '攻撃タイプ',
    RCV_TYPE: '回復タイプ',
    JAM_TYPE: '妨害タイプ',
    CNF_TYPE: '混乱タイプ',
    LOBBY: 'ロビー',
    SETTING: '各種設定',
    MULTIPLICATION: '掛け算',
    DIVISION: '割り算',
    LIMIT: '数字の上限',
    START_BTN: 'スタート',
    BACK_BTN: '退出する',
    TARGET: '目標カード',
    AUCTION: 'オークションカード',
    BID_MSG: '入札金額を入力してください。',
    BID_BTN: '入札',
    SUCCESS_BID: '落札成功！',
    PASS_BTN: 'パス',
    ANSWER_BTN: '解答',
    ABILITY_TAG: 'アビリティを使う',
    YOUR_CARDS: 'あなたの手札',
    CALCULATE_FIELD: '計算フィールド',
    YES_BTN: 'はい',
    NO_BTN: 'いいえ',
    SUCCESS: '正解！',
    FAILED: '不正解…！',
    CONFIRM_BTN: '確定',
    TIME: '残り時間',
    WIN_CONDITIONS: '勝利条件',
    WIN_MSG: 'を集める',
    COIN: 'コイン',
    RANKING: 'ランキング',
    FINISH_BTN: 'ゲームをやめる',
    AGAIN_BTN: 'もう一度プレイする',

    // チュートリアルメッセージ
    INTRODUCTION_MSG1: 'NumBuyerとはNumber(数字)とBuyer(買い手)の二つの単語から生まれたタイトルであり、その名の通り計算カードゲームにオークション要素を組み合わせた新感覚のカードゲームです。',
    INTRODUCTION_MSG2: 'ゲームのルール',
    INTRODUCTION_MSG3: '最初に数字と演算子の２種類のカードがランダムに５枚配られます。',
    INTRODUCTION_MSG4: 'その後、数字が書かれた「目標カード」が公開されます。手持ちのカードを組み合わせて「目標カード」の数字を作るとコインを獲得できます。',
    INTRODUCTION_MSG5: '勝利条件として提示された額のコインを一番最初に集めた人がこのゲームの勝者です!',
    INTRODUCTION_MSG6: '毎ターン１枚ずつカードは配られますが、それだけでは「目標カード」の数字を作るまでの道のりが程遠いでしょう。したがって「目標カード」の公開後に「オークションカード」が公開されます。',
    INTRODUCTION_MSG7: 'この「オークションカード」は手持ちのコインを使ってオークション形式で入手することができます。',
    INTRODUCTION_MSG8: '「オークションカード」をうまく活用して「目標カード」の数字を効率良く作りましょう!',
    INTRODUCTION_MSG9: 'オークションフェーズの終了後、計算フェーズがやってきます。手持ちのカードで「目標カード」の数字が計算結果となるように計算式を作りましょう。(もちろん「目標カード」の数字と全く同じカードを１枚だけ使っても良いです)',
    INTRODUCTION_MSG10: '「目標カード」の数字を見事作ることができれば「目標カード」の値と使用した手札の枚数分のコインがもらえます!(使ったカードの枚数に応じて、ボーナスコインがもらえます!)',
    INTRODUCTION_MSG11: '後はひたすらこの一連の流れを繰り返してコインを誰よりも早くたくさん集めましょう!',

    // エラーメッセージ
    NULL_NAME_ERR: '名前を入力してください。', // 名前が未入力
    SYMBOL_ERR: 'その文字は入力できません。', // 禁止文字が入力されている
    NULL_ROOM_ID_ERR: 'ルームIDを入力してください。', // ルームIDが未入力
    LENGTH_ROOM_ID_ERR: 'ルームIDは１０桁で入力してください。', // ルームIDが10桁以外
    NOT_EXIST_ROOM_ERR: '存在しないルームIDです。', // 存在しないルームID
    ABILITY_ERR: 'アビリティを２つ選択してください。', // アビリティを2つ選択していない
    NULL_BID_ERR: '金額を入力してください。', // 金額が未入力
    NUM_ERR: '数字を入力してください。', // 数字以外が入力されている
    BID_ERR: '最高入札額より高い金額を入力してください。', // 最高入札額以下の金額が入力されている
    LACK_ERR: "所持金が足りません。", // 所持金が足りない
    DOUBLE_ERR: "２回続けて入札はできません。", // ２回連続入札
    BAD_TIMING_ABILITY_AUC_ERR: "このアビリティはオークションフェーズに使用できません。", // オークションフェーズに発動できないアビリティ

    // ナビゲーションメッセージ
    QUICK_MSG: '４人揃うと自動でゲームが始まります。',
    GIVE_CARD_MSG: 'カードを配布しています…',
    SHOW_TAR_MSG1: '目標カードは ',
    SHOW_TAR_MSG2: ' です。',
    SHOW_AUC_MSG: ' が出品されました。',
    AUCTION_MSG1: '入札金額を入力し、 ',
    AUCTION_MSG2: ' に入札するかパスするかを選択してください。',
    AUC_BID_MSG1: ' が ',
    AUC_BID_MSG2: 'コインで入札しました。',
    AUC_HIGHEST_MSG1: '現在の最高入札額: ',
    AUC_HIGHEST_MSG2: 'コイン ( ',
    AUC_HIGHEST_MSG3: ' )',
    AUC_RESULT_MSG0: '誰も入札しませんでした。',
    AUC_RESULT_MSG1: ' が ',
    AUC_RESULT_MSG2: ' を',
    AUC_RESULT_MSG3: 'コインで落札しました!',
    CALCULATE_MSG1: 'あなたの手札から計算結果が ',
    CALCULATE_MSG2: ' になるようにカードを選択して、「解答」を押してください。',
    CALC_ERR_MSG1: '手札からカードを選択してください!',
    CALC_ERR_MSG2: '符号が末尾に置かれています!',
    CALC_RESULT_MSG0: '不正解です…! 再び解答するかパスをしてください。',
    CALC_RESULT_MSG1: '正解!! カードが１枚付与されます! 他のプレイヤーが解答するのを待っています…',
    CALC_FINISH_MSG0: '正解者は誰もいませんでした…',
    CALC_FINISH_MSG1: '正解者は ',
    CALC_FINISH_MSG2: ' です! ',
    CALC_FINISH_MSG3_1: 'に',
    CALC_FINISH_MSG3_2: 'コイン(カード枚数ボーナス: +',
    CALC_FINISH_MSG3_3: 'コイン）とカードが１枚配られました! ',
    PASS_TITLE: '本当にパスしますか？',
    PASS_MSG: 'パスする場合は「はい」を押してください。',
    ABILITY_TITLE: "本当に使用しますか？",
    ABILITY_MSG: "使用する場合は「はい」を押してください。",
    FIRED_ABILITY_MSG1: "が「",
    FIRED_ABILITY_MSG2: "」を発動した！",

}

export const Chinese = {
    // 言語
    LANGUAGE: 'Chinese',

    // ボタン・タグ
    PLAYER_NAME: '选手姓名',
    QUICK_MATCH: '与某人比赛',
    FRIEND_MATCH: '与朋友对战',
    LANG_EN: '英语',
    LANG_JP: '日语',
    LANG_CN: '中文',
    TUTORIAL: '教程',
    INTRODUCTION: '什么是 NumBuyer？',
    CAPTION: '游戏流程',
    TIME_LINE1: '直到比赛开始',
    TIME_LINE2: '卡片的分发和发布',
    TIME_LINE3: '拍卖',
    TIME_LINE4: '计算',
    CREATE_BTN: '做一个房间',
    JOIN_BTN: '加入房间',
    ROOM_ID: '房间号',
    ABILITY: '选择两个技能。',
    ABILITY_EXP1: "能力是可以在游戏中激活的特殊能力。有只能使用有限次数的主动技能和始终有效的被动技能。",
    ABILITY_EXP2: "有只能使用有限次数的主动技能和始终有效的被动技能。",
    BST_TYPE: '急速类型',
    ATK_TYPE: '攻击类型',
    RCV_TYPE: '恢复类型',
    JAM_TYPE: '干扰类型',
    CNF_TYPE: '混乱类型',
    LOBBY: '大堂',
    SETTING: '各种设置',
    MULTIPLICATION: '乘法',
    DIVISION: '除法',
    LIMIT: '数字上限',
    START_BTN: '开始',
    BACK_BTN: '出口',
    TARGET: '目标卡',
    AUCTION: '拍卖卡',
    BID_MSG: '请输入投标金额。',
    BID_BTN: '投标',
    SUCCESS_BID: '中标！',
    PASS_BTN: '不叫牌',
    ANSWER_BTN: '回答',
    ABILITY_TAG: '使用能力',
    YOUR_CARDS: '你的手',
    CALCULATE_FIELD: '计算字段',
    YES_BTN: '是的',
    NO_BTN: '不是',
    SUCCESS: '正确答案！',
    FAILED: '错误的答案…！',
    CONFIRM_BTN: '确认',
    TIME: '剩余时间',
    WIN_CONDITIONS: '胜利条件',
    WIN_MSG: '有',
    COIN: '硬币',
    RANKING: '排行',
    FINISH_BTN: '退出游戏',
    AGAIN_BTN: '再玩一遍',

    // チュートリアルメッセージ
    INTRODUCTION_MSG1: 'NumBuyer是一个由Number和Buyer两个字诞生的称号, 顾名思义, 它是一种将计算卡牌游戏与拍卖元素相结合的新型卡牌游戏。',
    INTRODUCTION_MSG2: '游戏规则',
    INTRODUCTION_MSG3: '首先、随机发２种类型、数字和运算符的５张牌。',
    INTRODUCTION_MSG4: '之后、将发布带有数字的「目标卡」。您可以通过组合您必须制作「目标卡」数量的卡来赚取金币。',
    INTRODUCTION_MSG5: '第一个收集作为胜利条件的硬币数量的人就是这场比赛的获胜者！',
    INTRODUCTION_MSG6: '每回合会发一张牌、但仅凭这一点不足以构成“目标牌”的数量。因此、在「目标卡」发布后、「拍卖卡」将被发布。',
    INTRODUCTION_MSG7: '这张「拍卖卡」可以使用您的硬币以拍卖形式获得。',
    INTRODUCTION_MSG8: '让我们用好「拍卖牌」、为「目标牌”」高效开牌吧！',
    INTRODUCTION_MSG9: '拍卖阶段结束后、进入计算阶段。让我们做一个计算公式、这样「目标卡」的数量就是你拥有的卡的计算结果。（当然、您只能使用与「目标卡」编号完全相同的一张卡）',
    INTRODUCTION_MSG10: '如果你能把「目标卡」的数字打出精彩，你将获得「目标卡」的价值和你使用的卡数的金币！（你将根据你使用的卡数获得奖励金币！)',
    INTRODUCTION_MSG11: '之后、让我们重复这一系列步骤、并以比任何人更快的速度收集大量硬币！',

    // エラーメッセージ
    NULL_NAME_ERR: '请输入你的名字。', // 名前が未入力
    SYMBOL_ERR: '您不能输入该字符。', // 禁止文字が入力されている
    NULL_ROOM_ID_ERR: '请输入房间号。', // ルームIDが未入力
    LENGTH_ROOM_ID_ERR: '请输入１０位数字的房间ID。', // ルームIDが10桁以外
    NOT_EXIST_ROOM_ERR: '此房间ID不存在。', // 存在しないルームID
    ABILITY_ERR: '选择两个技能。', // アビリティを2つ選択していない
    NULL_BID_ERR: '请输入金额。', // 金額が未入力
    NUM_ERR: '您只能输入数字。', // 数字以外が入力されている
    BID_ERR: '请输入高于最高出价的金额。', // 最高入札額以下の金額が入力されている
    LACK_ERR: "你没有足够的钱。", // 所持金が足りない
    DOUBLE_ERR: "您不能连续出价两次。", // ２回連続入札
    BAD_TIMING_ABILITY_AUC_ERR: "此能力不能在拍卖阶段使用。", // オークションフェーズに発動できないアビリティ

    // ナビゲーションメッセージ
    QUICK_MSG: '当所有四个玩家在一起时, 游戏将自动开始。',
    GIVE_CARD_MSG: '向玩家分发卡片…',
    SHOW_TAR_MSG: '目标卡是 ',
    SHOW_AUC_MSG: ' 被展出。',
    AUCTION_MSG1: '输入您的出价金额, 选择出价 ',
    AUCTION_MSG2: ' 或通过。',
    AUC_BID_MSG1: ' 出价 ',
    AUC_BID_MSG2: ' 硬币。',
    AUC_HIGHEST_MSG1: '当前最高出价: ',
    AUC_HIGHEST_MSG2: ' 硬币 ( ',
    AUC_HIGHEST_MSG3: ' )',
    AUC_RESULT_MSG0: '无人出价。',
    AUC_RESULT_MSG1: ' 用',
    AUC_RESULT_MSG2: ' 硬币中标了 ',
    AUC_RESULT_MSG3: ' !',
    CALCULATE_MSG1: '从你的手牌中选择一张牌, 使计算结果为 ',
    CALCULATE_MSG2: ' 、然后按「回答」。',
    CALC_ERR_MSG1: '请从您的手牌中选择一张牌!',
    CALC_ERR_MSG2: '标志在最后!',
    CALC_RESULT_MSG0: '不正确…! 再次计算或通过。',
    CALC_RESULT_MSG1: '正确!! 将赠送一张卡片! 请等待其他玩家…',
    CALC_FINISH_MSG0: '没有人给出正确答案…',
    CALC_FINISH_MSG1: '正确答案是 ',
    CALC_FINISH_MSG2: '! ',
    CALC_FINISH_MSG3_1: '将获得',
    CALC_FINISH_MSG3_2: ' 硬币(卡号红利 : ',
    CALC_FINISH_MSG3_3: ' 硬币)和一张卡片! ',
    PASS_TITLE: '你确定你不想出价吗？',
    PASS_MSG: '如果要通过, 请按「是的」。',
    ABILITY_TITLE: "你真的会用吗？",
    ABILITY_MSG: "按'是的'使用",
    FIRED_ABILITY_MSG1: "激活「",
    FIRED_ABILITY_MSG2: "」!",
}