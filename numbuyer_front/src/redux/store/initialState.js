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
        status: '',
        message: '',
        time: 0,
        answerCard: '',
        AuctionCard: ''
    }
};

export default initialState;