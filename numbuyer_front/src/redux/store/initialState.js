const initialState = {
    player: {
        playerId: '',
        cards: [],
        coin: 0,
        isOwner: false,
    },
    players: [],
    room: {
        roomId: ''
    },
    top: {
        validFlg: false,
        errMsg: '',
        name: ''
    },
    game: {
        phase: '',
        message: '　',
        time: 0,
        targetCard: '　',
        auctionCard: '　',
        playerName: '',
        coin: 0,
        skipFlg: false, // 時間をスキップするフラグ
        passFlg: true, // 全員パスしたフラグ
        ansPlayers: [], // 正解者配列
        highestBid: 0, // 現在の最高入札額
        finishFlg: false, // ゲーム終了フラグ
        winPlayerName: '', // 勝利プレイヤー名
    }
};

export default initialState;