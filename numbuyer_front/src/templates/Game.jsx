import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { CTX } from '../Socket';

import { useStyles } from './theme';
import usePersist from '../Persist';
import TimeComponent from './components/TimeComponent';

import GlobalStyle from "../globalStyles";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const Game = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const [gameData, setGameData] = usePersist("gameData", null);

    const [ansCard, setAnsCard] = React.useState(gameData.game.ansCard);
    const [aucCard, setAucCard] = React.useState(gameData.game.aucCard);
    const [fee, setFee] = React.useState('');
    const {buyToServer} = React.useContext(CTX);
    //const [players, setPlayers] = React.useState(gameData.players.players);

    React.useEffect(() => {
        setGameData(selector);
    }, [ansCard, aucCard]);

    const isOwn = (player) => {
        return player.ownFlg == true;
    }

    const buyAucCard = () => {
        console.log(fee);
        buyToServer({playerId: selector.players.find(isOwn).playerId, money: Number(fee)});
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
                        <Card className={classes.auction_root}>
                            <Grid container>
                                <Grid item xs={5}>
                                    <Card className={classes.auction}>
                                        <h3 className={classes.tag}>Auction</h3>
                                        <h1 className={classes.message}>{aucCard}</h1>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField inputProps={{className: classes.moneyField}} InputLabelProps={{className: classes.moneyField}}
                                    id="standard-basic" label="Please enter the bid amount" value={fee} 
                                    onChange={e => setFee(e.target.value)} />
                                    <Button size="large" className={classes.buyButton}
                                    onClick={buyAucCard}>BUY</Button>
                                    <Button size="large" className={classes.passButton}>PASS</Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={2}>
                        {selector.players.map((value) => (
                            <Card className={classes.player} key={value.playerId}>
                                <h3 className={classes.tag}>{value.playerName}</h3>
                                <h4 className={classes.tag}>×{value.cards.length}</h4>
                                <h4 className={classes.tag}>{value.money}</h4>
                            </Card>
                        ))}
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={10}>
                        <Card className={classes.hand}>
                            <h3 className={classes.handMessage} align="left">My Cards</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        {selector.players.find(isOwn).cards.map((value) => (
                                            <td>
                                                <Card className={classes.card}>
                                                    <h1 className={classes.message}>{value}</h1>
                                                </Card>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={10}>
                        <Card className={classes.calc}>
                            <h3 className={classes.calcMessage} align="left">Calculate Field</h3>
                            <Grid item xs={1}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                
                                            </td>
                                            <td>
                                                
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </Typography>
    )
}

export default Game;