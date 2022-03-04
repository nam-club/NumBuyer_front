import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';
import { push } from 'connected-react-router';

import { useStyles, MenuCard, LobbyTitle, ParticipantList, OwnerIcon, StartButton, BackButton, RoomCodeTag } from '../theme';

import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CopyToClipBoard from 'react-copy-to-clipboard';
import IconButton      from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const PlayerListComponent = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const { start } = React.useContext(CTX);
    const [owners, setOwners] = React.useState([]); // オーナー一覧
    const [members, setMembers] = React.useState([]); // オーナー以外のメンバー一覧
    const [openTip, setOpenTip] = React.useState(false);

    React.useEffect(() => {
        setOwners(selector.players.players.filter((player) => { return player.isOwner }));
        setMembers(selector.players.players.filter((player) => { return !player.isOwner }));
    }, [selector.players.players]);

    const handleCloseTip = () => {
        setOpenTip(false);
    };
    
    const handleClickButton = () => {
        setOpenTip(true);
    };

    return (
        <MenuCard>
            <LobbyTitle>{selector.msg.lang.LOBBY}</LobbyTitle>
            {owners &&
                owners.map((value) => (<ParticipantList key={value.playerName}>
                    {value.playerName}
                    <OwnerIcon />
                </ParticipantList>))
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
                    <Grid item xs={4} />
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
            <Grid container>
                <Grid item xs={4.6} />
                <Grid item xs={2.8}>
                    <RoomCodeTag>{selector.msg.lang.ROOM_ID + ' : ' + selector.room.roomId}</RoomCodeTag>
                </Grid>
                <Grid item xs={0.3}>
                    <CopyToClipBoard text={selector.room.roomId}>
                        <IconButton onClick={handleClickButton} sx={{paddingTop: '20%'}}>
                            <ContentCopyIcon />
                        </IconButton>     
                    </CopyToClipBoard>
                </Grid>
                <Grid item xs={5} />
            </Grid>
        </MenuCard>
    )
}

export default PlayerListComponent;