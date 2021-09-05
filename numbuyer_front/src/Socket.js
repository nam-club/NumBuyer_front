import React from 'react';
import { useDispatch} from 'react-redux';
import { setPlayersAction, setPlayerAction } from './redux/players/actions';
import { setStateAction, setBidAction } from './redux/game/actions';

export const CTX = React.createContext();

const io = require("socket.io-client");
let socket = io("http://localhost:8000/");

let resObj = ""; 

export const joinQuickMatch = function(value) {
    console.log(value);
    socket.emit('join/quick_match', JSON.stringify(value));
}

export const joinFriendMatch = function(value) {
    socket.emit('join/quick_match', JSON.stringify(value));
}

export const buyToServer = function(value) {
    socket.emit('game/buy_to_server', value);
}

export default function Socket(props) {
    const dispatch = useDispatch();
    console.log(socket);

    socket.on('game/join', function(msg) {
        console.log(msg);
        msg = '{"playerId":1,"playerName":"ITO","roomName":"ITO","coin":100,"cards":["1","+","2","-","3"],"ownFlg":true}';
        console.log(msg);
        resObj = JSON.parse(msg);
        dispatch(setPlayerAction(resObj));
    })

    socket.on('game/update_state', function(msg) {
        console.log(msg);
        resObj = JSON.parse(msg);
        dispatch(setStateAction(resObj));
    })

    socket.on('game/buy_to_client', function(msg) {
        console.log(msg);
        resObj = JSON.parse(msg);
        dispatch(setBidAction(resObj));
    })

    return (
        <CTX.Provider value={{joinQuickMatch, joinFriendMatch, buyToServer}}>
            {props.children}
        </CTX.Provider>
    )
}