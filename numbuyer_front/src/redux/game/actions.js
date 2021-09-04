export const SET_STATE = "SET_STATE";

export const setStateAction = (stateState) => {
    return {
        type: "SET_STATE",
        payload: {
            state: stateState.state
        }
    }
}
export const SET_MESSAGE = "SET_MESSAGE";

export const setMessageAction = (messageState) => {
    return {
        type: "SET_MESSAGE",
        payload: {
            message: messageState.message
        }
    }
}

export const SET_TIME = "SET_TIME";

export const setTimeAction = (timeState) => {
    return {
        type: "SET_TIME",
        payload: {
            time: timeState.time
        }
    }
}

export const SET_ANSWER = "SET_ANSWER";

export const setAnswerAction = (answerState) => {
    return {
        type: "SET_ANSWER",
        payload: {
            answerCard: answerState.answerCard
        }
    }
}

export const SET_AUCTION = "SET_AUCTION";

export const setAuctionAction = (auctionState) => {
    return {
        type: "SET_AUCTION",
        payload: {
            auctionCard: auctionState.auctionCard
        }
    }
}