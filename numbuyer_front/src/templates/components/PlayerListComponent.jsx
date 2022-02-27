import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';
import { push } from 'connected-react-router';

import { useStyles, MenuCard, LobbyTitle, OwnerList, ParticipantList, OwnerIcon, StartButton, BackButton, RoomCodeTag } from '../theme';

import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';

const PlayerListComponent = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const { start } = React.useContext(CTX);
    const [owners, setOwners] = React.useState([]); // オーナー一覧
    const [members, setMembers] = React.useState([]); // オーナー以外のメンバー一覧

    React.useEffect(() => {
        setOwners(selector.players.players.filter((player) => { return player.isOwner }));
        setMembers(selector.players.players.filter((player) => { return !player.isOwner }));
    }, [selector.players.players]);

    return (
        <MenuCard>
            <LobbyTitle>{selector.msg.lang.LOBBY}</LobbyTitle>
            {owners &&
                owners.map((value) => (<OwnerList key={value.playerName}>{value.playerName} ({selector.msg.lang.OWNER})</OwnerList>))
            }
            {members &&
                members.map((value) => (<ParticipantList key={value.playerName}>{value.playerName}</ParticipantList>))
            }
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