import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';

import { setMessageAction, setStateAction, setTimeAction, setSkipAction } from '../../redux/game/actions';

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
    const {buyToServer} = React.useContext(CTX);

    const buyAucCard = () => {
        console.log("buy:" + fee);
        buyToServer({playerId: selector.players.find(props.isOwn).playerId, coin: Number(fee)});
    }

    const passAucCard = () => {
        console.log("pass");
        buyToServer({playerId: selector.players.find(props.isOwn).playerId, coin: null});
        // mock
        dispatch(setSkipAction({skipFlg: true}));
    }

    return (
        <Card className={classes.auction_root}>
            <Grid container>
                <Grid item xs={5}>
                    <Card className={classes.auction}>
                        <h3 className={classes.tag}>Auction</h3>
                        <h1 className={classes.message}>{props.aucCard}</h1>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <TextField inputProps={{className: classes.coinField}} InputLabelProps={{className: classes.coinField}}
                    id="standard-basic" label="Please enter the bid amount" value={fee} 
                    onChange={e => setFee(e.target.value)} />
                    <Button size="large" className={classes.buyButton}
                    onClick={buyAucCard} disabled={!(selector.game.state == Constants.AUCTION_ST)}>BUY</Button>
                    <Button size="large" className={classes.passButton}
                    onClick={passAucCard} disabled={!(selector.game.state == Constants.AUCTION_ST)}>PASS</Button>
                </Grid>
            </Grid>
        </Card>
    )
}

export default AucComponent;