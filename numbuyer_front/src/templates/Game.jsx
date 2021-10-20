import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { useStyles } from './theme';
import usePersist from '../Persist';
import * as Constants from '../constants';
import TimeComponent from './components/TimeComponent';

import GlobalStyle from "../globalStyles";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AucComponent from './components/AucComponent';
import CalcComponent from './components/CalcComponent';

const Game = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const [gameData, setGameData] = usePersist("gameData", null);

    const [targetCard, setTargetCard] = React.useState(gameData.game.targetCard);
    const [auctionCard, setAuctionCard] = React.useState(gameData.game.auctionCard);
    const [player, setPlayer] = React.useState(gameData.players.player);

    React.useEffect(() => {
        setGameData(selector);
        console.log(selector);
    }, [selector]);

    const checkPhase = () => {
        if(selector.game.phase !== Constants.GIVE_CARD_PH) {
            return true;
        }else {
            return false;
        }
    }

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            <div className={classes.game_back}>
                <Grid container>
                    <Grid item xs={9}>
                        <Card className={classes.box}>
                            <h3 className={classes.naviMessage}>{selector.game.message}</h3>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <TimeComponent targetCard={targetCard} setTargetCard={setTargetCard}
                         auctionCard={auctionCard} setAuctionCard={setAuctionCard} />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={1} />
                    <Grid item xs={2}>
                        <Card className={classes.target}>
                            <h3 className={classes.tag}>Target</h3>
                            <h1 className={classes.message}>{checkPhase() ? targetCard : "　"}</h1>
                        </Card>
                    </Grid>
                    <Grid item xs={7}>
                        <AucComponent auctionCard={auctionCard}/>
                    </Grid>
                    <Grid item xs={2}>
                        {selector.players.players.map((value) => (
                            <Card className={classes.player} key={value.playerId}>
                                <h3 className={classes.tag}>{value.playerName}</h3>
                                <h4 className={classes.tag}>×{value.cardNum}</h4>
                                <h4 className={classes.tag}>{value.coin}</h4>
                            </Card>
                        ))}
                    </Grid>
                </Grid>
                <CalcComponent cards={player.cards} />
            </div>
        </Typography>
    )
}

export default Game;