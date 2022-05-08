// 初期プロパティ
export const COIN = 100;

// チュートリアル
export const T_PAGE1 = "What is NumBuyer?";
export const T_PAGE2 = "Before Game";
export const T_PAGE3 = "Distribution and Publication";
export const T_PAGE4 = "Auction";
export const T_PAGE5 = "Calculation";
export const T_PAGE6 = "Use Ability";

// メッセージ表示時間
export const ABL_MSG_TIME = 10; // アビリティメッセージ表示時間

// アビリティステータス
export const UNUSED_ST = 'unused'; // 効果未使用
export const READY_ST = 'ready'; // 効果発動準備中
export const ACTIVE_ST = 'active'; // 効果発動中
export const USED_ST = 'used'; // 効果使用済

// アビリティタイプ
export const BST_TP = 'boost';
export const ATK_TP = 'attack';
export const RCV_TP = 'recover';
export const JAM_TP = 'jam';
export const CNF_TP = 'confuse';
export const NON_TP = 'none';

// トリガー
export const ACT_TRG = 'active';
export const PSV_TRG = 'passive';

// アビリティ（ブースト系）
export const BST_ABILITIES = [
    {
        abilityId: "bst_prm_001",
        display: [
            {
                lang: "English",
                name: "Fi-Boost",
                comment: "If you can answer within 5 seconds, you can get an additional 5 coins.[Passive Ability]",
                fired_msg: ["Answered within 5 seconds, so ", " earns an additional 5 coins!"],
            },
            {
                lang: "Japanese",
                name: "ファイブースト",
                comment: "5秒以内に解答できたら追加で5コイン獲得できる。[パッシブアビリティ]",
                fired_msg: ["5秒以内に解答したので、", "は追加で5コイン獲得！"],
            },
            {
                lang: "Chinese",
                name: "五促进",
                comment: "如果您能在5秒内回答, 您可以额外获得5个硬币。[被动技能]",
                fired_msg: ["5秒内回复, ", "额外获得5个金币！"],
            },
        ],
    },
]

// アビリティ（攻撃系）
export const ATK_ABILITIES = [
    {
        abilityId: 'atk_prm_001',
        display: [
            {
                lang: "English",
                name: "NumViolence",
                comment: "If the number of cards used for the answer is the largest among all, the cards of all the opponents are randomly reduced by 2.[Passive Ability]",
                fired_msg: ["The number of cards used for the answer was the highest, so the opponent's cards were randomly reduced by two!"],
            },
            {
                lang: "Japanese",
                name: "数の暴力",
                comment: "解答に使用したカード枚数が全員の中で最も多ければ、相手全員のカードをランダムに2枚減らす。[パッシブアビリティ]",
                fired_msg: ["解答に使用したカード枚数が最も多かったので、相手全員のカードをランダムに2枚減らした！"],
            },
            {
                lang: "Chinese",
                name: "数字的暴政",
                comment: "如果用于答案的牌数是所有牌中最多的, 则所有对手的牌随机减2。[被动技能]",
                fired_msg: ["用于答题的卡牌数量最多，所以对手的卡牌随机减少了两张！"],
            },
        ],
    },
]
// アビリティ（回復系）
export const RCV_ABILITIES = [
    {
        abilityId: 'rcv_tmp_001',
        display: [
            {
                lang: "English",
                name: "Reload",
                comment: "You can pay half the coins and redraw all your hands (the auction phase cannot be activated).[Active Ability]",
                fired_msg: ["paid half the coins and redrawn all hands!"],
                err_msg: "This ability cannot be used during the auction phase.",
            },
            {
                lang: "Japanese",
                name: "リロード",
                comment: "コインを半分支払って自分の手札を全て引き直せる（オークションフェーズは発動できない）。[アクティブアビリティ]",
                fired_msg: ["コインを半分支払い、手札を全て引き直した！"],
                err_msg: "このアビリティはオークションフェーズに使用できません。",
            },
            {
                lang: "Chinese",
                name: "重新加载",
                comment: "您可以支付一半的硬币并重新绘制所有手牌（拍卖阶段无法激活）。[主动技能]",
                fired_msg: ["支付了一半的硬币并重新绘制了所有的手！"],
                err_msg: "此能力不能在拍卖阶段使用。",
            },
        ],
    },
]

// アビリティ（妨害系）
export const JAM_ABILITIES = [
    {
        abilityId: 'jam_prm_001',
        display: [
            {
                lang: "English",
                name: "Shut Down",
                comment: "If you can answer within 5 seconds, the answer phase will be terminated.[Passive Ability]",
                fired_msg: ["The answer phase was terminated!"],
            },
            {
                lang: "Japanese",
                name: "シャットダウン",
                comment: "自分が正解した時点で全員の解答フェーズを打ち切る。不正解だと自分の解答フェーズが打ち切られる。[パッシブアビリティ]",
                fired_msg: ["解答フェーズは打ち切られた！"],
            },
            {
                lang: "Chinese",
                name: "关掉",
                comment: "如果您能在5秒内回答, 则回答阶段将终止。[被动技能]",
                fired_msg: ["答题阶段已结束！"],
            },
        ],
    },
]

// アビリティ（混乱系）
export const CNF_ABILITIES = [
    {
        abilityId: 'cnf_tmp_001',
        display: [
            {
                lang: "English",
                name: "Catastrophe",
                comment: "Reduce everyone's coins by 0-30 coins (can only be used once).[Active Ability]",
                fired_msg: ["Everyone's coins have been reduced by 0-30 coins!"],
            },
            {
                lang: "Japanese",
                name: "カタストロフィ",
                comment: "全員のコインを0〜30コイン減らす(1回のみ使用可能)。[アクティブアビリティ]",
                fired_msg: ["全員のコインが0〜30コイン減らされた！"],
            },
            {
                lang: "Chinese",
                name: "灾难",
                comment: "减少每个人的硬币0-30个硬币（只能使用一次）。[主动技能]",
                fired_msg: ["每个人的金币都减少了0-30金币！"],
            },
        ],
    },
];

// アビリティ（非公開）
export const PRV_ABILITY = 
    {
        abilityId: 'prv',
        display: [
            {
                lang: "English",
                name: "???",
            },
            {
                lang: "Japanese",
                name: "???",
            },
            {
                lang: "Chinese",
                name: "???",
            },
        ],
    };


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

// 入力可能文字列 
export const NAME_EXP = "[¥$=<>+*]+";
export const BID_EXP = "[0-9]+";

// 成功・失敗ステータス
export const SUCCESS = "SUCCESS";
export const FAILED = "FAILED";
export const NONE = "NONE";

// 計算結果ステータス
export const CORRECT = "correct";
export const INCORRECT = "incorrect";
export const PASS = "pass";
export const INC_PASS = "incorrectWithPass";

// レスポンスエラー
export const VALID_ERR = "error.validation";
export const JOIN_ERR = "can not join game";