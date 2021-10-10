export const SET_PLAYER = "SET_PLAYER";

export const setPlayerAction = (playerState) => {
    return {
        type: "SET_PLAYER",
        payload: {
            playerId: playerState.playerId,
            playerName: playerState.playerName,
            roomName: playerState.roomName,
            coin: playerState.coin,
            cards: playerState.cards,
            ownFlg: playerState.ownFlg
        }
    }
}

export const SET_PLAYERS = "SET_PLAYERS";

export const setPlayersAction = (playersState) => {
    return {
        type: "SET_PLAYERS",
        payload: {
            players: playersState.players
        }
    }
}

export const SET_CARDS = "SET_CARDS";

export const setCardsAction = (playerState) => {
    return {
        type: "SET_CARDS",
        payload: {
            playerId: playerState.playerId,
            cards: playerState.cards
        }
    }
}

export const SET_COIN = "SET_COIN";

export const setCoinAction = (playerState) => {
    return {
        type: "SET_COIN",
        payload: {
            playerId: playerState.playerId,
            coin: playerState.coin
        }
    }
}