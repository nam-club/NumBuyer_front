import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';
import { push } from 'connected-react-router';

import { useStyles, MenuCard, LobbyTitle, ParticipantList, StartButton, BackButton, RoomCodeTag } from '../theme';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const PlayerListComponent = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const { start } = React.useContext(CTX);

    return (
        <MenuCard>
            <LobbyTitle>{selector.msg.lang.LOBBY}</LobbyTitle>
            {selector.players.players &&
             selector.players.players.map((value) => (<ParticipantList key={value.playerName}>{value.playerName}</ParticipantList>))}
            <CardActions>
                <div style={{ flexGrow: 1 }}></div>
                <Grid container>
                    <Grid item xs={4}>
                        <BackButton size="large" variant="contained"
                        onClick={() => {
                            dispatch(push('/'));
                        }}>{selector.msg.lang.BACK_BTN}</BackButton>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                    {(selector.players.player && selector.players.player.isOwner) &&
                        <StartButton size="large" variant="contained"
                        onClick={() => {
                            start({roomId: selector.room.roomId, playerId: selector.players.player.playerId})
                        }}>{selector.msg.lang.START_BTN}</StartButton>
                    }
                    </Grid>
                </Grid>
            </CardActions>
            <RoomCodeTag>{selector.msg.lang.ROOM_ID + ' : ' + selector.room.roomId}</RoomCodeTag>
        </MenuCard>
    )
}

export default PlayerListComponent;