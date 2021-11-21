const initialState = {
    player: {
        playerId: '', // 自分のプレイヤーID
        cards: [], // 自分の手札
        coin: 0, // 自分の所持コイン
        isOwner: false, // ルームオーナー権限
    },
    players: [],
    room: {
        roomId: '' // ルームID
    },
    msg: {
        validFlg: false, // バリデーションフラグ
        errMsg: '', // エラーメッセージ
    },
    game: {
        phase: '', // フェーズ
        message: '　', // ナビゲーション用メッセージ
        time: 0, // 画面表示用タイマー
        targetCard: '　', // ターゲットカード
        auctionCard: '　', // オークションカード
        ansPlayers: [], // 正解者配列
        highestBid: 0, // 現在の最高入札額
        highestName: '', // 現在の最高入札額のプレイヤー名
        finishFlg: false, // ゲーム終了フラグ
        winPlayerName: '', // 勝利プレイヤー名
        aucBtnFlg: true, // オークション関連ボタン押下可能フラグ
        calcBtnFlg: true, // 計算関連ボタン押下可能フラグ
    }
};

export default initialState;