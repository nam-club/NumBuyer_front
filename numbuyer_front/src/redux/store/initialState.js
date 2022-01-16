import * as ConstantsMsg from '../../constantsMsg';

const initialState = {
    players: {
        player: {
            playerId: '', // 自分のプレイヤーID
            cards: [], // 自分の手札
            coin: 0, // 自分の所持コイン
            isOwner: false, // ルームオーナー権限
        },
        players: [], // プレイヤー一覧
        ranking: [], // ランキング
    },
    room: {
        roomId: '' // ルームID
    },
    msg: {
        lang: ConstantsMsg.English, // 言語
        validFlg: false, // バリデーションフラグ
        errMsg: '', // エラーメッセージ
    },
    game: {
        phase: '', // フェーズ
        phaseTimes: { // 各フェーズ時間
            ready: 0,
            giveCards: 0,
            showTarget: 0,
            showAuction: 0,
            auction: 0,
            auctionResult: 0,
            calculate: 0,
            calculateResult: 0,
            nextTurn: 0
        },
        message: '　', // ナビゲーション用メッセージ
        time: 0, // 画面表示用タイマー
        remainingTime: 0, // オークション用残り時間
        remTimeFlg: false, // 残り時間追加フラグ
        goalCoin: 0, // 目標コイン
        targetCard: '　', // ターゲットカード
        auctionCard: '　', // オークションカード
        ansPlayers: null, // 正解者配列
        highestBid: 0, // 現在の最高入札額
        highestName: '', // 現在の最高入札額のプレイヤー名
        finishFlg: false, // ゲーム終了フラグ
        winPlayerName: '', // 勝利プレイヤー名
        aucBtnFlg: true, // オークション関連ボタン押下可能フラグ
        calcBtnFlg: true, // 計算関連ボタン押下可能フラグ
        firstTurnFlg: true, // 初回ターンフラグ
        targetSkipFlg: false, // ターゲットフェーズスキップフラグ
    }
};

export default initialState;