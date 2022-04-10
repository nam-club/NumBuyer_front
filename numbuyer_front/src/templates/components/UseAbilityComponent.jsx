import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';

import * as Constants from '../../constants';

import { useStyles, AbilityArea, AreaTag, UseAbilityButton, SpeechBubble } from '../theme';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { teal, red, blue, yellow, grey } from '@mui/material/colors';

const UseAbilityComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const [open, setOpen] = React.useState(false); // ダイアログ用フラグ
    
    // アビリティ
    const [abilities, setAbilities] = React.useState(selector.players.player.abilities);

    React.useEffect(() => {
        setAbilities(selector.players.player.abilities);
    }, [selector.players.player.abilities]);

    
    // ダイアログ表示
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    // ダイアログ閉じる
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <AbilityArea>
            <AreaTag align="left" sx={{marginTop: 0, marginBottom: 0}}>{selector.msg.lang.ABILITY_TAG}</AreaTag>
            <div align="center">
                {abilities.map((value, index) => (
                    <div key={index}>
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
                                                 sx={{ background: teal[300], cursor: 'default', boxShadow: 'none',
                                                '&:hover': {background: teal[300], boxShadow: 'none'} }}>
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
                                                        {value.type === Constants.DEF_TP ? 
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
                                                 sx={{ background: grey[50], color: grey[700], border: 2, borderColor: teal[300], '&:hover': {background: "white"} }}>
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
                                                         sx={{ background: grey[50], color: grey[700], border: 2, borderColor: red[300], '&:hover': {background: "white"} }}>
                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}<br/>
                                                            {value.remaining}{value.max}
                                                        </UseAbilityButton>
                                                    </Tooltip> :
                                                    <div>
                                                        {value.type === Constants.DEF_TP ? 
                                                            <Tooltip key={value.abilityId} title={
                                                                <SpeechBubble>
                                                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                                </SpeechBubble>}
                                                            placement="bottom">
                                                                <UseAbilityButton size="large" variant="contained"
                                                                 sx={{ background: grey[50], color: grey[700], border: 2, borderColor: blue[300], '&:hover': {background: "white"} }}>
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
                                                                         sx={{ background: grey[50], color: grey[700], border: 2, borderColor: yellow[300], '&:hover': {background: "white"} }}>
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
                                                                         sx={{ background: grey[50], color: grey[700], border: 2, borderColor: grey[700], '&:hover': {background: "white"} }}>
                                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}<br/>
                                                                            {value.remaining}{value.max}
                                                                        </UseAbilityButton>
                                                                    </Tooltip>
                                                                }
                                                            </div>
                                                        }
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