export const SET_PLAYERS = "SET_PLAYERS";

export const setPlayersAction = (state) => {
    return {
        type: "SET_PLAYERS",
        payload: {
            players: state
        }
    }
}

export const SET_PLAYER_ID = "SET_PLAYER_ID";

export const setPlayerIdAction = (state) => {
    return {
        type: "SET_PLAYER_ID",
        payload: {
            playerId: state
        }
    }
}

export const SET_PLAYER_NAME = "SET_PLAYER_NAME";

export const setPlayerNameAction = (state) => {
    return {
        type: "SET_PLAYER_NAME",
        payload: {
            playerName: state
        }
    }
}

export const SET_CARDS = "SET_CARDS";

export const setCardsAction = (state) => {
    return {
        type: "SET_CARDS",
        payload: {
            cards: state
        }
    }
}

export const SET_COIN = "SET_COIN";

export const setCoinAction = (state) => {
    return {
        type: "SET_COIN",
        payload: {
            coin: state
        }
    }
}

export const SET_OWNER = "SET_OWNER";

export const setOwnerAction = (state) => {
    return {
        type: "SET_OWNER",
        payload: {
            isOwner: state
        }
    }
}

export const SET_RANKING = "SET_RANKING";

export const setRankingAction = (state) => {
    return {
        type: "SET_RANKING",
        payload: {
            ranking: state
        }
    }
}

// アビリティ追加（ロビー画面でのアビリティ選択用）
export const SET_ABILITY = "SET_ABILITY";

export const setAbilityAction = (state) => {
    return {
        type: "SET_ABILITY",
        payload: {
            abilities: state
        }
    }
}

// アビリティ選択解除（ロビー画面でのアビリティ選択用）
export const CANCEL_ABILITY = "CANCEL_ABILITY";

export const cancelAbilityAction = (state) => {
    return {
        type: "CANCEL_ABILITY",
        payload: {
            abilityId: state
        }
    }
}

// アビリティ追加（back側から返ってきたアビリティ情報を入れる用）
export const SET_RES_ABILITY = "SET_RES_ABILITY";

export const setResAbilityAction = (state) => {
    return {
        type: "SET_RES_ABILITY",
        payload: {
            abilities: state
        }
    }
}