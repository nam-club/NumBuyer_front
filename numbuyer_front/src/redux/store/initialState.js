const initialState = {
    player: {
        playerId: '',
        cards: [],
        coin: 0
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
    }
};

export default initialState;