import React from 'react';
import { useSelector } from 'react-redux';

import { useStyles, GameBack, TargetCard, CardTag, CardValue, GoalArea, GoalTag, GoalMessage, FinishModal, FinishMenu } from './theme';
import * as Constants from '../constants';
import TimeComponent from './components/TimeComponent';
import AucComponent from './components/AucComponent';
import CalcComponent from './components/CalcComponent';
import RankingComponent from './components/RankingComponent';
import NavigationComponent from './components/NavigationComponent';
import PlayerInfoComponent from './components/PlayerInfoComponent';

import GlobalStyle from "../globalStyles";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';

const Game = () => {
    const classes = useStyles();
    const selector = useSelector(state => state);

    const [fade, setFade] = React.useState(false); // フェードイン用フラグ
    const [targetCard, setTargetCard] = React.useState(selector.game.targetCard);
    const [auctionCards, setAuctionCards] = React.useState([selector.game.auctionCards]);
    const [aucBtnFlg, setAucBtnFlg] = React.useState(selector.game.aucBtnFlg);
    const [calcBtnFlg, setCalcBtnFlg] = React.useState(selector.game.calcBtnFlg);
    const [player, setPlayer] = React.useState(selector.players.player);
    const [myPlayer, setMyPlayer] = React.useState(selector.players.players.find((my) => {
        return my.playerId === player.playerId })); // プレイヤー一覧表示用
    const [otherPlayers, setOtherPlayers] = React.useState(selector.players.players.filter((other) => {
        return other.playerId !== player.playerId })); // プレイヤー一覧表示用
    const [roomId, setRoomId] = React.useState(selector.room.roomId);
    const [finishFlg, setFinishFlg] = React.useState(selector.game.finishFlg);
    const [message, setMessage] = React.useState(selector.game.message);
    const [messages, setMessages] = React.useState(selector.game.messages);

    const transitionStyles = {
        entering: { opacity: 1, transition: 'all 1s ease' },
        entered: { opacity: 1 },
        exiting: { opacity: 0, transition: 'all 1s ease' },
        exited: { opacity: 0 },
    }

    React.useEffect(() => {
        setPlayer(selector.players.player);
        setRoomId(selector.room.roomId);
        setMyPlayer(selector.players.players.find((my) => { return my.playerId === player.playerId }));
        setOtherPlayers(selector.players.players.filter((other) => { return other.playerId !== player.playerId }));
        setMessage(selector.game.message);
        setMessages(selector.game.messages);
        setTargetCard(selector.game.targetCard);
        setAuctionCards(selector.game.auctionCards);
        setAucBtnFlg(selector.game.aucBtnFlg);
        setCalcBtnFlg(selector.game.calcBtnFlg);
        setFinishFlg(selector.game.finishFlg);
    }, [selector.players.player, selector.players.player.cards, selector.players.players, selector.room.roomId,
        selector.game.message, selector.game.messages, selector.game.targetCard, selector.game.auctionCards,
        selector.game.aucBtnFlg, selector.game.calcBtnFlg, selector.game.finishFlg]);

    React.useEffect(() => {
        if(selector.game.phase === Constants.SHOW_TAR_PH) {
            setFade(false);
            setFade(true);
        }
    }, [selector.game.phase]);

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            <GameBack>
                <Grid container>
                    <Grid item xs={3} />
                    <Grid item xs={6}>
                        <NavigationComponent message={message} messages={messages} />
                    </Grid>
                    <Grid item xs={3}>
                        <TimeComponent targetCard={targetCard} setTargetCard={setTargetCard} auctionCards={auctionCards}
                         roomId={roomId} playerId={player.playerId}/>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={1} />
                    <Grid item xs={2}>
                        {(targetCard !== '　'
                            && (
                                !((selector.game.phase === Constants.READY_PH) || (selector.game.phase === Constants.GIVE_CARD_PH))
                                ||
                                (selector.game.targetSkipFlg && 
                                    ((selector.game.phase === Constants.READY_PH) || (selector.game.phase === Constants.GIVE_CARD_PH))
                                )
                            )
                        )
                        &&
                            <Slide direction="down" in={fade} mountOnEnter unmountOnExit timeout={1500}>
                                <TargetCard>
                                    <CardTag>{selector.msg.lang.TARGET}</CardTag>
                                    <CardValue>{targetCard}</CardValue>
                                </TargetCard>
                            </Slide>
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <AucComponent auctionCards={auctionCards} aucBtnFlg={aucBtnFlg}/>
                        <CalcComponent calcBtnFlg={calcBtnFlg}/>
                    </Grid>
                    <Grid item xs={3}>
                        <GoalArea>
                            <GoalTag>{selector.msg.lang.WIN_CONDITIONS}</GoalTag>
                            {selector.msg.lang.LANGUAGE === 'Japanese'
                                ? <GoalMessage>{selector.game.goalCoin + selector.msg.lang.COIN + selector.msg.lang.WIN_MSG}</GoalMessage>
                                : <GoalMessage>{selector.msg.lang.WIN_MSG + ' ' + selector.game.goalCoin + ' ' + selector.msg.lang.COIN}</GoalMessage>
                            }
                        </GoalArea>
                        <PlayerInfoComponent myPlayer={myPlayer} players={otherPlayers} />
                    </Grid>
                </Grid>
                <FinishModal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={finishFlg}
                >
                    <Fade in={finishFlg}>
                        <FinishMenu>
                            <RankingComponent />
                        </FinishMenu>
                    </Fade>
                </FinishModal>
            </GameBack>
        </Typography>
    )
}

export default Game;