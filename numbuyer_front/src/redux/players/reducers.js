import * as Actions from './actions';
import initialState from '../store/initialState';

export const PlayersReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.SET_PLAYERS:
            state.players = action.payload.players;
            return state;
        case Actions.SET_PLAYER_ID:
            state.player.playerId = action.payload.playerId;
            console.log(state);
            return state;
        case Actions.SET_CARDS:
            state.player.cards = action.payload.cards;
            return state;
        case Actions.SET_COIN:
            state.player.coin = action.payload.coin;
            return state;
        default:
            return state;
    }
}