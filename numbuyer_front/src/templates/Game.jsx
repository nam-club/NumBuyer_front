import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Transition } from 'react-transition-group';

import { useStyles, GameBack, MessageBox, NaviMessage, TargetCard, CardTag, CardValue, GoalArea, GoalTag, GoalMessage,
         PlayerList, PlayerName, PlayerInfo, PlayerInfoIcon, FinishModal, FinishMenu, RankingTitle, 
         Winner, WinnerInfoIcon, Loser, LoserInfoIcon, FinishButton, AgainButton } from './theme';
import usePersist from '../Persist';
import { push } from 'connected-react-router';
import * as Constants from '../constants';
import TimeComponent from './components/TimeComponent';

import GlobalStyle from "../globalStyles";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import AucComponent from './components/AucComponent';
import CalcComponent from './components/CalcComponent';

import coin from '../assets/coin.png';
import card from '../assets/card.png';

import { CTX } from '../Socket';
import { setRankingAction } from '../redux/players/actions';
import { setFinishGameAction, setMessageAction } from '../redux/game/actions';

const Game = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const { start } = React.useContext(CTX);

    const [fade, setFade] = React.useState(false); // フェードイン用フラグ
    const [targetCard, setTargetCard] = React.useState(selector.game.targetCard);
    const [auctionCard, setAuctionCard] = React.useState(selector.game.auctionCard);
    const [aucBtnFlg, setAucBtnFlg] = React.useState(selector.game.aucBtnFlg);
    const [calcBtnFlg, setCalcBtnFlg] = React.useState(selector.game.calcBtnFlg);
    const [player, setPlayer] = React.useState(selector.players.player);
    const [roomId, setRoomId] = React.useState(selector.room.roomId);
    const [finishFlg, setFinishFlg] = React.useState(selector.game.finishFlg);
    const [winPlayerName, setWinPlayerName] = React.useState(selector.game.winPlayerName);

    const transitionStyles = {
        entering: { opacity: 1, transition: 'all 1s ease' },
        entered: { opacity: 1 },
        exiting: { opacity: 0, transition: 'all 1s ease' },
        exited: { opacity: 0 },
    }

    React.useEffect(() => {
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

    React.useEffect(() => {
        if(selector.game.phase === Constants.SHOW_TAR_PH) {
            setFade(false);
            setFade(true);
        }
    }, [selector.game.phase]);

    const finishGame = (mode) => {
        dispatch(setRankingAction([]));
        dispatch(setFinishGameAction(false));
        dispatch(setMessageAction(''));
        switch(mode) {
            case 'finish':
                dispatch(push('/'));
                break;
            case 'again':
                start({roomId: selector.room.roomId, playerId: selector.players.player.playerId});
                break;
            default:
                break;
        }
    } 

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            <GameBack>
                <Grid container>
                    <Grid item xs={9}>
                        <MessageBox>
                            <NaviMessage>{selector.game.message}</NaviMessage>
                        </MessageBox>
                    </Grid>
                    <Grid item xs={3}>
                        <TimeComponent targetCard={targetCard} setTargetCard={setTargetCard} auctionCard={auctionCard}
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
                        <AucComponent auctionCard={auctionCard} aucBtnFlg={aucBtnFlg}/>
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
                        {selector.players.players.map((value) => (
                            <PlayerList key={value.playerId}>
                                <PlayerName><b>{value.playerName}</b></PlayerName>
                                <PlayerInfoIcon src={card} /><PlayerInfo>×{value.cardNum}　</PlayerInfo>
                                <PlayerInfoIcon src={coin} /> <PlayerInfo>{value.coin + ' ' + selector.msg.lang.COIN}</PlayerInfo>
                            </PlayerList>
                        ))}
                    </Grid>
                </Grid>
                <FinishModal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={finishFlg}
                >
                    <Fade in={finishFlg}>
                        <FinishMenu>
                            <RankingTitle align="center" elevation={0}>{selector.msg.lang.RANKING}</RankingTitle>
                            {selector.players.ranking && selector.players.ranking.map((value) => (
                                <div key={value.rank} align="center">
                                {value.rank === 1 ?
                                    <div>
                                        <Winner>{value.rank} : {value.playerName} </Winner>
                                        <WinnerInfoIcon src={coin} />
                                        <Winner>{value.coin + ' ' + selector.msg.lang.COIN}</Winner>
                                    </div>:
                                    <div>
                                        <Loser>{value.rank} : {value.playerName} </Loser>
                                        <LoserInfoIcon src={coin} />
                                        <Loser> {value.coin + ' ' + selector.msg.lang.COIN}</Loser>
                                    </div>
                                }    
                                </div>
                            ))}
                            <div align="center">
                                <FinishButton size="large" variant="contained" 
                                onClick={() => finishGame('finish')}>{selector.msg.lang.FINISH_BTN}</FinishButton>
                                <AgainButton size="large" variant="contained" 
                                onClick={() => finishGame('again')}>{selector.msg.lang.AGAIN_BTN}</AgainButton>
                            </div>
                        </FinishMenu>
                    </Fade>
                </FinishModal>
            </GameBack>
        </Typography>
    )
}

export default Game;