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

export const SET_TARGET = "SET_TARGET";

export const setTargetAction = (targetState) => {
    return {
        type: "SET_TARGET",
        payload: {
            targetCard: targetState.targetCard
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

export const SET_PASS = "SET_PASS";

export const setPassAction = (passState) => {
    return {
        type: "SET_PASS",
        payload: {
            passFlg: passState.passFlg
        }
    }
}

export const SET_ANS_PLAYERS = "SET_ANS_PLAYERS";

export const setAnsPlayersAction = (ansPlayersState) => {
    return {
        type: "SET_ANS_PLAYERS",
        payload: {
            ansPlayers: ansPlayersState.ansPlayers
        }
    }
}