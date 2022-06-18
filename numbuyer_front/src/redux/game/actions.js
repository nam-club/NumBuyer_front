export const SET_PHASE = "SET_PHASE";

export const setPhaseAction = (phaseState) => {
    return {
        type: "SET_PHASE",
        payload: {
            phase: phaseState
        }
    }
}

export const SET_PHASE_TIMES = "SET_PHASE_TIMES";

export const setPhaseTimesAction = (phaseTimesState) => {
    return {
        type: "SET_PHASE_TIMES",
        payload: {
            phaseTimes: phaseTimesState
        }
    }
}

export const SET_MESSAGE = "SET_MESSAGE";

export const setMessageAction = (messageState) => {
    return {
        type: "SET_MESSAGE",
        payload: {
            message: messageState
        }
    }
}

export const SET_MESSAGES = "SET_MESSAGES";

export const setMessagesAction = (messagesState) => {
    return {
        type: "SET_MESSAGES",
        payload: {
            messages: messagesState
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

export const setAblMessagesAction = (ablMessagesState) => {
    console.log(ablMessagesState);
    return {
        type: "SET_ABL_MESSAGES",
        payload: {
            ablMessages: ablMessagesState
        }
    }
}

export const RESET_ABL_MESSAGES = "RESET_ABL_MESSAGES";

export const resetAblMessagesAction = () => {
    return {
        type: "RESET_ABL_MESSAGES"
    }
}

export const SET_TIME = "SET_TIME";

export const setTimeAction = (timeState) => {
    return {
        type: "SET_TIME",
        payload: {
            time: timeState
        }
    }
}

export const SET_REMAINING_TIME = "SET_REMAINING_TIME";

export const setRemainingTimeAction = (remainingTimeState) => {
    return {
        type: "SET_REMAINING_TIME",
        payload: {
            remainingTime: remainingTimeState
        }
    }
}

export const SET_REM_TIME_FLG = "SET_REM_TIME_FLG";

export const setRemTimeFlgAction = (remTimeFlgState) => {
    return {
        type: "SET_REM_TIME_FLG",
        payload: {
            remTimeFlg: remTimeFlgState
        }
    }
}

export const SET_GOAL = "SET_GOAL";

export const setGoalAction = (goalState) => {
    return {
        type: "SET_GOAL",
        payload: {
            goalCoin: goalState
        }
    }
}

export const SET_TARGET = "SET_TARGET";

export const setTargetAction = (targetState) => {
    return {
        type: "SET_TARGET",
        payload: {
            targetCard: targetState
        }
    }
}

export const SET_AUC_BTN = "SET_AUC_BTN";

export const setAucBtnAction = (aucBtnState) => {
    return {
        type: "SET_AUC_BTN",
        payload: {
            aucBtnFlg: aucBtnState
        }
    }
}

export const SET_AUCTION = "SET_AUCTION";

export const setAuctionAction = (auctionState) => {
    return {
        type: "SET_AUCTION",
        payload: {
            auctionCards: auctionState
        }
    }
}

export const SET_HIGHEST = "SET_HIGHEST";

export const setHighestAction = (highestState) => {
    return {
        type: "SET_HIGHEST",
        payload: {
            highestName: highestState.playerName,
            highestBid: highestState.coin
        }
    }
}

export const SET_AUC_RESULT = "SET_AUC_RESULT";

export const setAucResultAction = (aucResultState) => {
    return {
        type: "SET_AUC_RESULT",
        payload: {
            aucResult: aucResultState,
        }
    }
}

export const SET_CALC_BTN = "SET_CALC_BTN";

export const setCalcBtnAction = (calcBtnState) => {
    return {
        type: "SET_CALC_BTN",
        payload: {
            calcBtnFlg: calcBtnState
        }
    }
}

export const SET_CALC_RESULT = "SET_CALC_RESULT";

export const setCalcResultAction = (calcResultState) => {
    return {
        type: "SET_CALC_RESULT",
        payload: {
            calcResult: calcResultState,
        }
    }
}

export const SET_ADDED_COIN = "SET_ADDED_COIN";

export const setAddedCoinAction = (addedCoinState) => {
    return {
        type: "SET_ADDED_COIN",
        payload: {
            addedCoin: addedCoinState
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

export const SET_FIRED_ABILITIES = "SET_FIRED_ABILITIES";

export const setFiredAbilitiesAction = (firedAbilitiesState) => {
    return {
        type: "SET_FIRED_ABILITIES",
        payload: {
            firedAbilities: firedAbilitiesState
        }
    }
}

export const SET_LEAVE_LOBBY = "SET_LEAVE_LOBBY";

export const setLeaveLobbyAction = (leaveLobbyState) => {
    return {
        type: "SET_LEAVE_LOBBY",
        payload: {
            leaveLobbyFlg: leaveLobbyState
        }
    }
}

export const SET_FINISH_GAME = "SET_FINISH_GAME";

export const setFinishGameAction = (finishGameState) => {
    return {
        type: "SET_FINISH_GAME",
        payload: {
            finishFlg: finishGameState
        }
    }
}

export const SET_FIRST_TURN = "SET_FIRST_TURN";

export const setFirstTurnAction = (firstTurnState) => {
    return {
        type: "SET_FIRST_TURN",
        payload: {
            firstTurnFlg: firstTurnState
        }
    }
}

export const SET_TARGET_SKIP = "SET_TARGET_SKIP";

export const setTargetSkipAction = (targetSkipState) => {
    return {
        type: "SET_TARGET_SKIP",
        payload: {
            targetSkipFlg: targetSkipState
        }
    }
}

export const SET_HANDS_UPDATE = "SET_HANDS_UPDATE";

export const setHandsUpdateAction = (handsUpdateState) => {
    return {
        type: "SET_HANDS_UPDATE",
        payload: {
            handsUpdateFlg: handsUpdateState
        }
    }
}