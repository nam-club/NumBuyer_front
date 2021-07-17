import React from 'react';
import { io } from 'socket.io-client';
import { useDispatch} from 'react-redux';
import { setPlayersAction } from './redux/players/actions';

export const CTX = React.createContext();

let socket = io("http://localhost:8000/");

export const joinQuickMatch = function(value) {
    console.log(socket);
    socket.emit('join/quick_match', value);
}

export const joinFriendMatch = function(value) {
    socket.emit('join/quick_match', value);
}

export default function Socket(props) {
    const dispatch = useDispatch();

    socket.on('game/join', function(msg) {
        dispatch(setPlayersAction({players: msg}))
    })

    return (
        <CTX.Provider value={{joinQuickMatch, joinFriendMatch}}>
            {props.children}
        </CTX.Provider>
    )
}