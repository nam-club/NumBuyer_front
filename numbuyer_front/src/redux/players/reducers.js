import * as Actions from './actions';
import initialState from '../store/initialState';

export const PlayersReducer = (state = initialState.players, action) => {
    switch(action.type) {
        case Actions.SET_PLAYERS:
            state.players = action.payload.players;
            return state;
        case Actions.SET_PLAYER_ID:
            state.player.playerId = action.payload.playerId;
            return state;
        case Actions.SET_PLAYER_NAME:
            state.player.playerName = action.payload.playerName;
            return state;
        case Actions.SET_CARDS:
            state.player.cards = action.payload.cards;
            return state;
        case Actions.SET_COIN:
            state.player.coin = action.payload.coin;
            return state;
        case Actions.SET_OWNER:
            state.player.isOwner = action.payload.isOwner;
            return state;
        case Actions.SET_RANKING:
            state.ranking = action.payload.ranking;
            return state;
        case Actions.SET_ABILITY:
            if(state.player.abilities.length === 0 ||  state.player.abilities.length === 1) {
                state.player.abilities.push(action.payload.abilities);
            }else {
                state.player.abilities[0] = state.player.abilities[1];
                state.player.abilities[1] = action.payload.abilities;
            }
            return state;
        case Actions.SET_RES_ABILITY:
            state.player.abilities = action.payload.abilities;
            console.log(state);
            return state;
        default:
            return state;
    }
}