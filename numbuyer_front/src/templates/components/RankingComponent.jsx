import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { RankingTitle, Winner, WinnerInfoIcon, Loser, LoserInfoIcon, FinishButton, AgainButton, InfoMsg } from '../theme';
import { ResultInfoIconMobile, RankingTitleMobile, FinishButtonMobile, AgainButtonMobile } from '../themeMobile';

import { CTX } from '../../Socket';
import { setRankingAction } from '../../redux/players/actions';
import { setFinishGameAction, setMessageAction } from '../../redux/game/actions';
import { setCpuAction, setQuickAction } from '../../redux/room/actions';

import * as Constants from '../../constants';


import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import Grid from '@mui/material/Grid';
import { grey } from '@mui/material/colors';
import { useMediaQuery } from "@mui/material";

import coin from '../../assets/coin.png';

const RankingComponent = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const { start } = React.useContext(CTX);
    const matches = useMediaQuery("(min-width:520px)");

    const [twitterMsg, setTwitterMsg] = React.useState("");

    React.useEffect(() => {
        setTwitterMsg(selector.msg.lang.TWITTER_MSG1 + selector.players.ranking.find((r) => { return r.playerId === selector.players.player.playerId }).rank + selector.msg.lang.TWITTER_MSG2);
    }, [selector.players.ranking, selector.players.player.playerId, selector.msg.lang.TWITTER_MSG1, selector.msg.lang.TWITTER_MSG2]);

    const finishGame = (mode) => {
        dispatch(setRankingAction([]));
        dispatch(setFinishGameAction(false));
        dispatch(setMessageAction(''));
        switch (mode) {
            case 'finish':
                dispatch(push('/'));
                break;
            case 'again':
                start({ roomId: selector.room.roomId, playerId: selector.players.player.playerId });
                break;
            default:
                break;
        }
    }

    return (
        <Typography component="div" align="center">
            {matches ?
                <div>
                    <RankingTitle sx={{ backgroundImage: props.bgImage }} align="center" elevation={0}>{selector.msg.lang.RANKING}</RankingTitle>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            {selector.players.ranking && selector.players.ranking.map((value) => (
                                <TableBody key={value.playerId}>
                                    {value.rank === 1 ?
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Winner>{value.rank}</Winner>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Winner>{value.playerName}</Winner>
                                            </TableCell>
                                            <TableCell align="left">
                                                <WinnerInfoIcon src={coin} />
                                                <Winner>{value.coin + ' ' + selector.msg.lang.COIN}</Winner>
                                            </TableCell>
                                        </TableRow> :
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Loser>{value.rank}</Loser>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Loser>{value.playerName}</Loser>
                                            </TableCell>
                                            <TableCell align="left">
                                                <LoserInfoIcon src={coin} />
                                                <Loser>{value.coin + ' ' + selector.msg.lang.COIN}</Loser>
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            ))}
                        </Table>
                    </TableContainer>
                    <div align="center">
                        <FinishButton size="large" variant="contained"
                            sx={[{
                                color: grey[50], background: 'linear-gradient(25deg, #da70d6, #000000)', boxShadow: 6,
                                'textShadow': '2px 4px 6px #000000'
                            },
                            { '&:hover': { background: 'linear-gradient(25deg, #d9add7, #000000)', 'textShadow': '2px 4px 6px #000000', opacity: 0.8 } }]}
                            onClick={() => {
                                finishGame('finish');
                                dispatch(setCpuAction(false));
                                dispatch(setQuickAction(false));
                            }}>{selector.msg.lang.FINISH_BTN}
                        </FinishButton>
                        {(!selector.room.isQuickMatch && Constants.PLAY_AGAIN_BTN_FLG) &&
                            <AgainButton size="large" variant="contained"
                                sx={[{
                                    color: grey[50], background: 'linear-gradient(25deg, #00bfff, #000000)', boxShadow: 6,
                                    'textShadow': '2px 4px 6px #000000'
                                },
                                { '&:hover': { background: 'linear-gradient(25deg, #80dfff, #000000)', 'textShadow': '2px 4px 6px #000000', opacity: 0.8 } }]}
                                onClick={() => finishGame('again')}>{selector.msg.lang.AGAIN_BTN}</AgainButton>
                        }
                    </div>
                    <InfoMsg sx={{ color: grey[50], marginTop: '5%' }}>{selector.msg.lang.SHARE_GAME}</InfoMsg>
                    <Grid container>
                        <Grid item xs={2} />
                        <Grid item xs={4}>
                            <Button
                                href={twitterMsg}
                                target="_blank"
                                rel="nofollow noopener noreferrer">
                                <TwitterIcon
                                    sx={{
                                        color: grey[50],
                                        fontSize: '3em',
                                        margin: 0,
                                    }} />
                            </Button>
                            <Typography sx={{ color: grey[50] }}>Twitter</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                href="http://www.facebook.com/share.php?u=https://numbuyer.nam-club.com/"
                                target="_blank"
                                rel="nofollow noopener noreferrer">
                                <FacebookIcon
                                    sx={{
                                        color: grey[50],
                                        fontSize: '3em',
                                        margin: 0,
                                    }} />
                            </Button>
                            <Typography sx={{ color: grey[50] }}>FaceBook</Typography>
                        </Grid>
                        <Grid item xs={2} />
                    </Grid>
                </div>
                :
                <div>
                    <RankingTitleMobile sx={{ backgroundImage: props.bgImage }} align="center" elevation={0}>{selector.msg.lang.RANKING}</RankingTitleMobile>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            {selector.players.ranking && selector.players.ranking.map((value) => (
                                <TableBody key={value.playerId}>
                                    {value.rank === 1 ?
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Winner>{value.rank}</Winner>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Winner>{value.playerName}</Winner>
                                            </TableCell>
                                            <TableCell align="left">
                                                <ResultInfoIconMobile src={coin} />
                                                <Winner>{value.coin + ' ' + selector.msg.lang.COIN}</Winner>
                                            </TableCell>
                                        </TableRow> :
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Loser>{value.rank}</Loser>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Loser>{value.playerName}</Loser>
                                            </TableCell>
                                            <TableCell align="left">
                                                <ResultInfoIconMobile src={coin} />
                                                <Loser>{value.coin + ' ' + selector.msg.lang.COIN}</Loser>
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            ))}
                        </Table>
                    </TableContainer>
                    <div align="center">
                        <FinishButtonMobile size="large" variant="contained"
                            sx={[{
                                color: grey[50], background: 'linear-gradient(25deg, #da70d6, #000000)', boxShadow: 6,
                                'textShadow': '2px 4px 6px #000000'
                            },
                            { '&:hover': { background: 'linear-gradient(25deg, #d9add7, #000000)', 'textShadow': '2px 4px 6px #000000', opacity: 0.8 } }]}
                            onClick={() => {
                                finishGame('finish');
                                dispatch(setCpuAction(false));
                                dispatch(setQuickAction(false));
                            }}>{selector.msg.lang.FINISH_BTN}
                        </FinishButtonMobile>
                        {(!selector.room.isQuickMatch && Constants.PLAY_AGAIN_BTN_FLG) &&
                            <AgainButtonMobile size="large" variant="contained"
                                sx={[{
                                    color: grey[50], background: 'linear-gradient(25deg, #00bfff, #000000)', boxShadow: 6,
                                    'textShadow': '2px 4px 6px #000000'
                                },
                                { '&:hover': { background: 'linear-gradient(25deg, #80dfff, #000000)', 'textShadow': '2px 4px 6px #000000', opacity: 0.8 } }]}
                                onClick={() => finishGame('again')}>{selector.msg.lang.AGAIN_BTN}</AgainButtonMobile>
                        }
                    </div>
                    <InfoMsg sx={{ color: grey[50], marginTop: '5%' }}>{selector.msg.lang.SHARE_GAME}</InfoMsg>
                    <Grid container>
                        <Grid item xs={2} />
                        <Grid item xs={4}>
                            <Button
                                href={twitterMsg}
                                target="_blank"
                                rel="nofollow noopener noreferrer">
                                <TwitterIcon
                                    sx={{
                                        color: grey[50],
                                        fontSize: '3em',
                                        margin: 0,
                                        boxShadow: 2,
                                        background: grey[600],
                                        '&:hover': {
                                            background: grey[500],
                                        },
                                    }} />
                            </Button>
                            <Typography sx={{ color: grey[50] }}>Twitter</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                href="http://www.facebook.com/share.php?u=https://numbuyer.nam-club.com/"
                                target="_blank"
                                rel="nofollow noopener noreferrer">
                                <FacebookIcon
                                    sx={{
                                        color: grey[50],
                                        fontSize: '3em',
                                        margin: 0,
                                        boxShadow: 2,
                                        background: grey[600],
                                        '&:hover': {
                                            background: grey[500],
                                        },
                                    }} />
                            </Button>
                            <Typography sx={{ color: grey[50] }}>FaceBook</Typography>
                        </Grid>
                        <Grid item xs={2} />
                    </Grid>
                </div>
            }
        </Typography >
    );
}

export default RankingComponent;