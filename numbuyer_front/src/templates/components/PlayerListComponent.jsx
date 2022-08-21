import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX, leaveLobby } from '../../Socket';

import { MenuCard, SettingIcon, ParticipantList, OwnerIcon, StartButton, BackButton, RoomCodeTag, MenuModal, TopMenu } from '../theme';
import { MenuCardMobile, LobbyTitleMobile, ParticipantListMobile, StartButtonMobile, BackButtonMobile, RoomCodeTagMobile } from '../themeMobile';

import * as Constants from '../../constants';
import NavigationComponent from './NavigationComponent';
import SettingComponent from './SettingComponent';

import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';
import CardActions from '@mui/material/CardActions';
import CopyToClipBoard from 'react-copy-to-clipboard';
import IconButton      from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { setQuickAction } from '../../redux/room/actions';
import { grey } from '@mui/material/colors';
import { setLeaveLobbyAction } from '../../redux/game/actions';
import { useMediaQuery } from "@mui/material";

const PlayerListComponent = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const { start } = React.useContext(CTX);
    const [owners, setOwners] = React.useState([]); // オーナー一覧
    const [members, setMembers] = React.useState([]); // オーナー以外のメンバー一覧
    const [settingOpen, setSettingOpen] = React.useState(false); // 設定ボタンのモーダル
    const [openTip, setOpenTip] = React.useState(false); // クリップボードコピー吹き出し

    const matches = useMediaQuery("(min-width:520px)");

    React.useEffect(() => {
        if(selector.players.players) {
            setOwners(selector.players.players.filter((player) => { return player.isOwner }));
            setMembers(selector.players.players.filter((player) => { return !player.isOwner }));
        }
    }, [selector.players.players]);

    // 設定モーダルを開く or 閉じる
    const handleSettingOpen = () => {
        setSettingOpen(!settingOpen);
    };

    // 設定モーダルを閉じる
    const handleSettingClose = () => {
        setSettingOpen(false);
    };

    // クリップボードコピー吹き出し閉じる
    const handleCloseTip = () => {
        setOpenTip(false);
    };
    
    // クリップボードコピー吹き出し開く
    const handleOpenTip = () => {
        setOpenTip(true);
    };

    return (
        <div>
        {matches ?
            <MenuCard>
                {selector.room.isQuickMatch &&
                <div>
                    {Constants.SETTING_BTN_FLG &&
                    <Grid container>
                        <Grid item xs={10} />
                        <Grid item xs={2}>
                            <IconButton>
                                <SettingIcon onClick={handleSettingOpen} sx={{color: grey[600]}}/>
                            </IconButton>
                        </Grid>
                    </Grid> 
                    }
                    <NavigationComponent color={grey[50]} message={selector.msg.lang.QUICK_MSG} messages={[]} />
                </div>
                }
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
                            onClick={async () => {
                                dispatch(setLeaveLobbyAction(true));
                                await leaveLobby({roomId: selector.room.roomId, playerId: selector.players.player.playerId});
                                dispatch(setQuickAction(false));
                            }}>{selector.msg.lang.BACK_BTN}</BackButton>
                        </Grid>
                        <Grid item xs={4} />
                        <Grid item xs={4}>
                        {(selector.players.player && selector.players.players && selector.players.player.isOwner &&
                        selector.players.players.length > 1) &&
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
                        <ClickAwayListener onClickAway={handleCloseTip}>
                            <div>
                            <Tooltip
                                arrow
                                PopperProps={{
                                disablePortal: true,
                                }}
                                onClose={handleCloseTip}
                                open={openTip}
                                disableFocusListener
                                disableHoverListener
                                title={selector.msg.lang.COPY}
                            >
                                <div>
                                <CopyToClipBoard text={selector.room.roomId}>
                                    <IconButton>
                                        <ContentCopyIcon onClick={handleOpenTip}/>
                                    </IconButton>     
                                </CopyToClipBoard>
                                </div>
                            </Tooltip>
                            </div>
                        </ClickAwayListener>
                    </Grid>
                    <Grid item xs={5} />
                </Grid>
            </MenuCard>
        :
            <MenuCardMobile>
                <LobbyTitleMobile>{selector.msg.lang.LOBBY}</LobbyTitleMobile>
                {selector.room.isQuickMatch && 
                    <NavigationComponent color={grey[50]} message={selector.msg.lang.QUICK_MSG} messages={[]} />
                }
                {owners &&
                    owners.map((value) => (<ParticipantListMobile key={value.playerName}>
                        {value.playerName}
                        <OwnerIcon />
                    </ParticipantListMobile>))
                }
                {members &&
                    members.map((value) => (<ParticipantListMobile key={value.playerName}>{value.playerName}</ParticipantListMobile>))
                }
                <CardActions>
                    {(selector.players.player && selector.players.players && selector.players.player.isOwner &&
                    selector.players.players.length > 1) &&
                        <StartButtonMobile size="large" variant="contained"
                        onClick={() => {
                            start({roomId: selector.room.roomId, playerId: selector.players.player.playerId})
                        }}>
                            {selector.msg.lang.START_BTN}
                        </StartButtonMobile>
                    }
                </CardActions>
                <CardActions>
                    <BackButtonMobile size="large" variant="contained"
                    onClick={async () => {
                        dispatch(setLeaveLobbyAction(true));
                        await leaveLobby({roomId: selector.room.roomId, playerId: selector.players.player.playerId});
                        dispatch(setQuickAction(false));
                    }}>
                        {selector.msg.lang.BACK_BTN}
                    </BackButtonMobile>
                </CardActions>
                <RoomCodeTagMobile>{selector.msg.lang.ROOM_ID + ' : ' + selector.room.roomId}</RoomCodeTagMobile>
                <ClickAwayListener onClickAway={handleCloseTip}>
                    <div>
                    <Tooltip
                        arrow
                        PopperProps={{
                        disablePortal: true,
                        }}
                        onClose={handleCloseTip}
                        open={openTip}
                        disableFocusListener
                        disableHoverListener
                        title={selector.msg.lang.COPY}
                    >
                        <span>
                        <CopyToClipBoard text={selector.room.roomId}>
                            <IconButton
                            sx={{color: grey[50], background: grey[600], marginTop: '6%', 
                            '&:hover': {
                                color: grey[50], background: grey[500]
                            }}}>
                                <ContentCopyIcon onClick={handleOpenTip}/>
                            </IconButton>     
                        </CopyToClipBoard>
                        </span>
                    </Tooltip>
                    </div>
                </ClickAwayListener>
            </MenuCardMobile>
        }
        {(!matches && Constants.SETTING_BTN_FLG) &&
            <IconButton
            sx={{color: grey[50], background: grey[600],
            '&:hover': {
                color: grey[50], background: grey[500]
            }}}>
                <SettingIcon onClick={handleSettingOpen} sx={{color: grey[50]}}/>
            </IconButton>
        }
        <MenuModal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={settingOpen}
            onClose={handleSettingClose}
            closeAfterTransition
        >
            <Fade in={settingOpen}>
                <TopMenu>
                    <SettingComponent/>
                </TopMenu>
            </Fade>
        </MenuModal>
        </div>
    )
}

export default PlayerListComponent;