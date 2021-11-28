import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useStyles } from './theme';
import usePersist from '../Persist';
import { push } from 'connected-react-router';
import * as Constants from '../constants';
import TimeComponent from './components/TimeComponent';

import GlobalStyle from "../globalStyles";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import AucComponent from './components/AucComponent';
import CalcComponent from './components/CalcComponent';

const Game = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const [targetCard, setTargetCard] = React.useState(selector.game.targetCard);
    const [auctionCard, setAuctionCard] = React.useState(selector.game.auctionCard);
    const [aucBtnFlg, setAucBtnFlg] = React.useState(selector.game.aucBtnFlg);
    const [calcBtnFlg, setCalcBtnFlg] = React.useState(selector.game.calcBtnFlg);
    const [player, setPlayer] = React.useState(selector.players.player);
    const [roomId, setRoomId] = React.useState(selector.room.roomId);
    const [finishFlg, setFinishFlg] = React.useState(selector.game.finishFlg);
    const [winPlayerName, setWinPlayerName] = React.useState(selector.game.winPlayerName);

    React.useEffect(() => {
        console.log("更新");
        setPlayer(selector.players.player);
        setRoomId(selector.room.roomId);
        setTargetCard(selector.game.targetCard);
        setAuctionCard(selector.game.auctionCard);
        setAucBtnFlg(selector.game.aucBtnFlg);
        setCalcBtnFlg(selector.game.calcBtnFlg);
        setFinishFlg(selector.game.finishFlg);
        setWinPlayerName(selector.game.winPlayerName);
    }, [selector.players.player, selector.players.player.cards, selector.room.roomId, selector.game.targetCard, selector.game.auctionCard,
         selector.game.aucBtnFlg, selector.game.calcBtnFlg, selector.game.finishFlg]);

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
                        <TimeComponent targetCard={targetCard} setTargetCard={setTargetCard} auctionCard={auctionCard}
                         roomId={roomId} playerId={player.playerId}/>
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
                        <AucComponent auctionCard={auctionCard} aucBtnFlg={aucBtnFlg}/>
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
                <CalcComponent calcBtnFlg={calcBtnFlg}/>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={finishFlg}
            >
                <Fade in={finishFlg}>
                <div className={classes.paper}>
                    <h1 className={classes.title}>WINNER</h1>
                    <h2 className={classes.win_name}>{winPlayerName}</h2>
                    <Button size="large" className={classes.startButton + " " + classes.friendButton}
                    onClick={() => {
                        dispatch(push('/'));
                    }}>Finish Game</Button>
                    <Button size="large" className={classes.startButton + " " + classes.quickButton}
                    >Try Again</Button>
                </div>
                </Fade>
            </Modal>
        </Typography>
    )
}

export default Game;