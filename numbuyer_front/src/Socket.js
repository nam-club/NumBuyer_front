import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayersAction, setCardsAction, setCoinAction, setPlayerIdAction, setOwnerAction,
     setRankingAction, setResAbilityAction} from './redux/players/actions';
import { setPhaseAction, setPhaseTimesAction, setRemainingTimeAction, setTargetAction, setAuctionAction, setMessageAction,
 setAnsPlayersAction, setHighestAction, setAucBtnAction, setCalcBtnAction, setTimeAction, setGoalAction, setCalcResultAction,
  setFinishGameAction, setWinPlayerAction, setTargetSkipAction, setRemTimeFlgAction, setAddedCoinAction } from './redux/game/actions';

 import { push } from 'connected-react-router';

import { arrayOutput, changeCode } from './logics';
import * as Constants from './constants';
import { setRoomAction } from './redux/room/actions';
export const CTX = React.createContext();

const io = require("socket.io-client");
let socket;

let resObj = ""; 

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

export const buy = function(value) {
    console.log(value);
    socket.emit('game/buy', JSON.stringify(value));
}

export const calculate = function(value) {
    changeCode(value.calculateCards, 'calculate');
    console.log(value);
    socket.emit('game/calculate', JSON.stringify(value));
}


/* ====== レスポンスAPI ====== */

