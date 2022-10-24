import React from 'react';

import {
    MainLogo, MainTitle, Back, MenuCard, InputField, MatchButton, FriendModal, FriendMenu,
    CreateButton, JoinButton, ErrorMessage, InfoMsg, InfoBoldMsg, VerMsg,
    LangIcon, TutorialIcon, MenuModal, TopMenu, AbilityModal, ConfirmButton, AbilityTag
} from './theme';
import {
    MainLogoMobile, MainTitleMobile, BackMobile, LangButtonMobile, MenuCardMobile, InfoMsgMobile,
    ErrorMessageMobile, MatchButtonMobile, FriendMenuMobile, VerMsgMobile,
    ConfirmButtonMobile, CreateButtonMobile, JoinButtonMobile, AbilityTagMobile
} from './themeMobile';

import * as Constants from '../constants';
import * as ConstantsMsg from '../constantsMsg';

import { aggregate, CTX } from '../Socket';

import { useDispatch, useSelector } from 'react-redux';

import { setPlayerNameAction } from '../redux/players/actions'
import { setRoomAction, setCpuAction, setQuickAction } from '../redux/room/actions';
import { setLangAction, setValidAction, setErrMsgAction, setErrMsgVarsAction } from '../redux/msg/actions';

import TutorialComponent from './components/TutorialComponent';
import NavigationComponent from './components/NavigationComponent';
import SelectAbilityComponent from './components/SelectAbilityComponent';
import LangComponent from './components/LangComponent';

import GlobalStyle from "../globalStyles";
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { grey, amber, blue, teal, red } from '@mui/material/colors';
import { useMediaQuery } from "@mui/material";

import logo from '../assets/logo.png';
import title from '../assets/title.png';
import quickImage from '../assets/quickImage.png';
import friendsImage from '../assets/friendsImage.png';
import cpuImage from '../assets/cpuImage.png';
import navigation from '../assets/navigation.png';

