import React from 'react';

import { MainLogo, MainTitle, Back, MenuCard, InputField, QuickButton,
        FriendButton, FriendModal, FriendMenu, CreateButton, JoinButton, ErrorMessage,
        LangIcon, TutorialIcon, MenuModal, TopMenu, AbilityModal, ConfirmButton, AbilityTag } from './theme';
import { MainLogoMobile, MainTitleMobile, BackMobile, LangButtonMobile, TutorialIconMobile, MenuCardMobile,
        ErrorMessageMobile, QuickButtonMobile, FriendButtonMobile, FriendMenuMobile,
         ConfirmButtonMobile, CreateButtonMobile, JoinButtonMobile, AbilityTagMobile} from './themeMobile';

import * as Constants from '../constants';
import * as ConstantsMsg from '../constantsMsg';

import { CTX } from '../Socket';

import { useDispatch, useSelector } from 'react-redux';

import { setPlayerNameAction } from '../redux/players/actions'
import { setRoomAction, setQuickAction } from '../redux/room/actions';
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
import topImage from '../assets/topImage.png';
import backImage from '../assets/backImage.png';

const Top = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const {joinQuickMatch, createMatch, joinFriendMatch} = React.useContext(CTX);

    const [name, setName] = React.useState('');
    const [roomId, setRoomId] = React.useState('');
    const [errMsg, setErrMsg] = React.useState('');
    const [langOpen, setLangOpen] = React.useState(false); // 言語設定のモーダル
    const [tutorialOpen, setTutorialOpen] = React.useState(false); // チュートリアルのモーダル
    const [abilityOpen, setAbilityOpen] = React.useState(false); // アビリティ選択のモーダル
    const [friendOpen, setFriendOpen] = React.useState(false); // フレンドマッチのモーダル

    // アビリティ
    const [bstAbilities, setBstAbilities] = React.useState(Constants.BST_ABILITIES);
    const [atkAbilities, setAtkAbilities] = React.useState(Constants.ATK_ABILITIES);
    const [rcvAbilities, setRcvAbilities] = React.useState(Constants.RCV_ABILITIES);
    const [jamAbilities, setJamAbilities] = React.useState(Constants.JAM_ABILITIES);
    const [cnfAbilities, setCnfAbilities] = React.useState(Constants.CNF_ABILITIES);

    const matches = useMediaQuery("(min-width:520px)");

    /** 強制的に再レンダリングさせる */
    const useForceUpdate = () => {
        const [, forceUpdate] = React.useState(undefined);
        return React.useCallback(() => {
            forceUpdate((s) => !s);
        }, []);
    };
    const forceUpdate = useForceUpdate();

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
        if(name !== '' && !name.match(Constants.NAME_EXP) && name.length <= 15) {
            setAbilityOpen(true);
        }else {
            dispatch(setValidAction({validFlg: true}));
            if(name !== '') {
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.SYMBOL_ERR}));
                dispatch(setErrMsgVarsAction([
                    ConstantsMsg.English.SYMBOL_ERR,
                    ConstantsMsg.Japanese.SYMBOL_ERR,
                    ConstantsMsg.Chinese.SYMBOL_ERR
                ]));
            }else {
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.NULL_NAME_ERR}));
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
        if(selector.players.player.abilities.length >= 2) {
            if(selector.room.isQuickMatch) {
                joinQuickMatch({playerName: name, abilityIds: selector.players.player.abilities});
            }else {
                setFriendOpen(true);
            }
            handleAbilityClose();
            dispatch(setValidAction({validFlg: false}));
        }else {
            dispatch(setValidAction({validFlg: true}));
            dispatch(setErrMsgAction({errMsg: selector.msg.lang.ABILITY_ERR}));
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
        if(!e.target.value.match(Constants.NAME_EXP) && e.target.value.length <= 15) {
            setName(e.target.value);
        }
        if(e.target.value !== '' && !e.target.value.match(Constants.NAME_EXP)) {
            dispatch(setValidAction({validFlg: false}));
        }else {
            dispatch(setValidAction({validFlg: true}));
            if(e.target.value !== '') {
                // 禁止文字を入力
                if(e.target.value.match(Constants.NAME_EXP)) {
                    dispatch(setErrMsgAction({errMsg: selector.msg.lang.SYMBOL_ERR}));
                    dispatch(setErrMsgVarsAction([
                        ConstantsMsg.English.SYMBOL_ERR,
                        ConstantsMsg.Japanese.SYMBOL_ERR,
                        ConstantsMsg.Chinese.SYMBOL_ERR
                    ]));
                // 15文字より多い
                }else if(e.target.value.length > 15) {
                    dispatch(setErrMsgAction({errMsg: selector.msg.lang.LENGTH_NAME_ERR}));
                    dispatch(setErrMsgVarsAction([
                        ConstantsMsg.English.LENGTH_NAME_ERR,
                        ConstantsMsg.Japanese.LENGTH_NAME_ERR,
                        ConstantsMsg.Chinese.LENGTH_NAME_ERR
                    ]));
                }
            }else {
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.NULL_NAME_ERR}));
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
        if(e.target.value.match(Constants.BID_EXP) && e.target.value.length <= 10) {
            setRoomId(e.target.value);
        }
        if(e.target.value !== '' && e.target.value.match(Constants.BID_EXP)) {
            dispatch(setValidAction({validFlg: false}));
        }else {
            dispatch(setValidAction({validFlg: true}));
            if(e.target.value !== '') {
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.NUM_ERR}));
                dispatch(setErrMsgVarsAction([
                    ConstantsMsg.English.NUM_ERR,
                    ConstantsMsg.Japanese.NUM_ERR,
                    ConstantsMsg.Chinese.NUM_ERR
                ]));
            }else {
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.NULL_ROOM_ID_ERR}));
                dispatch(setErrMsgVarsAction([
                    ConstantsMsg.English.NULL_ROOM_ID_ERR,
                    ConstantsMsg.Japanese.NULL_ROOM_ID_ERR,
                    ConstantsMsg.Chinese.NULL_ROOM_ID_ERR
                ]));
            }
        }
    }

    // クイックマッチ
    const clickQuick = () => {
        if(name !== '' && !name.match(Constants.NAME_EXP) && name.length <= 15) {
            dispatch(setValidAction({validFlg: false}));
            dispatch(setPlayerNameAction(name));
            dispatch(setQuickAction(true));
            handleAbilityOpen();
        }else {
            dispatch(setValidAction({validFlg: true}));
            if(name !== '') {
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.SYMBOL_ERR}));
                dispatch(setErrMsgVarsAction([
                    ConstantsMsg.English.SYMBOL_ERR,
                    ConstantsMsg.Japanese.SYMBOL_ERR,
                    ConstantsMsg.Chinese.SYMBOL_ERR
                ]));
            }else {
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.NULL_NAME_ERR}));
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
        if(roomId === '') {
            dispatch(setValidAction({validFlg: true}));
            dispatch(setErrMsgAction({errMsg: selector.msg.lang.NULL_ROOM_ID_ERR}));
            dispatch(setErrMsgVarsAction([
                ConstantsMsg.English.NULL_ROOM_ID_ERR,
                ConstantsMsg.Japanese.NULL_ROOM_ID_ERR,
                ConstantsMsg.Chinese.NULL_ROOM_ID_ERR
            ]));
        // ルームIDが数字以外
        }else if(!roomId.match(Constants.BID_EXP)) {
            dispatch(setValidAction({validFlg: true}));
            dispatch(setErrMsgAction({errMsg: selector.msg.lang.NUM_ERR}));
            dispatch(setErrMsgVarsAction([
                ConstantsMsg.English.NUM_ERR,
                ConstantsMsg.Japanese.NUM_ERR,
                ConstantsMsg.Chinese.NUM_ERR
            ]));
        // ルームIDが10文字以外
        }else if(roomId.length !== 10) {
            dispatch(setValidAction({validFlg: true}));
            dispatch(setErrMsgAction({errMsg: selector.msg.lang.LENGTH_ROOM_ID_ERR}));
            dispatch(setErrMsgVarsAction([
                ConstantsMsg.English.LENGTH_ROOM_ID_ERR,
                ConstantsMsg.Japanese.LENGTH_ROOM_ID_ERR,
                ConstantsMsg.Chinese.LENGTH_ROOM_ID_ERR
            ]));
        }else {
            dispatch(setValidAction({validFlg: false}));
            dispatch(setRoomAction({roomId: roomId}));
            dispatch(setPlayerNameAction(name));
            joinFriendMatch({playerName: name, roomId: roomId, abilityIds: selector.players.player.abilities});
        }
    }

    // 言語選択
    const changeLang = (value) => {
        switch(value) {
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
            <div>
                <Back>
                    <Grid container>
                        <Grid item xs={8} />
                        <Grid item xs={4}>
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                <div>
                                    <Button onClick={handleLangOpen}>
                                        <LangIcon/>
                                    </Button>
                                    <Typography sx={{color: grey[50]}}>{selector.msg.lang.LANG}</Typography>
                                </div>
                                <div>
                                    <Button onClick={handleTutorialOpen}>
                                        <TutorialIcon/>
                                    </Button>
                                    <Typography sx={{color: grey[50]}}>{selector.msg.lang.TUTORIAL}</Typography>
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
                            <TopMenu sx={{fontSize: '3em', width: '30%'}}>
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
                                <TutorialComponent/>
                            </TopMenu>
                        </Fade>
                    </MenuModal>
                    <MainLogo src={logo}/>
                    <MainTitle src={title}/>
                    <MenuCard>
                        <CardContent>
                            <InputField variant="standard" label={selector.msg.lang.PLAYER_NAME} value={name} 
                            inputProps={{ style: {fontSize: '3em', color: grey[600], marginTop: '2%', marginBottom: '-4%'} } }
                            InputLabelProps={{ style: {fontSize: '3em'} }}
                            onChange={doChange}/>
                            {selector.msg.validFlg &&
                                <ErrorMessage>{errMsg}</ErrorMessage>
                            }
                        </CardContent>
                        <CardActions>
                            <Grid item xs={6}>
                                <QuickButton size="large" variant="contained" 
                                sx={{color: grey[50], backgroundImage: `url(${topImage})`, boxShadow: 6}}
                                onClick={clickQuick}>
                                    <span sx={{'text-shadow': '2px 4px 6px #808080'}}>{selector.msg.lang.QUICK_MATCH}</span>
                                </QuickButton>
                            </Grid>
                            <Grid item xs={6}>
                                <FriendButton size="large" variant="contained"
                                sx={{color: grey[50], backgroundImage: `url(${backImage})`, boxShadow: 6}}
                                onClick={handleAbilityOpen}>{selector.msg.lang.FRIEND_MATCH}</FriendButton>
                            </Grid>
                        </CardActions>
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
                                            dispatch(setValidAction({validFlg: false}));
                                            dispatch(setRoomAction({roomId: roomId}));
                                            dispatch(setPlayerNameAction(name));
                                            createMatch({playerName: name, roomId: roomId, abilityIds: selector.players.player.abilities});
                                        }}>{selector.msg.lang.CREATE_BTN}</CreateButton>
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <InputField variant="standard" label={selector.msg.lang.ROOM_ID} value={roomId} 
                                            inputProps={{ style: {fontSize: '3em', color: grey[600], marginTop: '2%'} } }
                                            InputLabelProps={{ style: {fontSize: '3em'} }}
                                            onChange={roomIdChange} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <JoinButton size="large" variant="contained"
                                            onClick={() => {clickJoin();}}>{selector.msg.lang.JOIN_BTN}</JoinButton>
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
                                        <NavigationComponent message={selector.msg.lang.ABILITY} color={grey[50]} messages={[]} />
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
            </div>
            :
            <div>
                <BackMobile>
                    <div><MainLogoMobile src={logo}/></div>
                    <div><MainTitleMobile src={title}/></div>
                    <MenuCardMobile>
                        <CardContent>
                            <InputField variant="standard" label={selector.msg.lang.PLAYER_NAME} value={name}
                            sx={{margin: '0 10%'}} 
                            inputProps={{ style: {fontSize: '2em', color: grey[600], marginTop: '2%', marginBottom: '-4%'} } }
                            InputLabelProps={{ style: {fontSize: '2em'} }}
                            onChange={doChange}/>
                        </CardContent>
                        {selector.msg.validFlg &&
                            <ErrorMessageMobile>{errMsg}</ErrorMessageMobile>
                        }
                        {selector.msg.lang === ConstantsMsg.English ?
                        <div>
                            <CardActions>
                                <QuickButtonMobile size="large" variant="contained"
                                onClick={clickQuick}>{selector.msg.lang.QUICK_MATCH}</QuickButtonMobile>
                            </CardActions>
                            <CardActions sx={{marginBottom: '10%'}}>
                                <FriendButtonMobile size="large" variant="contained"
                                onClick={handleAbilityOpen}>{selector.msg.lang.FRIEND_MATCH}</FriendButtonMobile>
                            </CardActions>
                        </div>
                        :
                        <div>
                            <CardActions>
                                <QuickButtonMobile size="large" variant="contained" sx={{fontSize: '1.5em', padding: '5.5%'}}
                                onClick={clickQuick}>{selector.msg.lang.QUICK_MATCH}</QuickButtonMobile>
                            </CardActions>
                            <CardActions sx={{marginBottom: '10%'}}>
                                <FriendButtonMobile size="large" variant="contained" sx={{fontSize: '1.5em', padding: '5.5%'}}
                                onClick={handleAbilityOpen}>{selector.msg.lang.FRIEND_MATCH}</FriendButtonMobile>
                            </CardActions>
                        </div>
                        }
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
                                            dispatch(setValidAction({validFlg: false}));
                                            dispatch(setRoomAction({roomId: roomId}));
                                            dispatch(setPlayerNameAction(name));
                                            createMatch({playerName: name, roomId: roomId, abilityIds: selector.players.player.abilities});
                                        }}>{selector.msg.lang.CREATE_BTN}</CreateButtonMobile>
                                        <InputField variant="standard" label={selector.msg.lang.ROOM_ID} value={roomId} 
                                        inputProps={{ style: {fontSize: '3em', color: grey[600], paddingBottom: 0} } }
                                        InputLabelProps={{ style: {fontSize: '3em'} }}
                                        onChange={roomIdChange} />
                                        <JoinButtonMobile size="large" variant="contained"
                                        onClick={() => {clickJoin();}}>{selector.msg.lang.JOIN_BTN}</JoinButtonMobile>
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
                                        <NavigationComponent message={selector.msg.lang.ABILITY} color={grey[50]} messages={[]} />
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
                                <LangIcon/>
                            </LangButtonMobile>
                            <Typography sx={{color: grey[50]}}>{selector.msg.lang.LANG}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <LangButtonMobile onClick={handleTutorialOpen}>
                                <TutorialIcon/>
                            </LangButtonMobile>
                            <Typography sx={{color: grey[50]}}>{selector.msg.lang.TUTORIAL}</Typography>
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
                            <TopMenu sx={{fontSize: '3em', width: '75%'}}>
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
                                <TutorialComponent/>
                            </TopMenu>
                        </Fade>
                    </MenuModal>
                </BackMobile>
            </div>
            }
        </Typography>
    )
}

export default Top;