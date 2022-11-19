import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';

import * as Constants from '../../constants';
import * as ConstantsMsg from '../../constantsMsg';

import { useStyles, AuctionCard, CardValue, BidMessage, CoinField, AuctionArea, ChangeBidButton, BidButton, PassButton, YesButton,
         AreaTag, WrapDisplay, ConfirmTitle, ConfirmMessage, ErrorMessage } from '../theme';
import { ChangeBidButtonMobile, BidButtonMobile, PassButtonMobile } from '../themeMobile';
import { setAucBtnAction } from '../../redux/game/actions';
import { setValidAction, setErrMsgAction, setErrMsgVarsAction } from '../../redux/msg/actions';
import { setPreCardsAction } from '../../redux/players/actions';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { grey } from '@mui/material/colors';
import { useMediaQuery } from "@mui/material";

const AucComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const matches = useMediaQuery("(min-width:520px)");

    const [fade, setFade] = React.useState(false); // フェードイン用フラグ
    const [fee, setFee] = React.useState('0');
    const {bid} = React.useContext(CTX);
    const [open, setOpen] = React.useState(false); // ダイアログ用フラグ

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
                dispatch(setErrMsgVarsAction([
                    ConstantsMsg.English.NUM_ERR,
                    ConstantsMsg.Japanese.NUM_ERR,
                    ConstantsMsg.Chinese.NUM_ERR
                ]));
            // 金額が未入力
            }else {
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.NULL_BID_ERR}));
                dispatch(setErrMsgVarsAction([
                    ConstantsMsg.English.NULL_BID_ERR,
                    ConstantsMsg.Japanese.NULL_BID_ERR,
                    ConstantsMsg.Chinese.NULL_BID_ERR
                ]));
            }
        }
    }

    const changeBid = (code) => {
        let feeNum = Number(fee);
        if(code === '+') {
            setFee(String(feeNum+1));
        }else if(code === '-') {
            setFee(String(feeNum-1));
        }
    }

    const bidAucCard = () => {
        // 金額が未入力
        if(fee === '') {
            dispatch(setValidAction({validFlg: true}));
            dispatch(setErrMsgAction({errMsg: selector.msg.lang.NULL_BID_ERR}));
            dispatch(setErrMsgVarsAction([
                ConstantsMsg.English.NULL_BID_ERR,
                ConstantsMsg.Japanese.NULL_BID_ERR,
                ConstantsMsg.Chinese.NULL_BID_ERR
            ]));
        // 数字以外が入力
        }else if(!fee.match(Constants.BID_EXP)) {
            dispatch(setValidAction({validFlg: true}));
            dispatch(setErrMsgAction({errMsg: selector.msg.lang.NUM_ERR}));
            dispatch(setErrMsgVarsAction([
                ConstantsMsg.English.NUM_ERR,
                ConstantsMsg.Japanese.NUM_ERR,
                ConstantsMsg.Chinese.NUM_ERR
            ]));
        }else if(fee.match(Constants.BID_EXP)) {
            // 2回連続入札していないか
            if((selector.game.highestName !== selector.players.player.playerName) || (selector.game.highestName === '')) {
                // 所持金より高い金額を入力していないか
                if(fee <= selector.players.player.coin) {
                    dispatch(setValidAction({validFlg: false}));
                    // 問題なし
                    if(fee > selector.game.highestBid) {
                        dispatch(setValidAction({validFlg: false}));
                        dispatch(setPreCardsAction(selector.players.player.cards));
                        bid({roomId: selector.room.roomId, playerId: selector.players.player.playerId, coin: Number(fee), action: 'bid'});
                        setFee('');
                    // 現在の最高入札額以下を入力していないか
                    }else {
                        dispatch(setValidAction({validFlg: true}));
                        dispatch(setErrMsgAction({errMsg: selector.msg.lang.BID_ERR}));
                        dispatch(setErrMsgVarsAction([
                            ConstantsMsg.English.NULL_BID_ERR,
                            ConstantsMsg.Japanese.NULL_BID_ERR,
                            ConstantsMsg.Chinese.NULL_BID_ERR
                        ]));
                    }
                // 所持金が足りない
                }else {
                    dispatch(setValidAction({validFlg: true}));
                    dispatch(setErrMsgAction({errMsg: selector.msg.lang.LACK_ERR}));
                    dispatch(setErrMsgVarsAction([
                        ConstantsMsg.English.LACK_ERR,
                        ConstantsMsg.Japanese.LACK_ERR,
                        ConstantsMsg.Chinese.LACK_ERR
                    ]));
                }
            // 2回連続入札
            }else {
                dispatch(setValidAction({validFlg: true}));
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.DOUBLE_ERR}));
                dispatch(setErrMsgVarsAction([
                    ConstantsMsg.English.DOUBLE_ERR,
                    ConstantsMsg.Japanese.DOUBLE_ERR,
                    ConstantsMsg.Chinese.DOUBLE_ERR
                ]));
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
        <div>
        {matches ?
            <Card className={classes.auction_root + ' ' + (selector.game.phase === Constants.AUCTION_PH ? classes.auction_root_animation : '')}
            sx={{marginLeft: "1%"}}>
                <Grid container>
                    <Grid item xs={6}>
                        <AreaTag align="left" sx={{marginTop: 0, marginBottom: 0}}>{selector.msg.lang.AUCTION}</AreaTag>
                        {(props.auctionCards.length !== 0 && 
                            !((selector.game.phase === Constants.READY_PH)
                                || (selector.game.phase === Constants.GIVE_CARD_PH)
                                || (selector.game.phase === Constants.SHOW_TAR_PH)))
                        &&
                            <WrapDisplay>
                                {props.auctionCards.auctionCards.map((value, index) => (
                                    <Slide direction="down" in={fade} mountOnEnter unmountOnExit timeout={1500} key={index}>
                                        <AuctionCard variant="contained">
                                            <CardValue>{value}</CardValue>
                                        </AuctionCard>
                                    </Slide>
                                ))}  
                            </WrapDisplay>
                        }
                    </Grid>
                    <Grid item xs={6}>
                        {(selector.game.phase === Constants.AUCTION_PH) ?
                            <div>
                                <BidMessage>{selector.msg.lang.BID_MSG}</BidMessage>
                                <CoinField inputProps={{ style: {fontSize: '1.5em', color: grey[600], marginTop: '2%', marginBottom: '-4%'} } } 
                                id="standard-basic" value={fee} size="small"
                                onChange={doChange} />
                                <ChangeBidButton onClick={() => {changeBid('-')}}>-</ChangeBidButton>
                                <ChangeBidButton onClick={() => {changeBid('+')}}>+</ChangeBidButton>
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
                    </Grid>
                </Grid>
            </Card>
        :
        <div>
            {(selector.game.phase === Constants.AUCTION_PH) ?
            <Card className={classes.auction_root + ' ' + (selector.game.phase === Constants.AUCTION_PH ? classes.auction_root_animation : '')}
                sx={{margin: '2%'}}>
                <div>
                    <BidMessage>{selector.msg.lang.BID_MSG}</BidMessage>
                    <CoinField inputProps={{ style: {fontSize: '1.5em', color: grey[600], marginTop: '2%', marginBottom: '-4%'} } } 
                    id="standard-basic" value={fee} size="small"
                    onChange={doChange} />
                    <ChangeBidButtonMobile onClick={() => {changeBid('-')}}>-</ChangeBidButtonMobile>
                    <ChangeBidButtonMobile onClick={() => {changeBid('+')}}>+</ChangeBidButtonMobile>
                    {((selector.game.phase === Constants.AUCTION_PH) && selector.msg.validFlg) &&
                        <ErrorMessage>{selector.msg.errMsg}</ErrorMessage>
                    }
                </div>
                <div>
                    <PassButtonMobile size="large" variant="contained"
                    onClick={handleClickOpen} disabled={!(selector.game.phase === Constants.AUCTION_PH) || !props.aucBtnFlg}>{selector.msg.lang.PASS_BTN}</PassButtonMobile>
                    <BidButtonMobile size="large" variant="contained"
                    onClick={bidAucCard} disabled={!(selector.game.phase === Constants.AUCTION_PH) || !props.aucBtnFlg}>{selector.msg.lang.BID_BTN}</BidButtonMobile>
                </div>
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
            </Card>
            :   
            <div></div>
            }
        </div>
        }
        </div>
    )
}

export default AucComponent;