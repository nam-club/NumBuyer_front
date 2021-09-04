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
        AuctionCard: '　'
    }
};

export default initialState;