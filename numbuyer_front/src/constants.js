// 初期プロパティ
export const COIN = 100;


// アビリティステータス
export const UNUSED_ST = 'unused'; // 効果未使用
export const READY_ST = 'ready'; // 効果発動準備中
export const ACTIVE_ST = 'active'; // 効果発動中
export const USED_ST = 'used'; // 効果使用済

// アビリティタイプ
export const BST_TP = 'boost';
export const ATK_TP = 'attack';
export const DEF_TP = 'defense';
export const JAM_TP = 'jam';
export const CNF_TP = 'confuse';

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
                fired_msg1: "Answered within 5 seconds, so ",
                fired_msg2: " earns an additional 5 coins!",
            },
            {
                lang: "Japanese",
                name: "ファイブースト",
                comment: "5秒以内に解答できたら追加で5コイン獲得できる。[パッシブアビリティ]",
                fired_msg1: "5秒以内に解答したので、",
                fired_msg2: "は追加で5コイン獲得！",
            },
            {
                lang: "Chinese",
                name: "五促进",
                comment: "如果您能在5秒内回答, 您可以额外获得5个硬币。[被动技能]",
                fired_msg: "5秒内回复, ",
                fired_msg2: "额外获得5个金币！",
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
                fired_msg1: "The number of cards used for the answer was the highest, ",
                fired_msg2: "so the opponent",
                fired_msg3: "'s cards were randomly reduced by two!",
            },
            {
                lang: "Japanese",
                name: "数の暴力",
                comment: "解答に使用したカード枚数が全員の中で最も多ければ、相手全員のカードをランダムに2枚減らす。[パッシブアビリティ]",
                fired_msg1: "解答に使用したカード枚数が最も多かったので、",
                fired_msg2: "相手全員",
                fired_msg3: "のカードをランダムに2枚減らした！",
            },
            {
                lang: "Chinese",
                name: "数字的暴政",
                comment: "如果用于答案的牌数是所有牌中最多的, 则所有对手的牌随机减2。[被动技能]",
                fired_msg1: "用于答题的卡牌数量最多，",
                fired_msg2: "所以对手",
                fired_msg3: "的卡牌随机减少了两张！",
            },
        ],
    },
]
// アビリティ（防御系）
export const DEF_ABILITIES = [
    {
        abilityId: 'def_tmp_001',
        display: [
            {
                lang: "English",
                name: "Bring Yourself",
                comment: "Negate all abilities of the opponent that activates the next turn, and if the effect affects you, bounce it back to the activated player (can be used up to 5 times). Also, this ability will not be disclosed to the opponent that it is being activated.[Active Ability]",
                fired_msg1: "Disable the activation of ",
                fired_msg2: "! And ",
            },
            {
                lang: "Japanese",
                name: "自業自得",
                comment: "次のターン発動する相手のアビリティを全て無効化し、その効果が自分に影響のある効果であれば発動したプレイヤーに跳ね返す(5回まで使用可能)。また、このアビリティは発動中であることを相手に公開されない。[アクティブアビリティ]",
                fired_msg1: "の発動を無効にした！",
                fired_msg2: "さらに",
            },
            {
                lang: "Chinese",
                name: "善有善报恶有恶报",
                comment: "使下回合发动的对手的所有能力无效, 如果效果影响到你, 将其弹回给发动的玩家（最多可使用5次）。此外, 该能力不会向对手透露它正在被激活。[主动技能]",
                fired_msg1: "禁用 ",
                fired_msg2: "！而且",
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
                fired_msg1: "Answered within 5 seconds, so the answer phase was terminated!",
            },
            {
                lang: "Japanese",
                name: "シャットダウン",
                comment: "5秒以内に解答できたら解答フェーズを打ち切る。[パッシブアビリティ]",
                fired_msg1: "5秒以内に解答したので、解答フェーズは打ち切られた！",
            },
            {
                lang: "Chinese",
                name: "关掉",
                comment: "如果您能在5秒内回答, 则回答阶段将终止。[被动技能]",
                fired_msg1: "5秒内回复, 答题阶段已结束！",
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
                name: "Shake Shake",
                comment: "At the beginning of the next turn, randomly shuffle everyone's coins and hands (can only be used once).[Active Ability]",
                fired_msg1: "Everyone's coins and hands have been shuffled!",
            },
            {
                lang: "Japanese",
                name: "シェイクシェイク",
                comment: "次のターンの開始時、全員のコインと手札をランダムにシャッフルする(1回のみ使用可能)。[アクティブアビリティ]",
                fired_msg1: "全員のコインと手札がシャッフルされた！",
            },
            {
                lang: "Chinese",
                name: "摇摇",
                comment: "在下一回合开始时、随机洗牌每个人的硬币和手牌（只能使用一次）。[主动技能]",
                fired_msg1: "每个人的硬币和手都被洗牌了！",
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

// 正解ステータス
export const SUCCESS = "SUCCESS";
export const FAILED = "FAILED";
export const NONE = "NONE";