import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';

import { setMessageAction, setPhaseAction, setTimeAction, setBidAction, setHighestAction, setSkipAction, setPassAction } from '../../redux/game/actions';
import { setCardsAction, setCoinAction } from '../../redux/players/actions';

import * as Constants from '../../constants';
import usePersist from '../../Persist';

import { useStyles } from '../theme';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

const AucComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const [fee, setFee] = React.useState('');
    const {bid} = React.useContext(CTX);

    const bidAucCard = () => {
        console.log("bid:" + fee);
        bid({playerId: selector.players.player.playerId, coin: Number(fee), action: 'bid'});
        // mock
        /*let coin = selector.players.player.coin - fee;
        let msg = '{"playerId":1,"coin":' + coin + ',"cards":["1", "+", "2", "-", "3", "9"]}';
        let resObj = JSON.parse(msg);
        dispatch(setCardsAction(resObj));
        dispatch(setCoinAction(resObj));
        msg = '{"playerName":"ITO","coin":' + fee + '}';
        resObj = JSON.parse(msg);
        dispatch(setBidAction(resObj));
        dispatch(setHighestAction(resObj));
        // 全員がパスしたわけじゃないよ
        dispatch(setPassAction({passFlg: false}));
        dispatch(setSkipAction({skipFlg: true}));*/
    }

    const passAucCard = () => {
        console.log("pass");
        bid({playerId: selector.players.player.playerId, coin: null, action: 'pass'});
        // mock
        //dispatch(setSkipAction({skipFlg: true}));
    }

    const checkPhase = () => {
        if(selector.game.phase !== Constants.GIVE_CARD_PH && selector.game.phase !== Constants.SHOW_ANS_PH) {
            return true;
        }else {
            return false;
        }
    }

    return (
        <Card className={classes.auction_root}>
            <Grid container>
                <Grid item xs={5}>
                    <Card className={classes.auction}>
                        <h3 className={classes.tag}>Auction</h3>
                        <h1 className={classes.message}>{checkPhase() ? props.auctionCard : "　"}</h1>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <TextField inputProps={{className: classes.coinField}} InputLabelProps={{className: classes.coinField}}
                    id="standard-basic" label="Please enter the bid amount" value={fee} 
                    onChange={e => setFee(e.target.value)} />
                    <Button size="large" className={classes.bidButton}
                    onClick={bidAucCard} disabled={!(selector.game.phase === Constants.AUCTION_PH)}>BID</Button>
                    <Button size="large" className={classes.passButton}
                    onClick={passAucCard} disabled={!(selector.game.phase === Constants.AUCTION_PH)}>PASS</Button>
                    {(selector.game.highestBid !== 0 && selector.game.phase === Constants.AUCTION_PH ) &&
                        <h3 className={classes.tag}>
                            {Constants.AUC_BID_MSG1 + selector.game.highestBid + Constants.AUC_BID_MSG2 + selector.game.playerName + Constants.AUC_BID_MSG3}
                        </h3>
                    }  
            </Grid>
                </Grid>
        </Card>
    )
}

export default AucComponent;