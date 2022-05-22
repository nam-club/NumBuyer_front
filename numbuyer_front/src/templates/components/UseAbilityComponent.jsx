import React from 'react';
import { useSelector } from 'react-redux';
import { CTX } from '../../Socket';

import * as Constants from '../../constants';

import { useStyles, AbilityArea, AreaTag, UseAbilityButton, SpeechBubble, ConfirmTitle, ConfirmMessage, PassButton, YesButton } from '../theme';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Tooltip from '@mui/material/Tooltip';
import { teal, red, blue, yellow, grey } from '@mui/material/colors';

const UseAbilityComponent = (props) => {
    const selector = useSelector(state => state);

    const {useAbility} = React.useContext(CTX); // アビリティ使用リクエストAPI
    const [open, setOpen] = React.useState(false); // ダイアログ用フラグ

    const [abilities, setAbilities] = React.useState(selector.players.player.abilities); // 所持アビリティ
    const [useAbilityId, setUseAbilityId] = React.useState(null); // 使用するアビリティID

    React.useEffect(() => {
        setAbilities(selector.players.player.abilities);
    }, [selector.players.player.abilities]);

    
    // ダイアログ表示
    const handleClickOpen = (ability) => {
        if(ability.remaining !== 0) {
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
        useAbility({
            roomId: selector.room.roomId,
            playerId: selector.players.player.playerId,
            abilityId: useAbilityId
        });
    }

    return (
        <AbilityArea>
            <AreaTag align="left" sx={{marginTop: 0, marginBottom: 0}}>{selector.msg.lang.ABILITY_TAG}</AreaTag>
            <div align="center">
                {abilities.map((value, index) => (
                    <div key={index}>
                        {value.trigger === Constants.ACT_TRG &&
                        <div>
                            {value.status === Constants.USED_ST ?
                            <UseAbilityButton size="large" variant="contained" disabled>
                                {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                            </UseAbilityButton> 
                            :
                            <div>
                                {value.status === Constants.READY_ST ?
                                    <div>
                                        {value.type === Constants.BST_TP ? 
                                            <Tooltip key={value.abilityId} title={
                                                <SpeechBubble>
                                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                </SpeechBubble>}
                                            placement="bottom">
                                                <UseAbilityButton size="large" variant="contained"
                                                 sx={{ background: blue[300], cursor: 'default', boxShadow: 'none',
                                                '&:hover': {background: blue[300], boxShadow: 'none'} }}>
                                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                                                    <br/> {value.remaining}{value.max}
                                                </UseAbilityButton>
                                            </Tooltip> : 
                                            <div>
                                                {value.type === Constants.ATK_TP ? 
                                                    <Tooltip key={value.abilityId} title={
                                                        <SpeechBubble>
                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                        </SpeechBubble>}
                                                    placement="bottom">
                                                        <UseAbilityButton size="large" variant="contained"
                                                         sx={{ background: red[300], cursor: 'default', boxShadow: 'none',
                                                         '&:hover': {background: red[300], boxShadow: 'none'} }}>
                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                                                            <br/> {value.remaining}{value.max}
                                                        </UseAbilityButton>
                                                    </Tooltip> :
                                                    <div>
                                                        {value.type === Constants.RCV_TP ? 
                                                            <Tooltip key={value.abilityId} title={
                                                                <SpeechBubble>
                                                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                                </SpeechBubble>}
                                                            placement="bottom">
                                                                <UseAbilityButton size="large" variant="contained"
                                                                 sx={{ background: teal[300], cursor: 'default', boxShadow: 'none',
                                                                 '&:hover': {background: teal[300], boxShadow: 'none'} }}>
                                                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                                                                     <br/> {value.remaining}{value.max}
                                                                </UseAbilityButton>
                                                            </Tooltip> :
                                                            <div>
                                                                {value.type === Constants.JAM_TP ? 
                                                                    <Tooltip key={value.abilityId} title={
                                                                        <SpeechBubble>
                                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                                        </SpeechBubble>}
                                                                    placement="bottom">
                                                                        <UseAbilityButton size="large" variant="contained"
                                                                         sx={{ background: yellow[300], color: grey[700], cursor: 'default', boxShadow: 'none',
                                                                         '&:hover': {background: yellow[300], boxShadow: 'none'} }}>
                                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                                                                            <br/> {value.remaining}{value.max}
                                                                        </UseAbilityButton>
                                                                    </Tooltip> :
                                                                    <Tooltip key={value.abilityId} title={
                                                                        <SpeechBubble>
                                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                                        </SpeechBubble>}
                                                                    placement="bottom">
                                                                        <UseAbilityButton size="large" variant="contained"
                                                                         sx={{ background: grey[700], cursor: 'default', boxShadow: 'none',
                                                                         '&:hover': {background: grey[700], boxShadow: 'none'} }}>
                                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                                                                            <br/> {value.remaining}{value.max}
                                                                        </UseAbilityButton>
                                                                    </Tooltip>
                                                                }
                                                            </div>
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div> : 
                                    <div>
                                        {value.type === Constants.BST_TP ? 
                                            <Tooltip key={value.abilityId} title={
                                                <SpeechBubble>
                                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                </SpeechBubble>}
                                            placement="bottom">
                                                <UseAbilityButton size="large" variant="contained"
                                                 sx={{ background: blue[300], '&:hover': {background: blue[200]} }}
                                                 onClick={() => {handleClickOpen(value)}}>
                                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}<br/>
                                                    {value.remaining}{value.max}
                                                </UseAbilityButton>
                                            </Tooltip> : 
                                            <div>
                                                {value.type === Constants.ATK_TP ? 
                                                    <Tooltip key={value.abilityId} title={
                                                        <SpeechBubble>
                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                        </SpeechBubble>}
                                                    placement="bottom">
                                                        <UseAbilityButton size="large" variant="contained"
                                                         sx={{ background: red[300], '&:hover': {background: red[200]} }}
                                                         onClick={() => {handleClickOpen(value)}}>
                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}<br/>
                                                            {value.remaining}{value.max}
                                                        </UseAbilityButton>
                                                    </Tooltip> :
                                                    <div>
                                                        {value.type === Constants.RCV_TP ? 
                                                            <Tooltip key={value.abilityId} title={
                                                                <SpeechBubble>
                                                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                                </SpeechBubble>}
                                                            placement="bottom">
                                                                <UseAbilityButton size="large" variant="contained"
                                                                 sx={{ background: teal[300], '&:hover': {background: teal[200]} }}
                                                                 onClick={() => {handleClickOpen(value)}}>
                                                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}<br/>
                                                                    {value.remaining}{value.max}
                                                                </UseAbilityButton>
                                                            </Tooltip> :
                                                            <div>
                                                                {value.type === Constants.JAM_TP ? 
                                                                    <Tooltip key={value.abilityId} title={
                                                                        <SpeechBubble>
                                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                                        </SpeechBubble>}
                                                                    placement="bottom">
                                                                        <UseAbilityButton size="large" variant="contained"
                                                                         sx={{ background: yellow[300], color: grey[700], '&:hover': {background: yellow[200]} }}
                                                                         onClick={() => {handleClickOpen(value)}}>
                                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}<br/>
                                                                            {value.remaining}{value.max}
                                                                        </UseAbilityButton>
                                                                    </Tooltip> :
                                                                    <Tooltip key={value.abilityId} title={
                                                                        <SpeechBubble>
                                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                                        </SpeechBubble>}
                                                                    placement="bottom">
                                                                        <UseAbilityButton size="large" variant="contained"
                                                                         sx={{ background: grey[700], '&:hover': {background: grey[600]} }}
                                                                         onClick={() => {handleClickOpen(value)}}>
                                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}<br/>
                                                                            {value.remaining}{value.max}
                                                                        </UseAbilityButton>
                                                                    </Tooltip>
                                                                }
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
                                }  
                            </div>
                        }
                        </div>
                        }
                    </div>
                ))}
            </div>
        </AbilityArea>
    )
}

export default UseAbilityComponent;