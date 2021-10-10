const initialState = {
    players: [],
    room: {
        code: ''
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
        answerCard: '　',
        auctionCard: '　',
        playerName: '',
        coin: 0,
        skipFlg: false,
        passFlg: true, // 全員パスしたフラグ
    }
};

export default initialState;