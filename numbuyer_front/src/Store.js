import React from 'react';

export const CTX = React.createContext();

const initState = {
    roomId: "",
    playerInfo: []
}

function reducer(state, action) {
    const {player, room} = action.payload;
    const id = player.id;
    const name = player.name;
    const money = player.money;
    const cards = player.cards;
    switch(action.type) {
        case 'SET_PLAYER':
            return {
                ...state,
                playerInfo: [
                        id,
                        {name, money, cards}
                ]
            };
        case 'SET_ROOM':
            return {
                ...state,
                roomId: room
            };
        default:
            return state;
    }
}

function setState() {

}

export default function Store(props) {

    /*const [loginInfo, dispatch] = React.useReducer(reducer, initState);

    dispatch({type: 'RECEIVE_MESSAGE', payload: msg});
    
    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )*/
}