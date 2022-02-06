import React from 'react';
import { Transition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';

import * as Constants from '../../constants';

import { useStyles, AuctionCard, CardTag, CardValue, BidMessage, CoinField, AuctionArea, BidButton, PassButton, YesButton, ConfirmTitle, ConfirmMessage, HighBidMessage, ErrorMessage } from '../theme';
import { setAucBtnAction } from '../../redux/game/actions';
import { setValidAction, setErrMsgAction } from '../../redux/msg/actions';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { grey } from '@mui/material/colors';

const AucComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const [fade, setFade] = React.useState(false); // フェードイン用フラグ
    const [fee, setFee] = React.useState('');
    const {bid} = React.useContext(CTX);
    const [open, setOpen] = React.useState(false); // ダイアログ用フラグ

    const transitionStyles = {
        entering: { opacity: 1, transition: 'all 1s ease' },
        entered: { opacity: 1 },
        exiting: { opacity: 0, transition: 'all 1s ease' },
        exited: { opacity: 0 },
    }

    React.useEffect(() => {
        console.log(selector.game.phase + "フェーズ");
        if(selector.game.phase === Constants.SHOW_AUC_PH) {
            setFade(false);
            setFade(true);
        }
    }, [selector.game.phase]);

    const doChange = (e) => {
        if(e.target.value === '' || e.target.value.match(Constants.BID_EXP)) {
            setFee(e.target.value);
        }
        if(e.target.value !== '' && e.target.value.match(Constants.BID_EXP)) {
            dispatch(setValidAction({validFlg: false}));
        }else {
            dispatch(setValidAction({validFlg: true}));
            // 数字以外が入力
            if(e.target.value !== '') {
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.NUM_ERR}));
            // 金額が未入力
            }else {
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.NULL_BID_ERR}));
            }
        }
    }

    const bidAucCard = () => {
        // 金額が未入力
        if(fee === '') {
            dispatch(setValidAction({validFlg: true}));
            dispatch(setErrMsgAction({errMsg: selector.msg.lang.NULL_BID_ERR}));
        // 数字以外が入力
        }else if(!fee.match(Constants.BID_EXP)) {
            dispatch(setValidAction({validFlg: true}));
            dispatch(setErrMsgAction({errMsg: selector.msg.lang.NUM_ERR}));
        }else if(fee.match(Constants.BID_EXP)) {
            // 2回連続入札していないか
            if((selector.game.highestName !== selector.players.player.playerName) || (selector.game.highestName === '')) {
                // 所持金より高い金額を入力していないか
                if(fee <= selector.players.player.coin) {
                    dispatch(setValidAction({validFlg: false}));
                    // 問題なし
                    if(fee > selector.game.highestBid) {
                        dispatch(setValidAction({validFlg: false}));
                        bid({roomId: selector.room.roomId, playerId: selector.players.player.playerId, coin: Number(fee), action: 'bid'});
                        setFee('');
                    // 現在の最高入札額以下を入力していないか
                    }else {
                        dispatch(setValidAction({validFlg: true}));
                        dispatch(setErrMsgAction({errMsg: selector.msg.lang.BID_ERR}));
                    }
                // 所持金が足りない
                }else {
                    dispatch(setValidAction({validFlg: true}));
                    dispatch(setErrMsgAction({errMsg: selector.msg.lang.LACK_ERR}));
                }
            // 2回連続入札
            }else {
                dispatch(setValidAction({validFlg: true}));
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.DOUBLE_ERR}));
            }
        }
    }

    const passAucCard = () => {
        handleClose();
        setFee('');
        bid({roomId: selector.room.roomId, playerId: selector.players.player.playerId, coin: null, action: 'pass'});

        // ボタン押せないようにする（パス押したらもう回答できない）
        dispatch(setAucBtnAction(false));
    }
    
    // ダイアログ表示
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    // ダイアログ閉じる
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card className={classes.auction_root + ' ' + (selector.game.phase === Constants.AUCTION_PH ? classes.auction_root_animation : '')}>
            <Grid container>
                <Grid item xs={5}>
                    {(props.auctionCard !== '　' && 
                        !((selector.game.phase === Constants.READY_PH)
                            || (selector.game.phase === Constants.GIVE_CARD_PH)
                            || (selector.game.phase === Constants.SHOW_TAR_PH)))
                    &&
                        <Slide direction="down" in={fade} mountOnEnter unmountOnExit timeout={1500}>
                            <AuctionCard>
                                <CardTag>{selector.msg.lang.AUCTION}</CardTag>
                                <CardValue>{props.auctionCard}</CardValue>
                            </AuctionCard>
                        </Slide>
                    }
                </Grid>
                <Grid item xs={6}>
                    {(selector.game.phase === Constants.AUCTION_PH) ?
                        <div>
                            <BidMessage>{selector.msg.lang.BID_MSG}</BidMessage>
                            <CoinField inputProps={{ style: {fontSize: '1.5em', color: grey[600], marginTop: '2%', marginBottom: '-4%'} } }
                            type="number" 
                            id="standard-basic" value={fee} 
                            onChange={doChange} />
                        </div>
                    :   <AuctionArea></AuctionArea>
                    }  
                    {((selector.game.phase === Constants.AUCTION_PH) && selector.msg.validFlg) &&
                        <ErrorMessage>{selector.msg.errMsg}</ErrorMessage>
                    }
                    <PassButton size="large" variant="contained"
                    onClick={handleClickOpen} disabled={!(selector.game.phase === Constants.AUCTION_PH) || !props.aucBtnFlg}>{selector.msg.lang.PASS_BTN}</PassButton>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <ConfirmTitle id="alert-dialog-title">{selector.msg.lang.PASS_TITLE}</ConfirmTitle>
                        <DialogContent align="center">
                            <ConfirmMessage id="alert-dialog-description">{selector.msg.lang.PASS_MSG}</ConfirmMessage>
                        </DialogContent>
                        <DialogActions>
                            <PassButton onClick={handleClose}>{selector.msg.lang.NO_BTN}</PassButton>
                            <YesButton onClick={passAucCard} autoFocus>{selector.msg.lang.YES_BTN}</YesButton>
                        </DialogActions>
                    </Dialog>
                    <BidButton size="large" variant="contained"
                    onClick={bidAucCard} disabled={!(selector.game.phase === Constants.AUCTION_PH) || !props.aucBtnFlg}>{selector.msg.lang.BID_BTN}</BidButton>
                    {(selector.game.highestBid !== 0 && selector.game.phase === Constants.AUCTION_PH ) &&
                        <HighBidMessage>
                            {selector.msg.lang.AUC_HIGHEST_MSG1 + selector.game.highestBid + selector.msg.lang.AUC_HIGHEST_MSG2 + selector.game.highestName + selector.msg.lang.AUC_HIGHEST_MSG3}
                        </HighBidMessage>
                    }
                </Grid>
            </Grid>
        </Card>
    )
}

export default AucComponent;