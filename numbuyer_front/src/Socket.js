import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayersAction, setCardsAction, setCoinAction, setPlayerIdAction, setOwnerAction } from './redux/players/actions';
import { setPhaseAction, setTargetAction, setAuctionAction, setBidAction, setSkipAction, setMessageAction, setPassAction,
 setAnsPlayersAction, setHighestAction, setTimeAction, setFinishGameAction, setWinPlayerAction } from './redux/game/actions';

 import { push } from 'connected-react-router';

import * as Constants from './constants';
import { setRoomAction } from './redux/room/actions';
export const CTX = React.createContext();

const io = require("socket.io-client");
let socket;

let resObj = ""; 

/* ====== 通常関数 ====== */

// 符号を表示用 or 計算用に変換する
export const changeCode = (cards, type) => {
    switch(type) {
        case 'display':
            cards.forEach((card, index) => {
                if(card === '*') {
                    cards[index] = '×';
                }else if(card === '/') {
                    cards[index] = '÷';
                }
            })
            break;
        case 'calculate':
            cards.forEach((card, index) => {
                if(card === '×') {
                    cards[index] = '*';
                }else if(card === '÷') {
                    cards[index] = '/';
                }
            })
            break;
    }
}


/* ====== リクエストAPI ====== */

export const joinQuickMatch = function(value) {
    console.log("quickMatch:")
    console.log(value);
    socket.emit('join/quick_match', JSON.stringify(value));
}

export const createMatch = function(value) {
    console.log("createMatch:")
    console.log(value);
    socket.emit('create/match', JSON.stringify(value));
}

export const joinFriendMatch = function(value) {
    console.log("joinFriendMatch:")
    console.log(value);
    socket.emit('join/friend_match', JSON.stringify(value));
}

export const playersInfo = function(value) {
    console.log(value);
    socket.emit('game/players_info', JSON.stringify(value));
}

export const start = function(value) {
    console.log(value);
    socket.emit('game/start', JSON.stringify(value));
}

export const nextTurn = function(value) {
    console.log(value);
    socket.emit('game/next_turn', JSON.stringify(value));
}

export const bid = function(value) {
    console.log(value);
    socket.emit('game/bid', JSON.stringify(value));
}

export const calculate = function(value) {
    changeCode(value.calculateCards, 'calculate');
    socket.emit('game/calculate', JSON.stringify(value));
}


/* ====== レスポンスAPI ====== */

export default function Socket(props) {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    //console.log(socket);

    if(!socket) {
      socket = io("http://localhost:8000/");

        socket.on('game/join', function(msg) {
            console.log("game/join:")
            console.log(msg)
            resObj = JSON.parse(msg);
            // プレイヤーIDをセット
            dispatch(setPlayerIdAction(resObj.playerId));
            // ルームIDをセット
            dispatch(setRoomAction(resObj.roomId));
            // オーナーフラグをセット
            dispatch(setOwnerAction(resObj.isOwner));
            console.log("roomIdは" + resObj.roomId);
            console.log("playerIdは" + resObj.playerId);
            playersInfo({roomId: resObj.roomId, playerId: resObj.playerId});
        })

        const setPlayers = (value) => {
            return new Promise((resolve, reject)=>{
                dispatch(setPlayersAction(value));
                resolve();
            })
        }

        socket.on('game/players_info', function(msg) {
            console.log("game/playersInfo:")
            console.log(msg);
            resObj = JSON.parse(msg);
            setPlayers(resObj.players).then(()=>{
                dispatch(push('/Lobby'));
            });
        })

        socket.on('game/start', function(msg) {
            console.log("game/start:")
            console.log(msg);
            resObj = JSON.parse(msg);
            nextTurn({roomId: resObj.roomId, playerId: selector.players.player.playerId});
        })

        // ゲームに必要な情報をセット
        const setGame = (object, callback) => {
            dispatch(setPlayerIdAction(object.playerId));
            dispatch(setCardsAction(object.cards));
            dispatch(setCoinAction(object.coin));
            dispatch(setTargetAction(object.targetCard));
            dispatch(setAuctionAction(object.auctionCard));
            dispatch(setPhaseAction(Constants.GIVE_CARD_PH));
            dispatch(setMessageAction(Constants.GIVE_CARD_MSG));
            dispatch(setTimeAction(Constants.GIVE_CARD_TIME));
            callback();
        }

        // ゲーム画面に遷移
        const moveGame = () => {
            dispatch(push('/Game'));
        }
        
        socket.on('game/next_turn', function(msg) {
            console.log("game/next_turn:")
            console.log(msg);
            resObj = JSON.parse(msg);
            changeCode(resObj.cards, 'display');
            // ロビー画面（フェーズが始まっていない状態）の場合のみ、ゲーム画面に遷移
            if(selector.game.phase === '') {
                setGame(resObj, moveGame);
            // ゲーム中の場合は必要情報をセットのみ
            }else {
                dispatch(setCardsAction(resObj.cards));
                dispatch(setCoinAction(resObj.coin));
                dispatch(setTargetAction(resObj.targetCard));
                dispatch(setAuctionAction(resObj.auctionCard));
            }
        })

        socket.on('game/update_state', function(msg) {
            console.log("game/update_state:")
            console.log(msg);
            resObj = JSON.parse(msg);
            dispatch(setPlayersAction(resObj.players));
            console.log(resObj.phase);
            dispatch(setPhaseAction(resObj.phase));
        })

        // 誰がいくら入札したかをメッセージに表示する
        socket.on('game/bid', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            // 誰がいくら入札したかをセット
            dispatch(setBidAction(resObj));
            // 最高入札額と入札者を更新
            dispatch(setHighestAction(resObj));
        })

        // 誰が何円で落札したか
        socket.on('game/buy_notify', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            dispatch(setBidAction(resObj));
            // 最高入札額をリセット
            dispatch(setHighestAction(0));
            // 全員がパスしたわけじゃないよ
            dispatch(setPassAction({passFlg: false}));
        })

        // 落札したプレイヤーのコインとカード情報を更新する
        socket.on('game/buy_update', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            dispatch(setCoinAction(resObj));
            dispatch(setCardsAction(resObj));
        })

        socket.on('game/calculate_result', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            if(resObj.isCorrectAnswer) {
                // 正解メッセージを表示
                dispatch(setMessageAction(Constants.CALC_RESULT_MSG1));
            }else {
                // 不正解メッセージを表示
                dispatch(setMessageAction(Constants.CALC_RESULT_MSG0));
            }
            // 返されたコインをセット
            dispatch(setCoinAction(resObj.coin));
            // 返されたカードをセット
            dispatch(setCardsAction(resObj.cards));
        })

        socket.on('game/correct_players', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            // 返された正解者をセット
            dispatch(setAnsPlayersAction(resObj));
        })

        socket.on('game/finish_game', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            dispatch(setWinPlayerAction(resObj.playerName));
            dispatch(setFinishGameAction(true));
        })
    }


    return (
        <CTX.Provider value={{joinQuickMatch, createMatch, joinFriendMatch, playersInfo, start, nextTurn, bid, calculate}}>
            {props.children}
        </CTX.Provider>
    )
}