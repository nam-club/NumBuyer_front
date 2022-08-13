import React from 'react';
import { useSelector } from 'react-redux';

import { useStyles, GameBack, TargetCard, CardTag, CardValue, GoalArea, GoalTag, GoalMessage, FinishModal, FinishMenu } from './theme';
import { TimeTagMobile, GoalMessageMobile, TargetCardMobile } from './themeMobile';

import * as Constants from '../constants';
import TimeComponent from './components/TimeComponent';
import AucComponent from './components/AucComponent';
import CalcComponent from './components/CalcComponent';
import RankingComponent from './components/RankingComponent';
import NavigationComponent from './components/NavigationComponent';
import PlayerInfoComponent from './components/PlayerInfoComponent';
import UseAbilityComponent from './components/UseAbilityComponent';

import GlobalStyle from "../globalStyles";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';
import { blue, red, teal, amber, grey } from '@mui/material/colors';
import { useMediaQuery } from "@mui/material";

import AblNavigationComponent from './components/AblNavigationComponent';
import AucMobileComponent from './components/AucMobileComponent';

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
    const [ablMessages, setAblMessages] = React.useState(selector.game.ablMessages);

    const matches = useMediaQuery("(min-width:520px)");

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
        setAblMessages(selector.game.ablMessages);
        setTargetCard(selector.game.targetCard);
        setAuctionCards(selector.game.auctionCards);
        setAucBtnFlg(selector.game.aucBtnFlg);
        setCalcBtnFlg(selector.game.calcBtnFlg);
        setFinishFlg(selector.game.finishFlg);
    }, [selector.players.player, selector.players.player.cards, selector.players.players, selector.room.roomId,
        selector.game.message, selector.game.messages, selector.game.ablMessages, selector.game.targetCard, selector.game.auctionCards,
        selector.game.aucBtnFlg, selector.game.calcBtnFlg, selector.game.finishFlg]);

    React.useEffect(() => {
        if(selector.game.phase === Constants.SHOW_TAR_PH) {
            setFade(false);
            setFade(true);
        }
    }, [selector.game.phase]);

    // アビリティメッセージ表示時間管理
    React.useEffect(() => {
        const interval = setInterval(() => {
            for(let a of ablMessages) {
                if(a.time > 0) {
                    a.time--;
                }
                console.log(a.message + " " + a.time);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [ablMessages]);

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            {matches ? 
            <GameBack>
                {selector.game.aucResult === Constants.SUCCESS &&
                    <Card className={classes.result_animation} sx={{background: amber['A100'], color: grey[700]}} >
                        {selector.msg.lang.SUCCESS_BID}
                    </Card>
                }
                {selector.game.calcResult === Constants.SUCCESS &&
                    <Card className={classes.result_animation} sx={{background: teal['A100'], color: grey[700]}} >
                        {selector.msg.lang.SUCCESS}
                    </Card>
                }
                {selector.game.calcResult === Constants.FAILED &&
                    <Card className={classes.result_animation} sx={{background: red['A100'], color: grey[700]}}>
                        {selector.msg.lang.FAILED}
                    </Card>
                }
                <Grid container>
                    <Grid item xs={1} />
                    <Grid item xs={8}>
                        <NavigationComponent color={grey[50]} message={message} messages={messages} />
                        {(selector.game.highestBid > 0 && selector.game.phase === Constants.AUCTION_PH ) &&
                            <AblNavigationComponent background={amber[500]} color={grey[50]} 
                            message={selector.msg.lang.AUC_HIGHEST_MSG1 + selector.game.highestBid + selector.msg.lang.AUC_HIGHEST_MSG2 + selector.game.highestName + selector.msg.lang.AUC_HIGHEST_MSG3} />
                        }
                        {ablMessages.length > 0 && ablMessages.filter((a) => a.time > 0).map((am,index) => (
                            <div key={index}>
                                {am.type === Constants.BST_TP ?
                                    <AblNavigationComponent background={blue[300]} color={grey[50]} message={am.message} effect={am.effect} />
                                :
                                <div>
                                    {am.type === Constants.ATK_TP ?
                                        <AblNavigationComponent background={red[300]} color={grey[50]} message={am.message} effect={am.effect} />
                                    :
                                    <div>
                                        {am.type === Constants.RCV_TP ?
                                            <AblNavigationComponent background={teal[300]} color={grey[50]} message={am.message} effect={am.effect} />
                                        :
                                        <div>
                                            {am.type === Constants.JAM_TP ?
                                                <AblNavigationComponent background={amber[300]} color={grey[600]} message={am.message} effect={am.effect} />
                                            :
                                            <div>
                                                {am.type === Constants.CNF_TP ?
                                                    <AblNavigationComponent background={grey[700]} color={grey[50]} message={am.message} effect={am.effect} />
                                                :
                                                    <AblNavigationComponent background={grey[100]} color={grey[700]} message={am.message} effect={am.effect} />
                                                }
                                            </div>
                                            }
                                        </div>
                                        }
                                    </div>
                                    }
                                </div>
                                }
                            </div>
                        ))}
                    </Grid>
                    <Grid item xs={3}>
                        <TimeComponent targetCard={targetCard} setTargetCard={setTargetCard} auctionCards={auctionCards}
                         roomId={roomId} playerId={player.playerId}/>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={1}/>
                    <Grid item xs={8}>
                        <Grid container>
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
                            <Grid item xs={10}>
                                {(player.abilities[0].trigger === Constants.ACT_TRG) || (player.abilities[1].trigger === Constants.ACT_TRG) ?
                                    <Grid container>
                                        <Grid item xs={8}>
                                            <AucComponent auctionCards={auctionCards} aucBtnFlg={aucBtnFlg}/>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <UseAbilityComponent/>
                                        </Grid>
                                    </Grid>
                                :
                                    <AucComponent auctionCards={auctionCards} aucBtnFlg={aucBtnFlg}/>
                                }
                            </Grid>
                        </Grid>
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
            :
            <GameBack>
                {selector.game.aucResult === Constants.SUCCESS &&
                    <Card className={classes.result_animation} sx={{background: amber['A100'], color: grey[700]}} >
                        {selector.msg.lang.SUCCESS_BID}
                    </Card>
                }
                {selector.game.calcResult === Constants.SUCCESS &&
                    <Card className={classes.result_animation} sx={{background: teal['A100'], color: grey[700]}} >
                        {selector.msg.lang.SUCCESS}
                    </Card>
                }
                {selector.game.calcResult === Constants.FAILED &&
                    <Card className={classes.result_animation} sx={{background: red['A100'], color: grey[700]}}>
                        {selector.msg.lang.FAILED}
                    </Card>
                }
                <Grid container sx={{marginBottom: '5%'}}>
                    <Grid item xs={7}>
                        <NavigationComponent color={grey[50]} message={message} messages={messages} />
                        {(selector.game.highestBid > 0 && selector.game.phase === Constants.AUCTION_PH ) &&
                            <AblNavigationComponent background={amber[500]} color={grey[50]} 
                            message={selector.msg.lang.AUC_HIGHEST_MSG1 + selector.game.highestBid + selector.msg.lang.AUC_HIGHEST_MSG2 + selector.game.highestName + selector.msg.lang.AUC_HIGHEST_MSG3} />
                        }
                        {ablMessages.length > 0 && ablMessages.filter((a) => a.time > 0).map((am,index) => (
                            <div key={index}>
                                {am.type === Constants.BST_TP ?
                                    <AblNavigationComponent background={blue[300]} color={grey[50]} message={am.message} effect={am.effect} />
                                :
                                <div>
                                    {am.type === Constants.ATK_TP ?
                                        <AblNavigationComponent background={red[300]} color={grey[50]} message={am.message} effect={am.effect} />
                                    :
                                    <div>
                                        {am.type === Constants.RCV_TP ?
                                            <AblNavigationComponent background={teal[300]} color={grey[50]} message={am.message} effect={am.effect} />
                                        :
                                        <div>
                                            {am.type === Constants.JAM_TP ?
                                                <AblNavigationComponent background={amber[300]} color={grey[600]} message={am.message} effect={am.effect} />
                                            :
                                            <div>
                                                {am.type === Constants.CNF_TP ?
                                                    <AblNavigationComponent background={grey[700]} color={grey[50]} message={am.message} effect={am.effect} />
                                                :
                                                    <AblNavigationComponent background={grey[100]} color={grey[700]} message={am.message} effect={am.effect} />
                                                }
                                            </div>
                                            }
                                        </div>
                                        }
                                    </div>
                                    }
                                </div>
                                }
                            </div>
                        ))}
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container>
                            <Grid xs={2}>
                                <TimeTagMobile>{selector.msg.lang.TIME}</TimeTagMobile>
                            </Grid>
                            <Grid xs={10}>
                                <TimeComponent targetCard={targetCard} setTargetCard={setTargetCard} auctionCards={auctionCards}
                                roomId={roomId} playerId={player.playerId}/>
                            </Grid>
                        </Grid>
                        {selector.msg.lang.LANGUAGE === 'Japanese'
                            ? <GoalMessageMobile>{selector.game.goalCoin + selector.msg.lang.COIN + selector.msg.lang.WIN_MSG}</GoalMessageMobile>
                            : <GoalMessageMobile>{selector.msg.lang.WIN_MSG + ' ' + selector.game.goalCoin + ' ' + selector.msg.lang.COIN}</GoalMessageMobile>
                        }
                        <PlayerInfoComponent myPlayer={myPlayer} players={otherPlayers} />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
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
                                <TargetCardMobile>
                                    <CardTag>{selector.msg.lang.TARGET}</CardTag>
                                    <CardValue>{targetCard}</CardValue>
                                </TargetCardMobile>
                            </Slide>
                        }
                    </Grid>
                    <Grid item xs={8}>
                        <AucMobileComponent auctionCards={auctionCards}/>
                    </Grid>
                </Grid>
                <UseAbilityComponent/>
                <CalcComponent calcBtnFlg={calcBtnFlg}/>
                    <AucComponent auctionCards={auctionCards} aucBtnFlg={aucBtnFlg}/>
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
            }
        </Typography>
    )
}

export default Game;