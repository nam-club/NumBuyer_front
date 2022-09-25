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

export const SET_PLAYER_NAME = "SET_PLAYER_NAME";

export const setPlayerNameAction = (playerState) => {
    return {
        type: "SET_PLAYER_NAME",
        payload: {
            playerName: playerState
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

export const SET_OWNER = "SET_OWNER";

export const setOwnerAction = (playerState) => {
    return {
        type: "SET_OWNER",
        payload: {
            isOwner: playerState
        }
    }
}

export const SET_RANKING = "SET_RANKING";

export const setRankingAction = (rankingState) => {
    console.log(rankingState);
    return {
        type: "SET_RANKING",
        payload: {
            ranking: rankingState
        }
    }
}

// アビリティ追加（ロビー画面でのアビリティ選択用）
export const SET_ABILITY = "SET_ABILITY";

export const setAbilityAction = (abilityState) => {
    return {
        type: "SET_ABILITY",
        payload: {
            abilities: abilityState
        }
    }
}

// アビリティ選択解除（ロビー画面でのアビリティ選択用）
export const CANCEL_ABILITY = "CANCEL_ABILITY";

export const cancelAbilityAction = (abilityState) => {
    return {
        type: "CANCEL_ABILITY",
        payload: {
            abilityId: abilityState
        }
    }
}

// アビリティ追加（back側から返ってきたアビリティ情報を入れる用）
export const SET_RES_ABILITY = "SET_RES_ABILITY";

export const setResAbilityAction = (abilityState) => {
    return {
        type: "SET_RES_ABILITY",
        payload: {
            abilities: abilityState
        }
    }
}