const Top = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const { joinCpuMatch, joinQuickMatch, createMatch, joinFriendMatch } = React.useContext(CTX);

    const [name, setName] = React.useState('');
    const [roomId, setRoomId] = React.useState('');
    const [errMsg, setErrMsg] = React.useState('');
    const [roomCount, setRoomCount] = React.useState(selector.room.totalRoomCount);
    const [qmCount, setQmCount] = React.useState(selector.room.availableQMCount);
    const [langOpen, setLangOpen] = React.useState(false); // 言語設定のモーダル
    const [tutorialOpen, setTutorialOpen] = React.useState(false); // チュートリアルのモーダル
    const [abilityOpen, setAbilityOpen] = React.useState(false); // アビリティ選択のモーダル
    const [friendOpen, setFriendOpen] = React.useState(false); // フレンドマッチのモーダル

    // アビリティ
    const [bstAbilities] = React.useState(Constants.BST_ABILITIES);
    const [atkAbilities] = React.useState(Constants.ATK_ABILITIES);
    const [rcvAbilities] = React.useState(Constants.RCV_ABILITIES);
    const [jamAbilities] = React.useState(Constants.JAM_ABILITIES);
    const [cnfAbilities] = React.useState(Constants.CNF_ABILITIES);

    const matches = useMediaQuery("(min-width:520px)");

    /** 言語を自動設定 */
    const language = window.navigator.language;
    React.useEffect(() => {
        switch (language) {
            case Constants.ENGLISH:
                dispatch(setLangAction(ConstantsMsg.English));
                break;
            case Constants.JAPANESE:
                dispatch(setLangAction(ConstantsMsg.Japanese));
                break;
            case Constants.CHINESE:
                dispatch(setLangAction(ConstantsMsg.Chinese));
                break;
            default:
                break;
        }
    }, []);

    /** 強制的に再レンダリングさせる */
    const useForceUpdate = () => {
        const [, forceUpdate] = React.useState(undefined);
        return React.useCallback(() => {
            forceUpdate((s) => !s);
        }, []);
    };
    const forceUpdate = useForceUpdate();

    React.useEffect(() => {
        console.log(selector.room.totalRoomCount)
        console.log(selector.room.availableQMCount)

        setRoomCount(selector.room.totalRoomCount);
        setQmCount(selector.room.availableQMCount);
    }, [selector.room.totalRoomCount, selector.room.availableQMCount]);

    React.useEffect(() => {
        setErrMsg(selector.msg.errMsg);
    }, [selector.msg.errMsg]);

    // 言語設定を開く or 閉じる
    const handleLangOpen = () => {
        setLangOpen(!langOpen);
    };

    // 言語設定を閉じる
    const handleLangClose = () => {
        setLangOpen(false);
    };

    // チュートリアルを開く or 閉じる
    const handleTutorialOpen = () => {
        setTutorialOpen(!tutorialOpen);
    };

    // チュートリアルを閉じる
    const handleTutorialClose = () => {
        setTutorialOpen(false);
    };

    // アビリティ選択モーダルを開く
    const handleAbilityOpen = () => {
        if (name !== '' && !name.match(Constants.NAME_EXP) && name.length <= 15) {
            setAbilityOpen(true);
        } else {
            dispatch(setValidAction({ validFlg: true }));
            if (name !== '') {
                dispatch(setErrMsgAction({ errMsg: selector.msg.lang.SYMBOL_ERR }));
                dispatch(setErrMsgVarsAction([
                    ConstantsMsg.English.SYMBOL_ERR,
                    ConstantsMsg.Japanese.SYMBOL_ERR,
                    ConstantsMsg.Chinese.SYMBOL_ERR
                ]));
            } else {
                dispatch(setErrMsgAction({ errMsg: selector.msg.lang.NULL_NAME_ERR }));
                dispatch(setErrMsgVarsAction([
                    ConstantsMsg.English.NULL_NAME_ERR,
                    ConstantsMsg.Japanese.NULL_NAME_ERR,
                    ConstantsMsg.Chinese.NULL_NAME_ERR
                ]));
            }
        }
    };

    // アビリティ選択モーダルを閉じる
    const handleAbilityClose = () => {
        setAbilityOpen(false);
    };

    // アビリティを確定する
    const confirmAbilities = () => {
        if (selector.players.player.abilities.length >= 2) {
            if (selector.room.isQuickMatch) {
                joinQuickMatch({ playerName: name, abilityIds: selector.players.player.abilities });
            } else if (selector.room.isCpuMatch) {
                joinCpuMatch({ playerName: name, abilityIds: selector.players.player.abilities });
            } else {
                setFriendOpen(true);
            }
            handleAbilityClose();
            dispatch(setValidAction({ validFlg: false }));
        } else {
            dispatch(setValidAction({ validFlg: true }));
            dispatch(setErrMsgAction({ errMsg: selector.msg.lang.ABILITY_ERR }));
            dispatch(setErrMsgVarsAction([
                ConstantsMsg.English.ABILITY_ERR,
                ConstantsMsg.Japanese.ABILITY_ERR,
                ConstantsMsg.Chinese.ABILITY_ERR
            ]));
        }
    };

    // フレンドマッチ用モーダルを閉じる
    const handleFriendClose = () => {
        setFriendOpen(false);
    };

    // プレイヤー名の入力
    const doChange = (e) => {
        if (!e.target.value.match(Constants.NAME_EXP) && e.target.value.length <= 15) {
            setName(e.target.value);
        }
        if (e.target.value !== '' && !e.target.value.match(Constants.NAME_EXP)) {
            dispatch(setValidAction({ validFlg: false }));
        } else {
            dispatch(setValidAction({ validFlg: true }));
            if (e.target.value !== '') {
                // 禁止文字を入力
                if (e.target.value.match(Constants.NAME_EXP)) {
                    dispatch(setErrMsgAction({ errMsg: selector.msg.lang.SYMBOL_ERR }));
                    dispatch(setErrMsgVarsAction([
                        ConstantsMsg.English.SYMBOL_ERR,
                        ConstantsMsg.Japanese.SYMBOL_ERR,
                        ConstantsMsg.Chinese.SYMBOL_ERR
                    ]));
                    // 15文字より多い
                } else if (e.target.value.length > 15) {
                    dispatch(setErrMsgAction({ errMsg: selector.msg.lang.LENGTH_NAME_ERR }));
                    dispatch(setErrMsgVarsAction([
                        ConstantsMsg.English.LENGTH_NAME_ERR,
                        ConstantsMsg.Japanese.LENGTH_NAME_ERR,
                        ConstantsMsg.Chinese.LENGTH_NAME_ERR
                    ]));
                }
            } else {
                dispatch(setErrMsgAction({ errMsg: selector.msg.lang.NULL_NAME_ERR }));
                dispatch(setErrMsgVarsAction([
                    ConstantsMsg.English.NULL_NAME_ERR,
                    ConstantsMsg.Japanese.NULL_NAME_ERR,
                    ConstantsMsg.Chinese.NULL_NAME_ERR
                ]));
            }
        }
    }

    // ルームID入力
    const roomIdChange = (e) => {
        if (e.target.value.match(Constants.BID_EXP) && e.target.value.length <= 10) {
            setRoomId(e.target.value);
        }
        if (e.target.value !== '' && e.target.value.match(Constants.BID_EXP)) {
            dispatch(setValidAction({ validFlg: false }));
        } else {
            dispatch(setValidAction({ validFlg: true }));
            if (e.target.value !== '') {
                dispatch(setErrMsgAction({ errMsg: selector.msg.lang.NUM_ERR }));
                dispatch(setErrMsgVarsAction([
                    ConstantsMsg.English.NUM_ERR,
                    ConstantsMsg.Japanese.NUM_ERR,
                    ConstantsMsg.Chinese.NUM_ERR
                ]));
            } else {
                dispatch(setErrMsgAction({ errMsg: selector.msg.lang.NULL_ROOM_ID_ERR }));
                dispatch(setErrMsgVarsAction([
                    ConstantsMsg.English.NULL_ROOM_ID_ERR,
                    ConstantsMsg.Japanese.NULL_ROOM_ID_ERR,
                    ConstantsMsg.Chinese.NULL_ROOM_ID_ERR
                ]));
            }
        }
    }

    // マッチ
    const clickMatch = async (mode) => {
        if (name !== '' && !name.match(Constants.NAME_EXP) && name.length <= 15) {
            dispatch(setValidAction({ validFlg: false }));
            dispatch(setPlayerNameAction(name));
            switch (mode) {
                case Constants.CPU_MATCH:
                    console.log("SINGLE PLAY")
                    await dispatch(setCpuAction(true));
                    dispatch(setQuickAction(false));
                    break;
                case Constants.QUICK_MATCH:
                    await dispatch(setCpuAction(false));
                    dispatch(setQuickAction(true));
                    break;
            }
            handleAbilityOpen();
        } else {
            dispatch(setValidAction({ validFlg: true }));
            if (name !== '') {
                dispatch(setErrMsgAction({ errMsg: selector.msg.lang.SYMBOL_ERR }));
                dispatch(setErrMsgVarsAction([
                    ConstantsMsg.English.SYMBOL_ERR,
                    ConstantsMsg.Japanese.SYMBOL_ERR,
                    ConstantsMsg.Chinese.SYMBOL_ERR
                ]));
            } else {
                dispatch(setErrMsgAction({ errMsg: selector.msg.lang.NULL_NAME_ERR }));
                dispatch(setErrMsgVarsAction([
                    ConstantsMsg.English.NULL_NAME_ERR,
                    ConstantsMsg.Japanese.NULL_NAME_ERR,
                    ConstantsMsg.Chinese.NULL_NAME_ERR
                ]));
            }
        }
    }

    // ジョイン
    const clickJoin = () => {
        // ルームIDが未入力
        if (roomId === '') {
            dispatch(setValidAction({ validFlg: true }));
            dispatch(setErrMsgAction({ errMsg: selector.msg.lang.NULL_ROOM_ID_ERR }));
            dispatch(setErrMsgVarsAction([
                ConstantsMsg.English.NULL_ROOM_ID_ERR,
                ConstantsMsg.Japanese.NULL_ROOM_ID_ERR,
                ConstantsMsg.Chinese.NULL_ROOM_ID_ERR
            ]));
            // ルームIDが数字以外
        } else if (!roomId.match(Constants.BID_EXP)) {
            dispatch(setValidAction({ validFlg: true }));
            dispatch(setErrMsgAction({ errMsg: selector.msg.lang.NUM_ERR }));
            dispatch(setErrMsgVarsAction([
                ConstantsMsg.English.NUM_ERR,
                ConstantsMsg.Japanese.NUM_ERR,
                ConstantsMsg.Chinese.NUM_ERR
            ]));
            // ルームIDが10文字以外
        } else if (roomId.length !== 10) {
            dispatch(setValidAction({ validFlg: true }));
            dispatch(setErrMsgAction({ errMsg: selector.msg.lang.LENGTH_ROOM_ID_ERR }));
            dispatch(setErrMsgVarsAction([
                ConstantsMsg.English.LENGTH_ROOM_ID_ERR,
                ConstantsMsg.Japanese.LENGTH_ROOM_ID_ERR,
                ConstantsMsg.Chinese.LENGTH_ROOM_ID_ERR
            ]));
        } else {
            dispatch(setCpuAction(false));
            dispatch(setQuickAction(false));
            dispatch(setValidAction({ validFlg: false }));
            dispatch(setRoomAction({ roomId: roomId }));
            dispatch(setPlayerNameAction(name));
            joinFriendMatch({ playerName: name, roomId: roomId, abilityIds: selector.players.player.abilities });
        }
    }

    // 言語選択
    const changeLang = (value) => {
        switch (value) {
            case ConstantsMsg.English.LANGUAGE:
                dispatch(setLangAction(ConstantsMsg.English));
                setErrMsg(selector.msg.errMsgVars[0]);
                break;
            case ConstantsMsg.Japanese.LANGUAGE:
                dispatch(setLangAction(ConstantsMsg.Japanese));
                setErrMsg(selector.msg.errMsgVars[1]);
                break;
            case ConstantsMsg.Chinese.LANGUAGE:
                dispatch(setLangAction(ConstantsMsg.Chinese));
                setErrMsg(selector.msg.errMsgVars[2]);
                break;
            default:
                break;
        }
        forceUpdate()
    };

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            {matches ?
                <>
                    <Back>
                        <Grid container>
                            <Grid item xs={8} />
                            <Grid item xs={4}>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <div>
                                        <Button onClick={handleLangOpen}>
                                            <LangIcon />
                                        </Button>
                                        <Typography sx={{ color: grey[50] }}>{selector.msg.lang.LANG}</Typography>
                                    </div>
                                    <div>
                                        <Button onClick={handleTutorialOpen}>
                                            <TutorialIcon />
                                        </Button>
                                        <Typography sx={{ color: grey[50] }}>{selector.msg.lang.TUTORIAL}</Typography>
                                    </div>
                                </Box>
                            </Grid>
                        </Grid>
                        <MenuModal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={langOpen}
                            onClose={handleLangClose}
                            closeAfterTransition
                        >
                            <Fade in={langOpen}>
                                <TopMenu sx={{ fontSize: '3em', width: '30%' }}>
                                    <LangComponent changeLang={changeLang} />
                                </TopMenu>
                            </Fade>
                        </MenuModal>
                        <MenuModal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={tutorialOpen}
                            onClose={handleTutorialClose}
                            closeAfterTransition
                        >
                            <Fade in={tutorialOpen}>
                                <TopMenu>
                                    <TutorialComponent />
                                </TopMenu>
                            </Fade>
                        </MenuModal>
                        <Grid container>
                            <Grid item xs={3} />
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item xs={2}>
                                        <MainLogo src={logo} />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <MainTitle src={title} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <VerMsg sx={{ color: grey[50], fontSize: '1.5em' }}>( {Constants.VERSION} )</VerMsg>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3} />
                        </Grid>
                        <MenuCard>
                            <CardContent>
                                <InputField variant="standard" label={selector.msg.lang.PLAYER_NAME} value={name}
                                    inputProps={{ style: { fontSize: '3em', color: grey[600], marginTop: '2%', marginBottom: '-4%' } }}
                                    InputLabelProps={{ style: { fontSize: '3em' } }}
                                    onChange={doChange} />
                                {selector.msg.validFlg &&
                                    <ErrorMessage>{errMsg}</ErrorMessage>
                                }
                            </CardContent>
                            <CardActions>
                                <Grid item xs={4}>
                                    <MatchButton size="large" variant="contained"
                                        sx={[{
                                            color: grey[50], backgroundImage: `url(${quickImage})`, boxShadow: 6,
                                            'textShadow': '2px 4px 6px #000000'
                                        },
                                        { '&:hover': { backgroundImage: `url(${quickImage})`, 'textShadow': '2px 4px 6px #000000', opacity: 0.8 } }]}
                                        onClick={() => { clickMatch(Constants.QUICK_MATCH) }}>
                                        <span>{selector.msg.lang.QUICK_MATCH}</span>
                                    </MatchButton>
                                </Grid>
                                <Grid item xs={4}>
                                    <MatchButton size="large" variant="contained"
                                        sx={[{
                                            color: grey[50], backgroundImage: `url(${friendsImage})`, boxShadow: 6,
                                            'textShadow': '2px 4px 6px #000000'
                                        },
                                        { '&:hover': { backgroundImage: `url(${friendsImage})`, 'textShadow': '2px 4px 6px #000000', opacity: 0.8 } }]}
                                        onClick={handleAbilityOpen}>{selector.msg.lang.FRIEND_MATCH}</MatchButton>
                                </Grid>
                                <Grid item xs={4}>
                                    <MatchButton size="large" variant="contained"
                                        sx={[{
                                            color: grey[50], backgroundImage: `url(${cpuImage})`, boxShadow: 6,
                                            'textShadow': '2px 4px 6px #000000'
                                        },
                                        { '&:hover': { backgroundImage: `url(${cpuImage})`, 'textShadow': '2px 4px 6px #000000', opacity: 0.8 } }]}
                                        onClick={() => { clickMatch(Constants.CPU_MATCH) }}>
                                        <span>{selector.msg.lang.CPU_MATCH}</span>
                                    </MatchButton>
                                </Grid>
                            </CardActions>
                            <InfoMsg>
                                {selector.msg.lang.TOTAL_ROOM_COUNT + ' : '}
                                <InfoBoldMsg>{selector.room.totalRoomCount}</InfoBoldMsg>
                            </InfoMsg>
                            <InfoMsg>
                                {selector.msg.lang.AVAILABLE_QM_COUNT + ' : '}
                                <InfoBoldMsg>{selector.room.availableQMCount}</InfoBoldMsg>
                            </InfoMsg>
                            <FriendModal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={friendOpen}
                                onClose={handleFriendClose}
                                closeAfterTransition
                            >
                                <Fade in={friendOpen}>
                                    <FriendMenu>
                                        <Typography component="div" align="center">
                                            {selector.msg.validFlg &&
                                                <ErrorMessage>{errMsg}</ErrorMessage>
                                            }
                                            <CreateButton size="large" variant="contained"
                                                onClick={() => {
                                                    dispatch(setValidAction({ validFlg: false }));
                                                    dispatch(setRoomAction({ roomId: roomId }));
                                                    dispatch(setPlayerNameAction(name));
                                                    createMatch({ playerName: name, roomId: roomId, abilityIds: selector.players.player.abilities });
                                                }}>{selector.msg.lang.CREATE_BTN}</CreateButton>
                                        </Typography>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <InputField variant="standard" label={selector.msg.lang.ROOM_ID} value={roomId}
                                                    inputProps={{ style: { fontSize: '3em', color: grey[600], marginTop: '2%' } }}
                                                    InputLabelProps={{ style: { fontSize: '3em' } }}
                                                    onChange={roomIdChange} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <JoinButton size="large" variant="contained"
                                                    onClick={() => { clickJoin(); }}>{selector.msg.lang.JOIN_BTN}</JoinButton>
                                            </Grid>
                                        </Grid>
                                    </FriendMenu>
                                </Fade>
                            </FriendModal>
                            <AbilityModal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={abilityOpen}
                                onClose={handleAbilityClose}
                                closeAfterTransition
                            >
                                <Fade in={abilityOpen}>
                                    <TopMenu>
                                        <Typography component="div" align="center">
                                            <NavigationComponent backgroundImage={`url(${navigation})`} message={selector.msg.lang.ABILITY} color={grey[50]} messages={[]} />
                                            <Grid container>
                                                <Grid item xs={1} />
                                                <Grid item xs={2}>
                                                    <SelectAbilityComponent background={blue[300]} color={grey[50]}
                                                        fontSize="1em" naviFontSize="1.5em"
                                                        type={selector.msg.lang.BST_TYPE} abilities={bstAbilities} update={forceUpdate} />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <SelectAbilityComponent background={red[300]} color={grey[50]}
                                                        fontSize="1em" naviFontSize="1.5em"
                                                        type={selector.msg.lang.ATK_TYPE} abilities={atkAbilities} update={forceUpdate} />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <SelectAbilityComponent background={teal[300]} color={grey[50]}
                                                        fontSize="1em" naviFontSize="1.5em"
                                                        type={selector.msg.lang.RCV_TYPE} abilities={rcvAbilities} update={forceUpdate} />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <SelectAbilityComponent background={amber[300]} color={grey[50]}
                                                        fontSize="1em" naviFontSize="1.5em"
                                                        type={selector.msg.lang.JAM_TYPE} abilities={jamAbilities} update={forceUpdate} />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <SelectAbilityComponent background={grey[700]} color={grey[50]}
                                                        fontSize="1em" naviFontSize="1.5em"
                                                        type={selector.msg.lang.CNF_TYPE} abilities={cnfAbilities} update={forceUpdate} />
                                                </Grid>
                                                <Grid item xs={1} />
                                            </Grid>
                                            {selector.msg.validFlg &&
                                                <ErrorMessage>{errMsg}</ErrorMessage>
                                            }
                                            <ConfirmButton size="large" variant="contained" onClick={() => confirmAbilities()}>
                                                {selector.msg.lang.CONFIRM_BTN}
                                            </ConfirmButton>
                                            <AbilityTag>{selector.msg.lang.ABILITY_EXP1}</AbilityTag>
                                            <AbilityTag>{selector.msg.lang.ABILITY_EXP2}</AbilityTag>
                                        </Typography>
                                    </TopMenu>
                                </Fade>
                            </AbilityModal>
                        </MenuCard>
                    </Back>
                </>
                :
                <>
                    <BackMobile>
                        <div><MainLogoMobile src={logo} /></div>
                        <Grid container>
                            <Grid item xs={2} />
                            <Grid item xs={8}>
                                <MainTitleMobile src={title} />
                            </Grid>
                            <Grid item xs={2}>
                                <VerMsgMobile sx={{ color: grey[50], fontSize: '0.75em' }}>( {Constants.VERSION} )</VerMsgMobile>
                            </Grid>
                        </Grid>
                        <MenuCardMobile>
                            <CardContent>
                                <InputField variant="standard" label={selector.msg.lang.PLAYER_NAME} value={name}
                                    sx={{ margin: '0 10%' }}
                                    inputProps={{ style: { fontSize: '2em', color: grey[600], marginTop: '2%', marginBottom: '-4%' } }}
                                    InputLabelProps={{ style: { fontSize: '2em' } }}
                                    onChange={doChange} />
                            </CardContent>
                            {selector.msg.validFlg &&
                                <ErrorMessageMobile>{errMsg}</ErrorMessageMobile>
                            }
                            {selector.msg.lang === ConstantsMsg.English ?
                                <div>
                                    <CardActions>
                                        <MatchButtonMobile size="large" variant="contained"
                                            sx={[{
                                                color: grey[50], backgroundImage: `url(${quickImage})`, boxShadow: 6,
                                                'textShadow': '2px 4px 6px #000000'
                                            },
                                            { '&:hover': { backgroundImage: `url(${quickImage})`, 'textShadow': '2px 4px 6px #000000', opacity: 0.8 } }]}
                                            onClick={() => { clickMatch(Constants.QUICK_MATCH) }}>{selector.msg.lang.QUICK_MATCH}</MatchButtonMobile>
                                    </CardActions>
                                    <CardActions>
                                        <MatchButtonMobile size="large" variant="contained"
                                            sx={[{
                                                color: grey[50], backgroundImage: `url(${friendsImage})`, boxShadow: 6,
                                                'textShadow': '2px 4px 6px #000000'
                                            },
                                            { '&:hover': { backgroundImage: `url(${friendsImage})`, 'textShadow': '2px 4px 6px #000000', opacity: 0.8 } }]}
                                            onClick={handleAbilityOpen}>{selector.msg.lang.FRIEND_MATCH}</MatchButtonMobile>
                                    </CardActions>
                                    <CardActions>
                                        <MatchButtonMobile size="large" variant="contained"
                                            sx={[{
                                                color: grey[50], backgroundImage: `url(${cpuImage})`, boxShadow: 6,
                                                'textShadow': '2px 4px 6px #000000'
                                            },
                                            { '&:hover': { backgroundImage: `url(${cpuImage})`, 'textShadow': '2px 4px 6px #000000', opacity: 0.8 } }]}
                                            onClick={() => { clickMatch(Constants.CPU_MATCH) }}>{selector.msg.lang.CPU_MATCH}</MatchButtonMobile>
                                    </CardActions>
                                </div>
                                :
                                <div>
                                    <CardActions>
                                        <MatchButtonMobile size="large" variant="contained"
                                            sx={[{
                                                color: grey[50], backgroundImage: `url(${quickImage})`, boxShadow: 6,
                                                'textShadow': '2px 4px 6px #000000', fontSize: '1.5em', padding: '5.5%'
                                            },
                                            { '&:hover': { backgroundImage: `url(${quickImage})`, 'textShadow': '2px 4px 6px #000000', opacity: 0.8 } }]}
                                            onClick={() => { clickMatch(Constants.QUICK_MATCH) }}>{selector.msg.lang.QUICK_MATCH}</MatchButtonMobile>
                                    </CardActions>
                                    <CardActions>
                                        <MatchButtonMobile size="large" variant="contained"
                                            sx={[{
                                                color: grey[50], backgroundImage: `url(${friendsImage})`, boxShadow: 6,
                                                'textShadow': '2px 4px 6px #000000', fontSize: '1.5em', padding: '5.5%'
                                            },
                                            { '&:hover': { backgroundImage: `url(${friendsImage})`, 'textShadow': '2px 4px 6px #000000', opacity: 0.8 } }]}
                                            onClick={handleAbilityOpen}>{selector.msg.lang.FRIEND_MATCH}</MatchButtonMobile>
                                    </CardActions>
                                    <CardActions>
                                        <MatchButtonMobile size="large" variant="contained"
                                            sx={[{
                                                color: grey[50], backgroundImage: `url(${cpuImage})`, boxShadow: 6,
                                                'textShadow': '2px 4px 6px #000000', fontSize: '1.5em', padding: '5.5%'
                                            },
                                            { '&:hover': { backgroundImage: `url(${cpuImage})`, 'textShadow': '2px 4px 6px #000000', opacity: 0.8 } }]}
                                            onClick={() => { clickMatch(Constants.CPU_MATCH) }}>{selector.msg.lang.CPU_MATCH}</MatchButtonMobile>
                                    </CardActions>
                                </div>
                            }
                            <InfoMsgMobile>
                                {selector.msg.lang.TOTAL_ROOM_COUNT + ' : '}
                                <InfoBoldMsg>{selector.room.totalRoomCount}</InfoBoldMsg>
                            </InfoMsgMobile>
                            <InfoMsgMobile>
                                {selector.msg.lang.AVAILABLE_QM_COUNT + ' : '}
                                <InfoBoldMsg>{selector.room.availableQMCount}</InfoBoldMsg>
                            </InfoMsgMobile>
                            <FriendModal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={friendOpen}
                                onClose={handleFriendClose}
                                closeAfterTransition
                            >
                                <Fade in={friendOpen}>
                                    <FriendMenuMobile>
                                        <Typography component="div" align="center">
                                            {selector.msg.validFlg &&
                                                <ErrorMessage>{errMsg}</ErrorMessage>
                                            }
                                            <CreateButtonMobile size="large" variant="contained"
                                                onClick={() => {
                                                    dispatch(setValidAction({ validFlg: false }));
                                                    dispatch(setRoomAction({ roomId: roomId }));
                                                    dispatch(setPlayerNameAction(name));
                                                    createMatch({ playerName: name, roomId: roomId, abilityIds: selector.players.player.abilities });
                                                }}>{selector.msg.lang.CREATE_BTN}</CreateButtonMobile>
                                            <InputField variant="standard" label={selector.msg.lang.ROOM_ID} value={roomId}
                                                inputProps={{ style: { fontSize: '3em', color: grey[600], paddingBottom: 0 } }}
                                                InputLabelProps={{ style: { fontSize: '3em' } }}
                                                onChange={roomIdChange} />
                                            <JoinButtonMobile size="large" variant="contained"
                                                onClick={() => { clickJoin(); }}>{selector.msg.lang.JOIN_BTN}</JoinButtonMobile>
                                        </Typography>
                                    </FriendMenuMobile>
                                </Fade>
                            </FriendModal>
                            <AbilityModal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={abilityOpen}
                                onClose={handleAbilityClose}
                                closeAfterTransition
                            >
                                <Fade in={abilityOpen}>
                                    <TopMenu>
                                        <Typography component="div" align="center">
                                            <NavigationComponent backgroundImage={`url(${navigation})`} message={selector.msg.lang.ABILITY} color={grey[50]} messages={[]} />
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <SelectAbilityComponent background={blue[300]} color={grey[50]}
                                                        fontSize="0.5em" naviFontSize="0.75em" placement="bottom"
                                                        type={selector.msg.lang.BST_TYPE} abilities={bstAbilities} update={forceUpdate} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <SelectAbilityComponent background={red[300]} color={grey[50]}
                                                        fontSize="0.5em" naviFontSize="0.75em" placement="left-end"
                                                        type={selector.msg.lang.ATK_TYPE} abilities={atkAbilities} update={forceUpdate} />
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <SelectAbilityComponent background={teal[300]} color={grey[50]}
                                                        fontSize="0.5em" naviFontSize="0.75em" placement="bottom"
                                                        type={selector.msg.lang.RCV_TYPE} abilities={rcvAbilities} update={forceUpdate} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <SelectAbilityComponent background={amber[300]} color={grey[50]}
                                                        fontSize="0.5em" naviFontSize="0.75em" placement="left-end"
                                                        type={selector.msg.lang.JAM_TYPE} abilities={jamAbilities} update={forceUpdate} />
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <SelectAbilityComponent background={grey[700]} color={grey[50]}
                                                        fontSize="0.5em" naviFontSize="0.75em" placement="bottom"
                                                        type={selector.msg.lang.CNF_TYPE} abilities={cnfAbilities} update={forceUpdate} />
                                                </Grid>
                                            </Grid>
                                            {selector.msg.validFlg &&
                                                <ErrorMessage>{errMsg}</ErrorMessage>
                                            }
                                            <ConfirmButtonMobile size="large" variant="contained" onClick={() => confirmAbilities()}>
                                                {selector.msg.lang.CONFIRM_BTN}
                                            </ConfirmButtonMobile>
                                            <AbilityTagMobile>{selector.msg.lang.ABILITY_EXP1}</AbilityTagMobile>
                                            <AbilityTagMobile>{selector.msg.lang.ABILITY_EXP2}</AbilityTagMobile>
                                        </Typography>
                                    </TopMenu>
                                </Fade>
                            </AbilityModal>
                        </MenuCardMobile>
                        <Grid container>
                            <Grid item xs={2} />
                            <Grid item xs={4}>
                                <LangButtonMobile onClick={handleLangOpen}>
                                    <LangIcon />
                                </LangButtonMobile>
                                <Typography sx={{ color: grey[50] }}>{selector.msg.lang.LANG}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <LangButtonMobile onClick={handleTutorialOpen}>
                                    <TutorialIcon />
                                </LangButtonMobile>
                                <Typography sx={{ color: grey[50] }}>{selector.msg.lang.TUTORIAL}</Typography>
                            </Grid>
                            <Grid item xs={2} />
                        </Grid>
                        <MenuModal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={langOpen}
                            onClose={handleLangClose}
                            closeAfterTransition
                        >
                            <Fade in={langOpen}>
                                <TopMenu sx={{ fontSize: '3em', width: '75%' }}>
                                    <LangComponent changeLang={changeLang} />
                                </TopMenu>
                            </Fade>
                        </MenuModal>
                        <MenuModal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={tutorialOpen}
                            onClose={handleTutorialClose}
                            closeAfterTransition
                        >
                            <Fade in={tutorialOpen}>
                                <TopMenu>
                                    <TutorialComponent />
                                </TopMenu>
                            </Fade>
                        </MenuModal>
                    </BackMobile>
                </>
            }
        </Typography>
    )
}

export default Top;