export default function Socket(props) {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    //console.log(socket);

    if(!socket) {
      socket = io(process.env.REACT_APP_SOCKET_URL);

        socket.on('game/join', async function(msg) {
            console.log("game/join:")
            console.log(msg)
            resObj = JSON.parse(msg);
            // プレイヤーIDをセット
            dispatch(setPlayerIdAction(resObj.playerId));
            // ルームIDをセット
            dispatch(setRoomAction(resObj.roomId));
            // オーナーフラグをセット
            dispatch(setOwnerAction(resObj.isOwner));
            // アビリティをセット
            let abilities = [];
            for(let a of resObj.abilities) {
                console.log(a);
                abilities.push(setAbility(a));
            }
            console.log(abilities);
            await dispatch(setResAbilityAction(abilities));
            playersInfo({roomId: resObj.roomId, playerId: resObj.playerId});
        })

        // アビリティのパラメータをセット
        const setAbility = (resAbility) => {
            let ability = {
                abilityId: "",
                status: "",
                max: null,
                remaining: null,
                type: "",
                trigger: "",
                display: [],
            }

            ability.abilityId = resAbility.abilityId;
            ability.status = resAbility.status;
            if(resAbility.remaining < 0) {
                ability.max = "";
                ability.remaining = "";
            }else {
                ability.max = "/" + resAbility.remaining;
                ability.remaining = resAbility.remaining;
            }
            ability.type = resAbility.type;
            ability.trigger = resAbility.trigger;
            ability.display = searchAbility(resAbility.abilityId).display;

            return ability;
        }

        // アビリティ検索
        const searchAbility = (id) => {
            console.log(id);
            let bstAbility = Constants.BST_ABILITIES.find((a) => {return a.abilityId === id});
            let atkAbility = Constants.ATK_ABILITIES.find((a) => {return a.abilityId === id});
            let defAbility = Constants.DEF_ABILITIES.find((a) => {return a.abilityId === id});
            let jamAbility = Constants.JAM_ABILITIES.find((a) => {return a.abilityId === id});
            let cnfAbility = Constants.CNF_ABILITIES.find((a) => {return a.abilityId === id});

            if(bstAbility) {
                return bstAbility;
            }else if(atkAbility) {
                return atkAbility;
            }else if(defAbility) {
                return defAbility;
            }else if(jamAbility) {
                return jamAbility;
            }else if(cnfAbility) {
                return cnfAbility;
            }
        }

        const setPlayers = (value) => {
            return new Promise((resolve, reject)=>{
                dispatch(setPlayersAction(value));
                resolve();
            })
        }

        socket.on('game/players_info', function(msg) {
            console.log("game/playersInfo:");
            console.log(msg);
            resObj = JSON.parse(msg);
            setPlayers(resObj.players).then(()=>{
                dispatch(push('/Lobby'));
            });
        })

        socket.on('game/start', function(msg) {
            console.log("game/start:");
            console.log(msg);
            resObj = JSON.parse(msg);
            console.log(resObj);
            dispatch(setPhaseTimesAction(resObj.phaseTimes));
            dispatch(setGoalAction(resObj.goalCoin));
            nextTurn({roomId: resObj.roomId, playerId: selector.players.player.playerId});
        })

        // ゲームに必要な情報をセット
        const setGame = (object, callback) => {
            dispatch(setPlayerIdAction(object.playerId));
            dispatch(setCardsAction(object.cards));
            dispatch(setCoinAction(object.coin));
            dispatch(setTargetAction(object.targetCard));
            dispatch(setAuctionAction(object.auctionCards));
            dispatch(setPhaseAction(Constants.READY_PH));
            dispatch(setTimeAction(selector.game.phaseTimes.ready));
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
            console.log(typeof resObj.auctionCards);

            // 画面表示用に掛け算と割り算を変換
            changeCode(resObj.cards, 'display');
            resObj.auctionCards = changeCode(resObj.auctionCards, 'auction');
            // ロビー画面（フェーズが始まっていない状態）の場合のみ、ゲーム画面に遷移
            if(selector.game.phase === '') {
                setGame(resObj, moveGame);
            // ゲーム中の場合は必要情報をセットのみ
            }else {
                dispatch(setCardsAction(resObj.cards));
                dispatch(setCoinAction(resObj.coin));
                dispatch(setTargetAction(resObj.targetCard));
                dispatch(setAuctionAction(resObj.auctionCards));
                dispatch(setTimeAction(selector.game.phaseTimes.ready));
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
            if(resObj.remainingTime) {
                // 残り時間を再設定
                dispatch(setRemainingTimeAction(resObj.remainingTime));
                dispatch(setRemTimeFlgAction(true));
            }
            // 誰がいくら入札したかを表示
            dispatch(setMessageAction(resObj.playerName + selector.msg.lang.AUC_BID_MSG1 + resObj.coin + selector.msg.lang.AUC_BID_MSG2));
            // 最高入札額と入札者を更新
            dispatch(setHighestAction(resObj));
        })

        // 誰が何円で落札したか
        socket.on('game/buy_notify', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);

            // 全員がパスをした場合
            if(resObj.isPassAll) {
                // 誰も入札しなかったと表示
                dispatch(setMessageAction(selector.msg.lang.AUC_RESULT_MSG0));
            }else {
                // オークションカード配列の中身を表示
                let aucMessage = arrayOutput(resObj.auctionCards);
                // 誰がいくらで落札したかを表示
                if(selector.msg.lang.LANGUAGE === 'Chinese') {
                    dispatch(setMessageAction(resObj.playerName + selector.msg.lang.AUC_RESULT_MSG1 + resObj.coin
                        + selector.msg.lang.AUC_RESULT_MSG2 + aucMessage + selector.msg.lang.AUC_RESULT_MSG3));
                }else {
                    dispatch(setMessageAction(resObj.playerName + selector.msg.lang.AUC_RESULT_MSG1 + aucMessage
                        + selector.msg.lang.AUC_RESULT_MSG2 + resObj.coin + selector.msg.lang.AUC_RESULT_MSG3));
                }
            }
        })

        // 落札したプレイヤーのコインとカード情報を更新する
        socket.on('game/buy_update', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            // 画面表示用に掛け算と割り算を変換
            changeCode(resObj.cards, 'display');

            // 最高入札額をリセット
            dispatch(setHighestAction({playerName: '', coin: 0}));
            // 返された所持コインをセット
            dispatch(setCoinAction(resObj.coin));
            // 返された手札をセット
            dispatch(setCardsAction(resObj.cards));
            // オークションカードを非公開にする
            dispatch(setAuctionAction([]));
            // BIDボタン、PASSボタンを押せるように戻す（パスを押した時用）
            dispatch(setAucBtnAction(true));
        })

        socket.on('game/calculate_result', async function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            if(resObj.isCorrectAnswer) {
                // 正解アニメーション
                dispatch(setCalcResultAction(Constants.SUCCESS));
                // 正解メッセージを表示
                dispatch(setMessageAction(selector.msg.lang.CALC_RESULT_MSG1));
                // ANSWERボタン、PASSボタンを押せないようにする（二度回答させない）
                dispatch(setCalcBtnAction(false));
            }else {
                // 不正解アニメーション
                dispatch(setCalcResultAction(Constants.FAILED));
                // 不正解メッセージを表示
                dispatch(setMessageAction(selector.msg.lang.CALC_RESULT_MSG0));
                // 画面更新調整用
                dispatch(setCalcBtnAction(false));
                dispatch(setCalcBtnAction(true));
            }

            await setTimeout(() => {
                dispatch(setCalcResultAction(Constants.NONE));
            }, 1500);

            // 画面表示用に掛け算と割り算を変換
            changeCode(resObj.cards, 'display');

            // 返された所持コインをセット
            dispatch(setCoinAction(resObj.coin));
            // 返された手札をセット
            dispatch(setCardsAction(resObj.cards));
        })

        socket.on('game/correct_players', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            // 返された正解者をセット
            dispatch(setAnsPlayersAction(resObj));
            // ANSWERボタン、PASSボタンを押せるように戻す（パスを押した時用）
            dispatch(setCalcBtnAction(true));
            // 正解者がいない場合はターゲットスキップフラグを立てる
            if(!resObj.existsCorrect) {
                dispatch(setTargetSkipAction(true));
            }else {
                dispatch(setTargetSkipAction(false));
            }
        })

        socket.on('game/finish_game', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            dispatch(setMessageAction(''));
            dispatch(setRankingAction(resObj.players));
            dispatch(setFinishGameAction(true));
        })
    }


    return (
        <CTX.Provider value={{joinQuickMatch, createMatch, joinFriendMatch, playersInfo, start, nextTurn, bid, buy, calculate}}>
            {props.children}
        </CTX.Provider>
    )
}