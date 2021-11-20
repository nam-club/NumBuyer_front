import React from 'react';
import { Transition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';

import * as Constants from '../../constants';

import { useStyles } from '../theme';
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

    /*const doChange = (e) => {
        if(e.target.value > selector.game.highestBid) {
            setFee(e.target.value);
        }
        if(e.target.value !== '' && !e.target.value.match(Constants.NAME_EXP)) {
            dispatch(setValidAction({validFlg: false}));
        }else {
            dispatch(setValidAction({validFlg: true}));
            if(e.target.value !== '') {
                dispatch(setErrMsgAction({errMsg: Constants.SYMBOL_ERR}));
            }else {
                dispatch(setErrMsgAction({errMsg: Constants.NULL_NAME_ERR}));
            }
        }
    }*/

    const bidAucCard = () => {
        console.log("bid:" + fee);
        // 現在の最高入札額以上でないと入札できない
        if(fee > selector.game.highestBid) {
            dispatch(setValidAction({validFlg: false}));
            bid({roomId: selector.room.roomId, playerId: selector.players.player.playerId, coin: Number(fee), action: 'bid'});
        }else {
            dispatch(setValidAction({validFlg: true}));
            dispatch(setErrMsgAction({errMsg: Constants.BID_ERR}));
        }
    }

    const passAucCard = () => {
        console.log("pass");
        bid({roomId: selector.room.roomId, playerId: selector.players.player.playerId, coin: null, action: 'pass'});
    }

    return (
        <Card className={classes.auction_root}>
            <Grid container>
                <Grid item xs={5}>
                    <Transition in={fade} timeout={1500}>
                        {(state) => (
                            <Card className={classes.auction} style={transitionStyles[state]}>
                                <h3 className={classes.tag}>Auction</h3>
                                <h1 className={classes.message}>{props.auctionCard}</h1>
                            </Card>
                        )}
                    </Transition> 
                </Grid>
                <Grid item xs={6}>
                    <TextField inputProps={{className: classes.coinField}} InputLabelProps={{className: classes.coinField}}
                    id="standard-basic" label="Please enter the bid amount" value={fee} 
                    onChange={e => setFee(e.target.value)} />
                    {selector.msg.validFlg &&
                        <p className={classes.errorField}>{selector.msg.errMsg}</p>
                    }
                    <Button size="large" className={classes.bidButton}
                    onClick={bidAucCard} disabled={!(selector.game.phase === Constants.AUCTION_PH)}>BID</Button>
                    <Button size="large" className={classes.passButton}
                    onClick={passAucCard} disabled={!(selector.game.phase === Constants.AUCTION_PH)}>PASS</Button>
                    {(selector.game.highestBid !== 0 && selector.game.phase === Constants.AUCTION_PH ) &&
                        <h3 className={classes.tag}>
                            {Constants.AUC_BID_MSG1 + selector.game.highestBid + Constants.AUC_BID_MSG2 + selector.game.highestName + Constants.AUC_BID_MSG3}
                        </h3>
                    }  
            </Grid>
                </Grid>
        </Card>
    )
}

export default AucComponent;