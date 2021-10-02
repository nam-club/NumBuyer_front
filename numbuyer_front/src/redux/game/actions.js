export const SET_PHASE = "SET_PHASE";

export const setPhaseAction = (phaseState) => {
    return {
        type: "SET_PHASE",
        payload: {
            phase: phaseState.phase
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

export const SET_BID = "SET_BID";

export const setBidAction = (bidState) => {
    return {
        type: "SET_BID",
        payload: {
            playerName: bidState.playerName,
            coin: bidState.coin
        }
    }
}

export const SET_SKIP = "SET_SKIP";

export const setSkipAction = (skipState) => {
    return {
        type: "SET_SKIP",
        payload: {
            skipFlg: skipState.skipFlg
        }
    }
}