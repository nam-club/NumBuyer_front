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
        state: '',
        message: '　',
        time: 0,
        answerCard: '　',
        auctionCard: '　',
        playerName: '',
        coin: 0,
        skipFlg: false,
    }
};

export default initialState;