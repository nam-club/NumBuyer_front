import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';

import * as Constants from '../../constants';

import { AbilityArea, AreaTag, UseAbilityButton, SpeechBubble, ConfirmTitle, ConfirmMessage, PassButton, YesButton, ErrorMessage } from '../theme';
import { AbilityAreaMobile, AreaTagMobile, UseAbilityButtonMobile, ErrorMessageMobile } from '../themeMobile';

import { setAblErrMsgAction } from '../../redux/msg/actions';
import { setPreCardsAction } from '../../redux/players/actions';

import AbilityInfoIconComponent from './atoms/AbilityInfoIconComponent';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import { useMediaQuery } from "@mui/material";

const UseAbilityComponent = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const { useAbility } = React.useContext(CTX); // アビリティ使用リクエストAPI
    const [open, setOpen] = React.useState(false); // ダイアログ用フラグ

    const [abilities, setAbilities] = React.useState(selector.players.player.abilities); // 所持アビリティ
    const [ablLength, setAblLength] = React.useState(abilities.length); // 所持アビリティの数
    const [useAbilityId, setUseAbilityId] = React.useState(null); // 使用するアビリティID

    const matches = useMediaQuery("(min-width:520px)");

    React.useEffect(() => {
        setAbilities(selector.players.player.abilities);
        setAblLength(abilities.length);
    }, [selector.players.player.abilities]);


    // ダイアログ表示
    const handleClickOpen = (ability) => {
        if (ability.remaining !== 0) {
            setUseAbilityId(ability.abilityId);
            setOpen(true);
        }
    };

    // ダイアログ閉じる
    const handleClose = () => {
        setOpen(false);
    };

    // アビリティ使用関数
    const useAbilityAction = () => {
        handleClose();
        dispatch(setAblErrMsgAction(""));
        dispatch(setPreCardsAction(selector.players.player.cards));
        useAbility({
            roomId: selector.room.roomId,
            playerId: selector.players.player.playerId,
            abilityId: useAbilityId
        });
    }

    return (
        <div>
            {matches ?
                <AbilityArea>
                    <AreaTag align="left" sx={{ marginTop: 0, marginBottom: 0 }}>{selector.msg.lang.ABILITY_TAG}</AreaTag>
                    <div align="center">
                        {abilities.map((value) => (
                            <div key={value.abilityId}>
                                {value.trigger === Constants.ACT_TRG &&
                                    <div>
                                        {value.status === Constants.USED_ST ?
                                            <Tooltip key={value.abilityId} title={
                                                <SpeechBubble>
                                                    {value.display.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).comment}
                                                </SpeechBubble>}
                                                placement="bottom">
                                                <UseAbilityButton
                                                    sx={{ backgroundImage: value.bgImage, color: value.tagColor, 'textShadow': '2px 4px 6px #000000' }}
                                                    size="large" variant="contained" disabled>
                                                    {value.display.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).name}
                                                </UseAbilityButton>
                                            </Tooltip>
                                            :
                                            <div>
                                                {value.status !== Constants.UNUSED_ST ?
                                                    <div>
                                                        <Tooltip key={value.abilityId} title={
                                                            <SpeechBubble>
                                                                {value.display.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).comment}
                                                            </SpeechBubble>}
                                                            placement="bottom">
                                                            <UseAbilityButton size="large" variant="contained"
                                                                sx={[{ backgroundImage: value.selectedBgImage, color: value.tagColor, cursor: 'default', 'textShadow': '2px 4px 6px #000000', boxShadow: 6 },
                                                                { '&:hover': { backgroundImage: value.selectedBgImage, opacity: 0.8, 'textShadow': '2px 4px 6px #000000', boxShadow: 6 } }]}>
                                                                {value.display.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).name}
                                                                <br /> {value.remaining}{value.max}
                                                            </UseAbilityButton>
                                                        </Tooltip>
                                                    </div> :
                                                    <div>
                                                        <Tooltip key={value.abilityId} title={
                                                            <SpeechBubble>
                                                                {value.display.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).comment}
                                                            </SpeechBubble>}
                                                            placement="bottom">
                                                            <UseAbilityButton size="large" variant="contained"
                                                                sx={{ backgroundImage: value.selectedBgImage, color: value.tagColor, 'textShadow': '2px 4px 6px #000000' }}
                                                                onClick={() => { handleClickOpen(value) }}>
                                                                {value.display.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).name}<br />
                                                                {value.remaining}{value.max}
                                                            </UseAbilityButton>
                                                        </Tooltip>
                                                    </div>
                                                }
                                            </div>
                                        }
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <ConfirmTitle id="alert-dialog-title">{selector.msg.lang.ABILITY_TITLE}</ConfirmTitle>
                                            <DialogContent align="center">
                                                <ConfirmMessage id="alert-dialog-description">{selector.msg.lang.ABILITY_MSG}</ConfirmMessage>
                                            </DialogContent>
                                            <DialogActions>
                                                <PassButton onClick={handleClose}>{selector.msg.lang.NO_BTN}</PassButton>
                                                <YesButton onClick={useAbilityAction} autoFocus>
                                                    {selector.msg.lang.YES_BTN}
                                                </YesButton>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                }
                            </div>
                        ))}
                        {selector.msg.ablErrMsg !== "" &&
                            <ErrorMessage>{selector.msg.ablErrMsg}</ErrorMessage>
                        }
                    </div>
                </AbilityArea>
                :
                <AbilityAreaMobile>
                    <AreaTagMobile align="left" sx={{ marginTop: 0, marginBottom: 0, fontSize: Constants.FONT_SIZES.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).fontSize }}>{selector.msg.lang.ABILITY_TAG}</AreaTagMobile>
                    <Grid container>
                        {abilities.map((value) => (
                            <Grid item xs={12} key={value.abilityId}>
                                {value.trigger === Constants.ACT_TRG &&
                                    <div>
                                        {value.status === Constants.USED_ST ?
                                            <Grid container>
                                                <Grid item xs={10}>
                                                    <UseAbilityButtonMobile
                                                        sx={{ backgroundImage: value.bgImage, color: value.tagColor, 'textShadow': '2px 4px 6px #000000', fontSize: Constants.FONT_SIZES.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).fontSize }}
                                                        size="large" variant="contained" disabled>
                                                        {value.display.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).name}
                                                    </UseAbilityButtonMobile>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <AbilityInfoIconComponent
                                                        comment={value.display.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).comment}
                                                        placement="bottom" margin="25% 0" />
                                                </Grid>
                                            </Grid>
                                            :
                                            <div>
                                                {value.status !== Constants.UNUSED_ST ?
                                                    <div>
                                                        <Grid container>
                                                            <Grid item xs={10}>
                                                                <UseAbilityButtonMobile size="large" variant="contained"
                                                                    sx={[{ backgroundImage: value.selectedBgImage, color: value.tagColor, cursor: 'default', 'textShadow': '2px 4px 6px #000000', boxShadow: 6, fontSize: Constants.FONT_SIZES.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).fontSize },
                                                                    { '&:hover': { backgroundImage: value.selectedBgImage, opacity: 0.8, 'textShadow': '2px 4px 6px #000000', boxShadow: 6, fontSize: Constants.FONT_SIZES.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).fontSize } }]}>
                                                                    {value.display.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).name + '　' + value.remaining}{value.max}
                                                                </UseAbilityButtonMobile>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <AbilityInfoIconComponent
                                                                    comment={value.display.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).comment}
                                                                    placement="bottom" margin="25% 0" />
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                    :
                                                    <div>
                                                        <Grid container>
                                                            <Grid item xs={10}>
                                                                <UseAbilityButtonMobile size="large" variant="contained"
                                                                    sx={{ backgroundImage: value.selectedBgImage, color: value.tagColor, 'textShadow': '2px 4px 6px #000000', fontSize: Constants.FONT_SIZES.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).fontSize }}
                                                                    onClick={() => { handleClickOpen(value) }}>
                                                                    {value.display.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).name + '　' + value.remaining}{value.max}
                                                                </UseAbilityButtonMobile>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <AbilityInfoIconComponent
                                                                    comment={value.display.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).comment}
                                                                    placement="bottom" margin="25% 0" />
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                }
                                            </div>
                                        }
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <ConfirmTitle id="alert-dialog-title">{selector.msg.lang.ABILITY_TITLE}</ConfirmTitle>
                                            <DialogContent align="center">
                                                <ConfirmMessage id="alert-dialog-description">{selector.msg.lang.ABILITY_MSG}</ConfirmMessage>
                                            </DialogContent>
                                            <DialogActions>
                                                <PassButton onClick={handleClose}>{selector.msg.lang.NO_BTN}</PassButton>
                                                <YesButton onClick={useAbilityAction} autoFocus>
                                                    {selector.msg.lang.YES_BTN}
                                                </YesButton>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                }
                            </Grid>
                        ))}
                    </Grid>
                    {selector.msg.ablErrMsg !== "" &&
                        <ErrorMessageMobile>{selector.msg.ablErrMsg}</ErrorMessageMobile>
                    }
                </AbilityAreaMobile>
            }
        </div>
    )
}

export default UseAbilityComponent;