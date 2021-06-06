import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import {connectRouter, routerMiddleware} from "connected-react-router";
import {PlayersReducer} from '../players/reducers';
import {RoomReducer} from '../room/reducers';

export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            players: PlayersReducer,
            room: RoomReducer
        }),
        applyMiddleware(
            routerMiddleware(history)
        )
    )
}