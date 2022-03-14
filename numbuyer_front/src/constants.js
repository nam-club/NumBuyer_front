// 初期プロパティ
export const COIN = 100;


// アビリティステータス
export const ACTIVE_ST = 'active';
export const READY_ST = 'ready';
export const UNUSED_ST = 'unused';
export const USED_ST = 'used';

// アビリティタイプ
export const BST_TP = 'boost';
export const ATK_TP = 'attack';
export const DEF_TP = 'defense';
export const JAM_TP = 'jam';
export const CNF_TP = 'confuse';

// アクティブスキル
export const ACT_SKL = 'active';
export const PSV_SKL = 'passive';

// アビリティ（ブースト系）
export const BST_ABILITIES = [
    {
        abilityId: "bst_prm_001",
        status: UNUSED_ST,
        type: BST_TP,
        skill: PSV_SKL,
        display: [
            {
                lang: "English",
                name: "Fi-Boost",
                comment: "If you can answer within 5 seconds, you can get an additional 5 coins.[Passive Ability]",
            },
            {
                lang: "Japanese",
                name: "ファイブースト",
                comment: "5秒以内に解答できたら追加で5コイン獲得できる。[パッシブアビリティ]",
            },
            {
                lang: "Chinese",
                name: "五促进",
                comment: "如果您能在5秒内回答, 您可以额外获得5个硬币。[被动技能]",
            },
        ],
    },
]

// アビリティ（攻撃系）
export const ATK_ABILITIES = [
    {
        abilityId: 'atk_prm_001',
        status: UNUSED_ST,
        type: ATK_TP,
        skill: PSV_SKL,
        display: [
            {
                lang: "English",
                name: "NumViolence",
                comment: "If the number of cards used for the answer is the largest among all, the cards of all the opponents are randomly reduced by one.[Passive Ability]",
            },
            {
                lang: "Japanese",
                name: "数の暴力",
                comment: "解答に使用したカード枚数が全員の中で最も多ければ、相手全員のカードをランダムに1枚減らす。[パッシブアビリティ]",
            },
            {
                lang: "Chinese",
                name: "数字的暴政",
                comment: "如果用于答案的牌数是所有牌中最多的, 则所有对手的牌随机减一。[被动技能]",
            },
        ],
    },
]
// アビリティ（防御系）
export const DEF_ABILITIES = [
    {
        abilityId: 'def_tmp_001',
        status: UNUSED_ST,
        type: DEF_TP,
        skill: ACT_SKL,
        display: [
            {
                lang: "English",
                name: "Bring Yourself",
                comment: "Negate all abilities of the opponent that activates the next turn, and if the effect affects you, bounce it back to the activated player (can be used up to 5 times). Also, this ability will not be disclosed to the opponent that it is being activated.[Active Ability]",
            },
            {
                lang: "Japanese",
                name: "自業自得",
                comment: "次のターン発動する相手のアビリティを全て無効化し、その効果が自分に影響のある効果であれば発動したプレイヤーに跳ね返す(5回まで使用可能)。また、このアビリティは発動中であることを相手に公開されない。[アクティブアビリティ]",
            },
            {
                lang: "Chinese",
                name: "善有善报恶有恶报",
                comment: "使下回合发动的对手的所有能力无效, 如果效果影响到你, 将其弹回给发动的玩家（最多可使用5次）。此外, 该能力不会向对手透露它正在被激活。[主动技能]",
            },
        ],
    },
]

// アビリティ（妨害系）
export const JAM_ABILITIES = [
    {
        abilityId: 'jam_prm_001',
        status: UNUSED_ST,
        type: JAM_TP,
        skill: PSV_SKL,
        display: [
            {
                lang: "English",
                name: "Shut Down",
                comment: "If you can answer within 5 seconds, the answer phase will be terminated.[Passive Ability]",
            },
            {
                lang: "Japanese",
                name: "シャットダウン",
                comment: "5秒以内に解答できたら解答フェーズを打ち切る。[パッシブアビリティ]",
            },
            {
                lang: "Chinese",
                name: "关掉",
                comment: "如果您能在5秒内回答, 则回答阶段将终止。[被动技能]",
            },
        ],
    },
]

// アビリティ（混乱系）
export const CNF_ABILITIES = [
    {
        abilityId: 'cnf_prm_001',
        status: UNUSED_ST,
        type: CNF_TP,
        skill: ACT_SKL,
        display: [
            {
                lang: "English",
                name: "Shake Shake",
                comment: "Randomly shuffle everyone's coins and hands (can only be used once).[Active Ability]",
            },
            {
                lang: "Japanese",
                name: "シェイクシェイク",
                comment: "全員のコインと手札をランダムにシャッフルする(1回のみ使用可能)。[アクティブアビリティ]",
            },
            {
                lang: "Chinese",
                name: "摇摇",
                comment: "随机洗牌每个人的硬币和手牌（只能使用一次）。[主动技能]",
            },
        ],
    },
];


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
