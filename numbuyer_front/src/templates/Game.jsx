import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFluctQueuesAction } from '../redux/game/actions';

import { useStyles, Back, TargetCard, CardTag, CardValue, GoalArea, GoalTag, GoalMessage, FinishModal, FinishMenu } from './theme';
import {
    useStylesMobile, TimeTagMobile, GoalMessageMobile, TargetCardMobile, CardTagMobile, CardValueMobile, TurnTagMobile, TurnValueMobile,
    FinishModalMobile, FinishMenuMobile, MessageBoxMobile, NaviMessageMobile, GoalTagMobile, WrapMessageMobile
} from './themeMobile';

import { Queue } from '../class/Queue';
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
import { grey } from '@mui/material/colors';
import { useMediaQuery } from "@mui/material";

import AblNavigationComponent from './components/AblNavigationComponent';
import Skeleton from '@mui/material/Skeleton';

import successAuction from '../assets/success_auction.png';
import { setPlayersAction } from '../redux/players/actions';

const Game = () => {
    const classes = useStyles();
    const mobileClasses = useStylesMobile();
    const selector = useSelector(state => state);
    const dispatch = useDispatch();

    const [fade, setFade] = React.useState(false); // フェードイン用フラグ
    const [targetCard, setTargetCard] = React.useState(selector.game.targetCard);
    const [auctionCards, setAuctionCards] = React.useState([selector.game.auctionCards]);
    const [aucBtnFlg, setAucBtnFlg] = React.useState(selector.game.aucBtnFlg);
    const [calcBtnFlg, setCalcBtnFlg] = React.useState(selector.game.calcBtnFlg);
    const [player, setPlayer] = React.useState(selector.players.player);
    const [myPlayer, setMyPlayer] = React.useState(selector.players.players.find((my) => {
        return my.playerId === player.playerId
    })); // プレイヤー一覧表示用
    const [otherPlayers, setOtherPlayers] = React.useState(selector.players.players.filter((other) => {
        return other.playerId !== player.playerId
    })); // プレイヤー一覧表示用
    const [roomId, setRoomId] = React.useState(selector.room.roomId);
    const [finishFlg, setFinishFlg] = React.useState(selector.game.finishFlg);
    const [turn, setTurn] = React.useState(selector.game.turn);
    const [message, setMessage] = React.useState(selector.game.message);
    const [messages, setMessages] = React.useState(selector.game.messages);
    const [ablMessages, setAblMessages] = React.useState(selector.game.ablMessages);
    

    const matches = useMediaQuery("(min-width:520px)");

    React.useEffect(() => {
        setPlayer(selector.players.player);
        setRoomId(selector.room.roomId);
        setMyPlayer(selector.players.players.find((my) => { return my.playerId === selector.players.player.playerId }));
        setOtherPlayers(selector.players.players.filter((other) => { return other.playerId !== selector.players.player.playerId }));
        setTurn(selector.game.turn);
        setMessage(selector.game.message);
        setMessages(selector.game.messages);
        setAblMessages(selector.game.ablMessages);
        setTargetCard(selector.game.targetCard);
        setAuctionCards(selector.game.auctionCards);
        setAucBtnFlg(selector.game.aucBtnFlg);
        setCalcBtnFlg(selector.game.calcBtnFlg);
        setFinishFlg(selector.game.finishFlg);
    }, [selector.players.player, selector.players.player.cards, selector.players.players, selector.room.roomId,
    selector.game.message, selector.game.messages, selector.game.ablMessages,
    selector.game.targetCard, selector.game.auctionCards, selector.game.turn,
    selector.game.aucBtnFlg, selector.game.calcBtnFlg, selector.game.finishFlg]);

    React.useEffect(() => {
        if (selector.game.phase === Constants.SHOW_TAR_PH) {
            setFade(false);
            setFade(true);
        }
    }, [selector.game.phase]);

    // アビリティメッセージ表示時間管理
    React.useEffect(() => {
        const interval = setInterval(() => {
            for (let a of ablMessages) {
                if (a.time > 0) {
                    a.time--;
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [ablMessages]);

    // 変動パラメータキューのセットと監視
    React.useEffect(() => {
        let fluctQueues = selector.game.fluctQueues;
        for(let p of selector.players.players) {
            fluctQueues.push(new Queue(p.playerId));
        }
        dispatch(setFluctQueuesAction(fluctQueues));

        const interval = setInterval(operateQueue, 3000);
    }, []);

    // キューのセット & 先頭を削除
    const operateQueue = () => {
        let mPlayer = selector.players.players.find((my) => {return my.playerId === player.playerId});
        let oPlayers = selector.players.players.filter((other) => {return other.playerId !== player.playerId});

        mPlayer.fluctCard = getFluctParam(myPlayer.playerId, Constants.FLUCT_CARD);
        mPlayer.fluctCoin = getFluctParam(myPlayer.playerId, Constants.FLUCT_COIN);
        setMyPlayer(mPlayer);
        console.log(myPlayer);

        for(let p of oPlayers) {
            console.log("プレイヤーID:" + p.playerId);
            p.fluctCard = getFluctParam(p.playerId, Constants.FLUCT_CARD);
            p.fluctCoin = getFluctParam(p.playerId, Constants.FLUCT_COIN);
            console.log(p);
        }
        setOtherPlayers(oPlayers);
    }

    // 該当プレイヤーの差分パラメータを取り出し
    const getFluctParam = (playerId, key) => {
        let fluctValue;
        let fluctParam = {code: '?', value: ''};

        if (selector.game.fluctQueues.length > 0) {
            let fq = selector.game.fluctQueues.find((f) => { return f.queue.playerId === playerId });

            switch(key) {
                case Constants.FLUCT_CARD:
                    fluctValue = fq.queue.fluctCards[0];
                    break;
                case Constants.FLUCT_COIN:
                    fluctValue = fq.queue.fluctCoins[0];
                    break;
                default:
                    break;
            }
            console.log("取り出します。");
            console.log(fluctValue);

            if (fluctValue) {
                fluctParam = {code: fluctValue.slice(0, 1), value: fluctValue};
                console.log("消します。");
                let deleteValue;
                switch(key) {
                    case Constants.FLUCT_CARD:
                        deleteValue = fq.dequeueCards();
                        break;
                    case Constants.FLUCT_COIN:
                        deleteValue = fq.dequeueCoins();
                        break;
                    default:
                        break;
                }
                console.log(deleteValue);
            }
        }

        return fluctParam;
    }

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            {matches ?
                <Back>
                    {selector.game.aucResult === Constants.SUCCESS &&
                        <Card className={classes.result_animation} sx={{ backgroundImage: `url(${successAuction})`, 'textShadow': '2px 4px 6px #000000', color: grey[50] }} >
                            {selector.msg.lang.SUCCESS_BID}
                        </Card>
                    }
                    {selector.game.calcResult === Constants.SUCCESS &&
                        <Card className={classes.result_animation}
                            sx={{
                                color: grey[50], background: 'linear-gradient(25deg, #1de9b6, #000000)', boxShadow: 6,
                                'textShadow': '2px 4px 6px #000000'
                            }}
                        >
                            {selector.msg.lang.SUCCESS}
                        </Card>
                    }
                    {selector.game.calcResult === Constants.FAILED &&
                        <Card className={classes.result_animation}
                            sx={{
                                color: grey[50], background: 'linear-gradient(25deg, #ff1744, #000000)', boxShadow: 6,
                                'textShadow': '2px 4px 6px #000000'
                            }}
                        >
                            {selector.msg.lang.FAILED}
                        </Card>
                    }
                    <Grid container>
                        <Grid item xs={1} />
                        <Grid item xs={8}>
                            <NavigationComponent background='linear-gradient(25deg, #9370db, #000000)' color={grey[50]} message={message} messages={messages} />
                            <WrapMessageMobile>
                            {(selector.game.highestBid > 0 && selector.game.phase === Constants.AUCTION_PH) &&
                                <AblNavigationComponent background='linear-gradient(25deg, #ffca28, #000000)' color={grey[50]}
                                    message={selector.msg.lang.AUC_HIGHEST_MSG1 + selector.game.highestBid + selector.msg.lang.AUC_HIGHEST_MSG2 + selector.game.highestName + selector.msg.lang.AUC_HIGHEST_MSG3} />
                            }
                            {ablMessages.length > 0 && ablMessages.filter((a) => a.time > 0).map((am, index) => (
                                <AblNavigationComponent key={index}
                                    background={am.bgColor} color={am.tagColor} message={am.message} effect={am.effect} />
                            ))}
                            </WrapMessageMobile>
                        </Grid>
                        <Grid item xs={3}>
                            <TimeComponent targetCard={targetCard} setTargetCard={setTargetCard} auctionCards={auctionCards}
                                roomId={roomId} playerId={player.playerId} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={1} />
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
                                                <AucComponent auctionCards={auctionCards} aucBtnFlg={aucBtnFlg} />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <UseAbilityComponent />
                                            </Grid>
                                        </Grid>
                                        :
                                        <AucComponent auctionCards={auctionCards} aucBtnFlg={aucBtnFlg} />
                                    }
                                </Grid>
                            </Grid>
                            <CalcComponent calcBtnFlg={calcBtnFlg} />
                        </Grid>
                        <Grid item xs={3}>
                            <GoalArea>
                                <GoalTag>{selector.msg.lang.WIN_CONDITIONS} :
                                    {selector.msg.lang.LANGUAGE === 'Japanese'
                                        ? <GoalMessage> {selector.game.goalCoin + selector.msg.lang.COIN + selector.msg.lang.WIN_MSG}</GoalMessage>
                                        : <GoalMessage> {selector.msg.lang.WIN_MSG + ' ' + selector.game.goalCoin + ' ' + selector.msg.lang.COIN}</GoalMessage>
                                    }
                                </GoalTag>
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
                            <FinishMenu sx={{ background: 'linear-gradient(25deg, #4682b4, #000000)' }}>
                                <RankingComponent bgImage={`url(${successAuction})`} />
                            </FinishMenu>
                        </Fade>
                    </FinishModal>
                </Back>
                :
                <div sx={{ 'overflow': 'hidden' }}>
                    {selector.game.aucResult === Constants.SUCCESS &&
                        <Card className={mobileClasses.result_animation_mobile} sx={{ backgroundImage: `url(${successAuction})`, 'textShadow': '2px 4px 6px #000000', color: grey[50], width: '100%' }}>
                            {selector.msg.lang.SUCCESS_BID}
                        </Card>
                    }
                    {selector.game.calcResult === Constants.SUCCESS &&
                        <Card className={mobileClasses.result_animation_mobile}
                            sx={{
                                color: grey[50], background: 'linear-gradient(25deg, #1de9b6, #000000)', boxShadow: 6,
                                'textShadow': '2px 4px 6px #000000'
                            }}
                        >
                            {selector.msg.lang.SUCCESS}
                        </Card>
                    }
                    {selector.game.calcResult === Constants.FAILED &&
                        <Card className={mobileClasses.result_animation_mobile}
                            sx={{
                                color: grey[50], background: 'linear-gradient(25deg, #ff1744, #000000)', boxShadow: 6,
                                'textShadow': '2px 4px 6px #000000'
                            }}
                        >
                            {selector.msg.lang.FAILED}
                        </Card>
                    }
                    <NavigationComponent background='linear-gradient(25deg, #9370db, #000000)' color={grey[50]} message={message} messages={messages} />
                    {((selector.game.highestBid <= 0 || selector.game.phase !== Constants.AUCTION_PH) && ablMessages.length <= 0) &&
                        <Skeleton variant="rect" width={'100%'} height={50} />
                    }
                    <Grid container>
                        {(selector.game.highestBid > 0 && selector.game.phase === Constants.AUCTION_PH) &&
                            <Grid item xs={4}>
                                <AblNavigationComponent background='linear-gradient(25deg, #ffca28, #000000)' color={grey[50]}
                                    message={selector.msg.lang.AUC_HIGHEST_MSG1 + selector.game.highestBid + selector.msg.lang.AUC_HIGHEST_MSG2 + selector.game.highestName + selector.msg.lang.AUC_HIGHEST_MSG3} />
                            </Grid>
                        }
                        {ablMessages.length > 0 && ablMessages.filter((a) => a.time > 0).map((am, index) => (
                            <Grid item xs={6}>
                                <AblNavigationComponent key={index}
                                    background={am.bgColor} color={am.tagColor} message={am.message} effect={am.effect} />
                            </Grid>
                        ))}
                    </Grid>
                    <GoalTagMobile>{selector.msg.lang.WIN_CONDITIONS} : </GoalTagMobile>
                    {selector.msg.lang.LANGUAGE === 'Japanese'
                        ? <GoalMessageMobile>{selector.game.goalCoin + selector.msg.lang.COIN + selector.msg.lang.WIN_MSG}</GoalMessageMobile>
                        : <GoalMessageMobile>{selector.msg.lang.WIN_MSG + ' ' + selector.game.goalCoin + ' ' + selector.msg.lang.COIN}</GoalMessageMobile>
                    }
                    <PlayerInfoComponent myPlayer={myPlayer} players={otherPlayers} />
                    <Grid container sx={{ marginBottom: '1%', height: '25%', display: 'flex', alignItems: 'center' }}>
                        <Grid item xs={3}>
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
                                        <CardTagMobile sx={{ fontSize: Constants.FONT_SIZES.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).fontSize }}>{selector.msg.lang.TARGET}</CardTagMobile>
                                        <CardValueMobile>{targetCard}</CardValueMobile>
                                    </TargetCardMobile>
                                </Slide>
                            }
                        </Grid>
                        <Grid item xs={5}>
                            {(player.abilities[0].trigger === Constants.ACT_TRG || (player.abilities[1].trigger === Constants.ACT_TRG)) &&
                                <UseAbilityComponent />
                            }
                        </Grid>
                        <Grid item xs={4}>
                            <TurnTagMobile>{selector.msg.lang.TURN} : <TurnValueMobile>{turn}</TurnValueMobile></TurnTagMobile>
                            <TimeComponent targetCard={targetCard} setTargetCard={setTargetCard} auctionCards={auctionCards}
                                roomId={roomId} playerId={player.playerId} />
                        </Grid>
                    </Grid>
                    <CalcComponent calcBtnFlg={calcBtnFlg} />
                    <AucComponent auctionCards={auctionCards} aucBtnFlg={aucBtnFlg} />
                    <FinishModalMobile
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={finishFlg}
                    >
                        <Fade in={finishFlg}>
                            <FinishMenuMobile sx={{ background: 'linear-gradient(25deg, #4682b4, #000000)' }}>
                                <RankingComponent bgImage={`url(${successAuction})`} />
                            </FinishMenuMobile>
                        </Fade>
                    </FinishModalMobile>
                </div>
            }
        </Typography>
    )
}

export default Game;