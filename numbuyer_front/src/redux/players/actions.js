export const SET_PLAYERS = "SET_PLAYERS";

export const setPlayersAction = (playersState) => {
    return {
        type: "SET_PLAYERS",
        payload: {
            players: playersState
        }
    }
}

export const SET_PLAYER_ID = "SET_PLAYER_ID";

export const setPlayerIdAction = (playerState) => {
    return {
        type: "SET_PLAYER_ID",
        payload: {
            playerId: playerState
        }
    }
}

export const SET_CARDS = "SET_CARDS";

export const setCardsAction = (playerState) => {
    return {
        type: "SET_CARDS",
        payload: {
            cards: playerState
        }
    }
}

export const SET_COIN = "SET_COIN";

export const setCoinAction = (playerState) => {
    return {
        type: "SET_COIN",
        payload: {
            coin: playerState
        }
    }
}