export const SET_PLAYER = "SET_PLAYER";

export const setPlayerAction = (playerState) => {
    return {
        type: "SET_PLAYER",
        payload: {
            playerId: playerState.playerId,
            playerName: playerState.playerName,
            roomName: playerState.roomName,
            money: playerState.money,
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