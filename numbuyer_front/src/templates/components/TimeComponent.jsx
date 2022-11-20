import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';

import {
    setMessageAction, setMessagesAction, resetMessagesAction, setPhaseAction, setTimeAction,
    setFirstTurnAction, setRemTimeFlgAction
} from '../../redux/game/actions';
import { setPreCardsAction } from '../../redux/players/actions';

import { arrayOutput } from '../../logics';
import * as Constants from '../../constants';

import { TimeArea, TurnTag, TurnValue, TimeTag, TimeValue } from '../theme';
import { TimeAreaMobile, TimeValueMobile } from '../themeMobile';

import { useMediaQuery } from "@mui/material";

import { setValidAction } from '../../redux/msg/actions';
import { setCardsAction } from '../../redux/players/actions';

const TimeComponent = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const { nextTurn, buy } = React.useContext(CTX);

    const [turn, setTurn] = React.useState(selector.game.turn);
    const [phase, setPhase] = React.useState(selector.game.phase);
    const [time, setTime] = React.useState(selector.game.time);
    const [showFlg, setShowFlg] = React.useState(false);

    const matches = useMediaQuery("(min-width:520px)");

    // 画面表示用タイマー
    React.useEffect(() => {
        console.log("time:" + time);
        const interval = setInterval(() => {
            setTime(t => {
                if (t <= 0) {
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [time]);

    // 残り時間追加
    React.useEffect(() => {
        if (selector.game.remTimeFlg) {
            setTime(selector.game.remainingTime);
            dispatch(setRemTimeFlgAction(false));
        }
    }, [selector.game.remTimeFlg, selector.game.remainingTime, dispatch]);

    // ターン数セット
    React.useEffect(() => {
        setTurn(selector.game.turn);
    }, [selector.game.turn]);

    const handlePhase = () => {
        console.log(selector.game.phase + "フェーズ");
        switch (selector.game.phase) {
            case Constants.READY_PH:
                dispatch(resetMessagesAction());
                dispatch(setPhaseAction(Constants.GIVE_CARD_PH));
                dispatch(setMessageAction(selector.msg.lang.GIVE_CARD_MSG));
                dispatch(setTimeAction(selector.game.phaseTimes.giveCards));
                setTime(selector.game.phaseTimes.giveCards);
                break;
            case Constants.GIVE_CARD_PH:
                // 初回ターンフラグを解除（2ターン目以降のアニメーション用）
                if (selector.game.firstTurnFlg) {
                    dispatch(setFirstTurnAction(false));
                }
                // 正解者がいない場合はターゲットカード表示フェーズをスキップ
                if (selector.game.targetSkipFlg) {
                    dispatch(setPhaseAction(Constants.SHOW_AUC_PH));
                    dispatch(setMessageAction(arrayOutput(props.auctionCards.auctionCards) + selector.msg.lang.SHOW_AUC_MSG));
                    dispatch(setTimeAction(selector.game.phaseTimes.auction));
                    setTime(selector.game.phaseTimes.showAuction);
                } else {
                    dispatch(setPhaseAction(Constants.SHOW_TAR_PH));
                    if (selector.msg.lang.LANGUAGE === 'Japanese') {
                        dispatch(setMessageAction(selector.msg.lang.SHOW_TAR_MSG1 + props.targetCard + selector.msg.lang.SHOW_TAR_MSG2));
                    } else {
                        dispatch(setMessageAction(selector.msg.lang.SHOW_TAR_MSG + props.targetCard));
                    }
                    dispatch(setTimeAction(selector.game.phaseTimes.showTarget));
                    setTime(selector.game.phaseTimes.showTarget);
                }
                break;
            case Constants.SHOW_TAR_PH:
                dispatch(setPhaseAction(Constants.SHOW_AUC_PH));
                dispatch(setMessageAction(arrayOutput(props.auctionCards.auctionCards) + selector.msg.lang.SHOW_AUC_MSG));
                dispatch(setTimeAction(selector.game.phaseTimes.showAuction));
                setTime(selector.game.phaseTimes.showAuction);
                break;
            case Constants.AUCTION_PH:
                dispatch(setTimeAction(selector.game.phaseTimes.auction));
                setTime(selector.game.phaseTimes.auction);
                setShowFlg(true);
                dispatch(setMessageAction(selector.msg.lang.AUCTION_MSG1 + arrayOutput(props.auctionCards.auctionCards) + selector.msg.lang.AUCTION_MSG2));
                break;
            case Constants.AUC_RESULT_PH:
                // コインとカード情報の更新
                console.log("オークション結果フェーズだよ");
                buy({ roomId: selector.room.roomId, playerId: selector.players.player.playerId });
                dispatch(setValidAction(false));
                break;
            case Constants.CALCULATE_PH:
                dispatch(setTimeAction(selector.game.phaseTimes.calculate));
                setTime(selector.game.phaseTimes.calculate);
                setShowFlg(true);
                dispatch(setMessageAction(selector.msg.lang.CALCULATE_MSG1 + props.targetCard + selector.msg.lang.CALCULATE_MSG2));
                break;
            case Constants.CALC_RESULT_PH:
                dispatch(setTimeAction(selector.game.phaseTimes.calculateResult));
                setTime(selector.game.phaseTimes.calculateResult);
                setShowFlg(false);
                if (!selector.game.ansPlayers || selector.game.ansPlayers.length === 0) {
                    dispatch(setMessageAction(selector.msg.lang.CALC_FINISH_MSG0));
                } else {
                    let ansMessage = selector.msg.lang.CALC_FINISH_MSG1;
                    let ansMessages = []; // 各プレイヤーの獲得コインとカードのメッセージ
                    let loopNum = 1;

                    for (let ansPlayer of selector.game.ansPlayers) {
                        if (loopNum !== selector.game.ansPlayers.length) {
                            ansMessage += ansPlayer.playerName + ', ';
                        } else {
                            ansMessage += ansPlayer.playerName;
                        }
                        loopNum++
                    }

                    ansMessage += selector.msg.lang.CALC_FINISH_MSG2;

                    for (let ansPlayer of selector.game.ansPlayers) {
                        let resultMsg = ansPlayer.playerName + selector.msg.lang.CALC_FINISH_MSG3_1
                            + ansPlayer.addedCoin.total + selector.msg.lang.CALC_FINISH_MSG3_2
                            + ansPlayer.addedCoin.cardNumBonus + selector.msg.lang.CALC_FINISH_MSG3_3;
                        ansMessages.push(resultMsg);
                    }

                    dispatch(setMessageAction(ansMessage));
                    dispatch(setMessagesAction(ansMessages));
                    // ターゲットカードを消す
                    props.setTargetCard(" ");
                }
                break;
            case Constants.NEXT_TURN_PH:
                dispatch(setPreCardsAction(selector.players.player.cards));
                nextTurn({ roomId: props.roomId, playerId: props.playerId });
                setTime(selector.game.phaseTimes.ready);
                break;
            default:
                break;
        }
    }

    // 手札配布〜オークションカードオープンまでのフェーズ遷移アクション
    React.useEffect(() => {
        if (selector.game.phase === Constants.READY_PH || selector.game.phase === Constants.GIVE_CARD_PH || selector.game.phase === Constants.SHOW_TAR_PH) {
            if (time === 0) {
                handlePhase();
                setPhase(selector.game.phase);
            }
        } else {
            if (phase !== selector.game.phase) {
                handlePhase();
                setPhase(selector.game.phase);
            }
        }
    }, [time, selector.game.phase]);

    return (
        <div>
            {matches ?
                <TimeArea>
                    <TurnTag>{selector.msg.lang.TURN} : <TurnValue>{turn}</TurnValue></TurnTag>
                    <TimeTag>{selector.msg.lang.TIME}</TimeTag>
                    <TimeValue>{showFlg ? time : "　"}</TimeValue>
                </TimeArea>
                :
                <TimeAreaMobile>
                    <TimeValueMobile>{showFlg ? time : "　"}</TimeValueMobile>
                </TimeAreaMobile>
            }
        </div>
    )
}

export default TimeComponent;