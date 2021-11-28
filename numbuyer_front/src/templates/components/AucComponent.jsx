import React from 'react';
import { Transition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';

import * as Constants from '../../constants';

import { useStyles } from '../theme';
import { setAucBtnAction } from '../../redux/game/actions';
import { setValidAction, setErrMsgAction } from '../../redux/msg/actions';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

const AucComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const [fade, setFade] = React.useState(false); // フェードイン用フラグ
    const [fee, setFee] = React.useState('');
    const {bid} = React.useContext(CTX);

    const transitionStyles = {
        entering: { opacity: 1, transition: 'all 1s ease' },
        entered: { opacity: 1 },
        exiting: { opacity: 0, transition: 'all 1s ease' },
        exited: { opacity: 0 },
    }

    React.useEffect(() => {
        if((selector.game.phase !== Constants.GIVE_CARD_PH) && (selector.game.phase !== Constants.SHOW_TAR_PH)) {
            setFade(false);
            setFade(true);
        }
    }, [selector.game.phase]);

    const doChange = (e) => {
        console.log(e.target.value);
        // 金額が未入力
        if(e.target.value === '') {
            dispatch(setValidAction({validFlg: true}));
            dispatch(setErrMsgAction({errMsg: Constants.NULL_BID_ERR}));
        // 数字以外が入力
        }else if(!e.target.value.match(Constants.BID_EXP)) {
            dispatch(setValidAction({validFlg: true}));
            dispatch(setErrMsgAction({errMsg: Constants.NUM_ERR}));
        }else if(e.target.value.match(Constants.BID_EXP)) {
            dispatch(setValidAction({validFlg: false}));
            setFee(e.target.value);
        }
    }

    const bidAucCard = () => {
        console.log("playerCoin:" + selector.players.player.coin);
        // 金額が未入力
        if(fee === '') {
            dispatch(setValidAction({validFlg: true}));
            dispatch(setErrMsgAction({errMsg: Constants.NULL_BID_ERR}));
        // 数字以外が入力
        }else if(!fee.match(Constants.BID_EXP)) {
            dispatch(setValidAction({validFlg: true}));
            dispatch(setErrMsgAction({errMsg: Constants.NUM_ERR}));
        }else if(fee.match(Constants.BID_EXP)) {
            if(fee <= selector.players.player.coin) {
                dispatch(setValidAction({validFlg: false}));
                if(fee > selector.game.highestBid) {
                    dispatch(setValidAction({validFlg: false}));
                    bid({roomId: selector.room.roomId, playerId: selector.players.player.playerId, coin: Number(fee), action: 'bid'});
                // 現在の最高入札額以下では入札できない
                }else {
                    dispatch(setValidAction({validFlg: true}));
                    dispatch(setErrMsgAction({errMsg: Constants.BID_ERR}));
                }
            // 所持金が足りない
            }else {
                dispatch(setValidAction({validFlg: true}));
                dispatch(setErrMsgAction({errMsg: Constants.LACK_ERR}));
            }
        }
    }

    const passAucCard = () => {
        console.log("pass");
        bid({roomId: selector.room.roomId, playerId: selector.players.player.playerId, coin: null, action: 'pass'});

        // ボタン押せないようにする（パス押したらもう回答できない）
        dispatch(setAucBtnAction(false));
    }

    return (
        <Card className={classes.auction_root}>
            <Grid container>
                <Grid item xs={5}>
                    {props.auctionCard !== '　' &&
                        <Transition in={fade} timeout={1500}>
                            {(state) => (
                                <Card className={classes.auction} style={transitionStyles[state]}>
                                    <h3 className={classes.tag}>Auction</h3>
                                    <h1 className={classes.message}>{props.auctionCard}</h1>
                                </Card>
                            )}
                        </Transition> 
                    }
                </Grid>
                <Grid item xs={6}>
                    <TextField inputProps={{className: classes.coinField}} InputLabelProps={{className: classes.coinField}}
                    id="standard-basic" label="Please enter the bid amount" value={fee} 
                    onChange={doChange} />
                    {selector.msg.validFlg &&
                        <p className={classes.errorField}>{selector.msg.errMsg}</p>
                    }
                    <Button size="large" className={classes.bidButton}
                    onClick={bidAucCard} disabled={!(selector.game.phase === Constants.AUCTION_PH) || !props.aucBtnFlg}>BID</Button>
                    <Button size="large" className={classes.passButton}
                    onClick={passAucCard} disabled={!(selector.game.phase === Constants.AUCTION_PH) || !props.aucBtnFlg}>PASS</Button>
                    {(selector.game.highestBid !== 0 && selector.game.phase === Constants.AUCTION_PH ) &&
                        <h3 className={classes.tag}>
                            {Constants.AUC_HIGHEST_MSG1 + selector.game.highestBid + Constants.AUC_HIGHEST_MSG2 + selector.game.highestName + Constants.AUC_HIGHEST_MSG3}
                        </h3>
                    }  
            </Grid>
                </Grid>
        </Card>
    )
}

export default AucComponent;