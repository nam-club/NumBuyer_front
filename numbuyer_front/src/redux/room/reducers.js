import * as Actions from './actions';
import initialState from '../store/initialState';

export const RoomReducer = (state = initialState.room, action) => {
    switch(action.type) {
        case Actions.SET_ROOM:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_CPU:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_QUICK:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_TOTAL_ROOM_COUNT:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_AVAILABLE_QM_COUNT:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}