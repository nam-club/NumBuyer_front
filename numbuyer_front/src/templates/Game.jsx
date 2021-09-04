import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { CTX } from '../Socket';

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

    const [ansCard, setAnsCard] = React.useState(gameData.game.ansCard);
    const [aucCard, setAucCard] = React.useState(gameData.game.aucCard);
    //const [players, setPlayers] = React.useState(gameData.players.players);

    React.useEffect(() => {
        setGameData(selector);
    }, [ansCard, aucCard]);

    const isOwn = (player) => {
        return player.ownFlg == true;
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
                        <TimeComponent ansCard={ansCard} setAnsCard={setAnsCard}
                         aucCard={aucCard} setAucCard={setAucCard} />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={1} />
                    <Grid item xs={2}>
                        <Card className={classes.answer}>
                            <h3 className={classes.tag}>Answer</h3>
                            <h1 className={classes.message}>{ansCard}</h1>
                        </Card>
                    </Grid>
                    <Grid item xs={7}>
                        <AucComponent isOwn={isOwn} aucCard={aucCard}/>
                    </Grid>
                    <Grid item xs={2}>
                        {selector.players.map((value) => (
                            <Card className={classes.player} key={value.playerId}>
                                <h3 className={classes.tag}>{value.playerName}</h3>
                                <h4 className={classes.tag}>×{value.cards.length}</h4>
                                <h4 className={classes.tag}>{value.coin}</h4>
                            </Card>
                        ))}
                    </Grid>
                </Grid>
                <CalcComponent isOwn={isOwn} />
            </div>
        </Typography>
    )
}

export default Game;