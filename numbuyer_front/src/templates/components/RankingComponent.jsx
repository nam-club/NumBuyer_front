import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { RankingTitle, Winner, WinnerInfoIcon, Loser, LoserInfoIcon, FinishButton, AgainButton} from '../theme';

import { CTX } from '../../Socket';
import { setRankingAction } from '../../redux/players/actions';
import { setFinishGameAction, setMessageAction } from '../../redux/game/actions';
import { setQuickAction } from '../../redux/room/actions';

import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import coin from '../../assets/coin.png';

const RankingComponent = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const { start } = React.useContext(CTX);

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
            <RankingTitle align="center" elevation={0}>{selector.msg.lang.RANKING}</RankingTitle>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {selector.players.ranking && selector.players.ranking.map((value) => (
                    <TableBody>
                    {value.rank === 1 ?
                        <TableRow
                        key={value.rank}
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
                        </TableRow>:
                        <TableRow
                        key={value.rank}
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
                    onClick={() => {
                    finishGame('finish');
                    dispatch(setQuickAction(false));
                }}>{selector.msg.lang.FINISH_BTN}
                </FinishButton>
                {!selector.room.isQuickMatch &&
                    <AgainButton size="large" variant="contained" 
                    onClick={() => finishGame('again')}>{selector.msg.lang.AGAIN_BTN}</AgainButton>
                }
            </div>
        </Typography>
    );
}

export default RankingComponent;