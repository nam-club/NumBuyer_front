import React from 'react';
import { useDispatch} from 'react-redux';
import { setPlayersAction } from './redux/players/actions';

export const CTX = React.createContext();

const io = require("socket.io-client");

let socket = io("http://localhost:8000/");

export const joinQuickMatch = function(value) {
    console.log(value);
    socket.emit('join/quick_match', JSON.stringify(value));
    console.log("永沢");
}

export const joinFriendMatch = function(value) {
    socket.emit('join/quick_match', JSON.stringify(value));
}

export default function Socket(props) {
    const dispatch = useDispatch();
    console.log(socket);
    console.log("前田")

    socket.on('game/join', function(msg) {
        console.log("伊藤純平")
        console.log(msg)
        dispatch(setPlayersAction({players: msg}))
    })

    return (
        <CTX.Provider value={{joinQuickMatch, joinFriendMatch}}>
            {props.children}
        </CTX.Provider>
    )
}