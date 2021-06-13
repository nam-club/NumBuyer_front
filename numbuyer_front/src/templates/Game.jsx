import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { useStyles } from '../theme';

import GlobalStyle from "../globalStyles";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const Game = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const [money, changeMoney] = React.useState('');

    const classes = useStyles();

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            <div className={classes.game_back}>
                <Grid container>
                    <Grid item xs={9}>
                        <Card className={classes.box}>
                            <h3 className={classes.naviMessage}>Distributing cards to players...</h3>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.time}>
                            <h3 className={classes.tag}>Time</h3>
                            <h1 className={classes.message}>60</h1>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={2} />
                    <Grid item xs={2}>
                        <Card className={classes.answer}>
                            <h3 className={classes.tag}>Answer</h3>
                            <h1 className={classes.message}>22</h1>
                        </Card>
                    </Grid>
                    <Grid item xs={7}>
                        <Card className={classes.auction_root}>
                            <Grid container>
                                <Grid item xs={5}>
                                    <Card className={classes.auction}>
                                        <h3 className={classes.tag}>Auction</h3>
                                        <h1 className={classes.message}>9</h1>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField inputProps={{className: classes.moneyField}} InputLabelProps={{className: classes.moneyField}}
                                    id="standard-basic" label="Please enter the bid amount" value={money} 
                                    onChange={e => changeMoney(e.target.value)} />
                                    <Button size="large" className={classes.buyButton}>BUY</Button>
                                    <Button size="large" className={classes.passButton}>PASS</Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </Typography>
    )
}

export default Game;