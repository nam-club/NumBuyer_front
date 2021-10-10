import * as Actions from './actions';
import initialState from '../store/initialState';

export const PlayersReducer = (state = initialState.players, action) => {
    let player;
    switch(action.type) {
        case Actions.SET_PLAYER:
            state = [...state, action.payload];
            return state;
        case Actions.SET_PLAYERS:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_CARDS:
            player = state.find((e) => e.playerId === action.payload.playerId);
            player.cards = action.payload.cards;
            return state;
        case Actions.SET_COIN:
            player = state.find((e) => e.playerId === action.payload.playerId);
            player.coin = action.payload.coin;
            return state;
        default:
            return state;
    }
}