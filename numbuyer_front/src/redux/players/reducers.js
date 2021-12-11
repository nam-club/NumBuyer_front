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
        case Actions.SET_CARDS:
            state.player.cards = action.payload.cards;
            console.log(state.player);
            return state;
        case Actions.SET_COIN:
            state.player.coin = action.payload.coin;
            return state;
        case Actions.SET_OWNER:
            state.player.isOwner = action.payload.isOwner;
            return state;
        case Actions.SET_RANKING:
            state.ranking = action.payload.ranking;
            console.log(state.ranking);
            return state;
        default:
            return state;
    }
}