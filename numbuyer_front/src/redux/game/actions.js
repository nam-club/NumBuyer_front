export const SET_PHASE = "SET_PHASE";

export const setPhaseAction = (state) => {
    return {
        type: "SET_PHASE",
        payload: {
            phase: state
        }
    }
}

export const SET_PHASE_TIMES = "SET_PHASE_TIMES";

export const setPhaseTimesAction = (state) => {
    return {
        type: "SET_PHASE_TIMES",
        payload: {
            phaseTimes: state
        }
    }
}

export const SET_TURN = "SET_TURN";

export const setTurnAction = (state) => {
    return {
        type: "SET_TURN",
        payload: {
            turn: state
        }
    }
}

export const SET_MESSAGE = "SET_MESSAGE";

export const setMessageAction = (state) => {
    return {
        type: "SET_MESSAGE",
        payload: {
            message: state
        }
    }
}

export const SET_MESSAGES = "SET_MESSAGES";

export const setMessagesAction = (state) => {
    return {
        type: "SET_MESSAGES",
        payload: {
            messages: state
        }
    }
}

export const RESET_MESSAGES = "RESET_MESSAGES";

export const resetMessagesAction = () => {
    return {
        type: "RESET_MESSAGES"
    }
}

export const SET_ABL_MESSAGES = "SET_ABL_MESSAGES";

export const setAblMessagesAction = (state) => {
    return {
        type: "SET_ABL_MESSAGES",
        payload: {
            ablMessages: state
        }
    }
}

export const RESET_ABL_MESSAGES = "RESET_ABL_MESSAGES";

export const resetAblMessagesAction = () => {
    return {
        type: "RESET_ABL_MESSAGES"
    }
}

export const SET_FLUCT_PARAMS = "SET_FLUCT_PARAMS";

export const setFluctParamsAction = (state) => {
    return {
        type: "SET_FLUCT_PARAMS",
        payload: {
            fluctParams: state
        }
    }
}

export const SET_FLUCT_QUEUES = "SET_FLUCT_QUEUES";

export const setFluctQueuesAction = (state) => {
    return {
        type: "SET_FLUCT_QUEUES",
        payload: {
            fluctQueues: state
        }
    }
}

export const SET_TIME = "SET_TIME";

export const setTimeAction = (state) => {
    return {
        type: "SET_TIME",
        payload: {
            time: state
        }
    }
}

export const SET_REMAINING_TIME = "SET_REMAINING_TIME";

export const setRemainingTimeAction = (state) => {
    return {
        type: "SET_REMAINING_TIME",
        payload: {
            remainingTime: state
        }
    }
}

export const SET_REM_TIME_FLG = "SET_REM_TIME_FLG";

export const setRemTimeFlgAction = (state) => {
    return {
        type: "SET_REM_TIME_FLG",
        payload: {
            remTimeFlg: state
        }
    }
}

export const SET_GOAL = "SET_GOAL";

export const setGoalAction = (state) => {
    return {
        type: "SET_GOAL",
        payload: {
            goalCoin: state
        }
    }
}

export const SET_TARGET = "SET_TARGET";

export const setTargetAction = (state) => {
    return {
        type: "SET_TARGET",
        payload: {
            targetCard: state
        }
    }
}

export const SET_AUC_BTN = "SET_AUC_BTN";

export const setAucBtnAction = (state) => {
    return {
        type: "SET_AUC_BTN",
        payload: {
            aucBtnFlg: state
        }
    }
}

export const SET_AUCTION = "SET_AUCTION";

export const setAuctionAction = (state) => {
    return {
        type: "SET_AUCTION",
        payload: {
            auctionCards: state
        }
    }
}

export const SET_HIGHEST = "SET_HIGHEST";

export const setHighestAction = (state) => {
    return {
        type: "SET_HIGHEST",
        payload: {
            highestName: state.playerName,
            highestBid: state.coin
        }
    }
}

export const SET_AUC_RESULT = "SET_AUC_RESULT";

export const setAucResultAction = (state) => {
    return {
        type: "SET_AUC_RESULT",
        payload: {
            aucResult: state,
        }
    }
}

export const SET_CALC_BTN = "SET_CALC_BTN";

export const setCalcBtnAction = (state) => {
    return {
        type: "SET_CALC_BTN",
        payload: {
            calcBtnFlg: state
        }
    }
}

export const SET_CALC_RESULT = "SET_CALC_RESULT";

export const setCalcResultAction = (state) => {
    return {
        type: "SET_CALC_RESULT",
        payload: {
            calcResult: state,
        }
    }
}

export const SET_ADDED_COIN = "SET_ADDED_COIN";

export const setAddedCoinAction = (state) => {
    return {
        type: "SET_ADDED_COIN",
        payload: {
            addedCoin: state
        }
    }
}

export const SET_ANS_PLAYERS = "SET_ANS_PLAYERS";

export const setAnsPlayersAction = (state) => {
    return {
        type: "SET_ANS_PLAYERS",
        payload: {
            ansPlayers: state.ansPlayers
        }
    }
}

export const SET_FIRED_ABILITIES = "SET_FIRED_ABILITIES";

export const setFiredAbilitiesAction = (state) => {
    return {
        type: "SET_FIRED_ABILITIES",
        payload: {
            firedAbilities: state
        }
    }
}

export const SET_LEAVE_LOBBY = "SET_LEAVE_LOBBY";

export const setLeaveLobbyAction = (state) => {
    return {
        type: "SET_LEAVE_LOBBY",
        payload: {
            leaveLobbyFlg: state
        }
    }
}

export const SET_FINISH_GAME = "SET_FINISH_GAME";

export const setFinishGameAction = (state) => {
    return {
        type: "SET_FINISH_GAME",
        payload: {
            finishFlg: state
        }
    }
}

export const SET_FIRST_TURN = "SET_FIRST_TURN";

export const setFirstTurnAction = (state) => {
    return {
        type: "SET_FIRST_TURN",
        payload: {
            firstTurnFlg: state
        }
    }
}

export const SET_TARGET_SKIP = "SET_TARGET_SKIP";

export const setTargetSkipAction = (state) => {
    return {
        type: "SET_TARGET_SKIP",
        payload: {
            targetSkipFlg: state
        }
    }
}

export const SET_HANDS_UPDATE = "SET_HANDS_UPDATE";

export const setHandsUpdateAction = (state) => {
    return {
        type: "SET_HANDS_UPDATE",
        payload: {
            handsUpdateFlg: state
        }
    }
}