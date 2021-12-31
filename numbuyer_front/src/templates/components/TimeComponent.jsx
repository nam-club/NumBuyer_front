import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';

import { setMessageAction, setPhaseAction, setTimeAction, setSkipAction, setPassAction,
setFinishGameAction, setWinPlayerAction, setFirstTurnAction } from '../../redux/game/actions';

import * as Constants from '../../constants';

import { useStyles } from '../theme';

import Card from '@material-ui/core/Card';

const TimeComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const { nextTurn, buy } = React.useContext(CTX);

    const [time, setTime] = React.useState(selector.game.time);
    const [showFlg, setShowFlg] = React.useState(false);

    // 画面表示用タイマー
    React.useEffect(() => {
        const interval = setInterval(() => {
            setTime(t => {
                if(t<=0) {
                    return 0;
                }
                return t-1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [time]);

    // ターゲットカード公開フェーズロジック
    const showTarget = () => {
        dispatch(setPhaseAction(Constants.SHOW_TAR_PH));
        dispatch(setMessageAction(selector.msg.lang.SHOW_TAR_MSG + '"' + props.targetCard + '"'));
        dispatch(setTimeAction(Constants.SHOW_TAR_TIME));
        setTime(Constants.SHOW_TAR_TIME);
    }

    // 手札配布〜オークションカードオープンまでのフェーズ遷移アクション
    React.useEffect(() => {
        console.log("phase:" + selector.game.phase);
        console.log("time:" + time);
            switch(selector.game.phase) {
                case Constants.READY_PH:
                    if(time === 0) {
                        dispatch(setPhaseAction(Constants.GIVE_CARD_PH));
                        dispatch(setMessageAction(selector.msg.lang.GIVE_CARD_MSG));
                        dispatch(setTimeAction(Constants.GIVE_CARD_TIME));
                        setTime(Constants.GIVE_CARD_TIME);
                    }
                    break;
                case Constants.GIVE_CARD_PH:
                    if(time === 0) {
                        // 初回ターンフラグを解除（2ターン目以降のアニメーション用）
                        if(selector.game.firstTurnFlg) {
                            dispatch(setFirstTurnAction(false));
                        }
                        // 正解者がいない場合はターゲットカード表示フェーズをスキップ
                        if(selector.game.targetSkipFlg) {
                            dispatch(setPhaseAction(Constants.SHOW_AUC_PH));
                            dispatch(setMessageAction('"' + props.auctionCard + '"' + selector.msg.lang.SHOW_AUC_MSG));
                            dispatch(setTimeAction(Constants.SHOW_AUC_TIME));
                            setTime(Constants.SHOW_AUC_TIME);
                        }else {
                            dispatch(setPhaseAction(Constants.SHOW_TAR_PH));
                            dispatch(setMessageAction(selector.msg.lang.SHOW_TAR_MSG + '"' + props.targetCard + '"'));
                            dispatch(setTimeAction(Constants.SHOW_TAR_TIME));
                            setTime(Constants.SHOW_TAR_TIME);
                        }
                    }
                    break;
                case Constants.SHOW_TAR_PH:
                    if(time === 0) {
                        dispatch(setPhaseAction(Constants.SHOW_AUC_PH));
                        dispatch(setMessageAction('"' + props.auctionCard + '"' + selector.msg.lang.SHOW_AUC_MSG));
                        dispatch(setTimeAction(Constants.SHOW_AUC_TIME));
                        setTime(Constants.SHOW_AUC_TIME);
                    }
                    break;
                default:
                    break;
            }
        }, [time]);

        // オークション〜ゲーム終了まで（back側に基づく遷移）のフェーズ遷移アクション
        React.useEffect(() => {
            console.log("phase:" + selector.game.phase);
            console.log("time:" + time);
                switch(selector.game.phase) {
                case Constants.AUCTION_PH:
                    dispatch(setTimeAction(Constants.AUCTION_TIME));
                    setTime(Constants.AUCTION_TIME);
                    setShowFlg(true);
                    dispatch(setMessageAction(selector.msg.lang.AUCTION_MSG1 + props.auctionCard + selector.msg.lang.AUCTION_MSG2));
                    break;
                case Constants.AUC_RESULT_PH:
                    // コインとカード情報の更新
                    buy({roomId: selector.room.roomId, playerId: selector.players.player.playerId});
                    break;
                case Constants.CALCULATE_PH:
                    dispatch(setTimeAction(Constants.CALCULATE_TIME));
                    setTime(Constants.CALCULATE_TIME);
                    setShowFlg(true);
                    dispatch(setMessageAction(selector.msg.lang.CALCULATE_MSG1 + props.targetCard + selector.msg.lang.CALCULATE_MSG2));
                    break;
                case Constants.CALC_RESULT_PH:
                    dispatch(setTimeAction(Constants.CALC_RESULT_TIME));
                    setTime(Constants.CALC_RESULT_TIME);
                    setShowFlg(false);
                    if(!selector.game.ansPlayers || selector.game.ansPlayers.length == 0) {
                        dispatch(setMessageAction(selector.msg.lang.CALC_FINISH_MSG0));
                    }else {
                        let ansMessage = selector.msg.lang.CALC_FINISH_MSG1;
                        let loopNum = 1;

                        for(let ansPlayer of selector.game.ansPlayers) {
                            if(loopNum != selector.game.ansPlayers.length) {
                                ansMessage += ansPlayer + ', ';
                            }else {
                                ansMessage += ansPlayer;
                            }
                            loopNum++
                        }

                        ansMessage += selector.msg.lang.CALC_FINISH_MSG2;
                        ansMessage += props.targetCard + selector.msg.lang.CALC_FINISH_MSG3;
                        dispatch(setMessageAction(ansMessage));

                        // ターゲットカードを消す
                        props.setTargetCard(" ");
                    }
                    break;
                case Constants.NEXT_TURN_PH:
                    nextTurn({roomId: props.roomId, playerId: props.playerId});
                    setTime(Constants.READY_TIME);
                    break;
                default:
                    break;
            }
    }, [selector.game.phase]);

    return (
        <Card className={classes.time}>
            <h3 className={classes.bg_tag}>Time</h3>
            <h1 className={classes.bg_value}>{showFlg ? time : "　"}</h1>
        </Card>
    )
}

export default TimeComponent;