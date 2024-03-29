export const SET_PLAYER = "SET_PLAYER";

export const setPlayerAction = (playerState) => {
    return {
        type: "SET_PLAYER",
        payload: {
            id: playerState.id,
            name: playerState.name,
            money: playerState.money,
            cards: playerState.cards
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