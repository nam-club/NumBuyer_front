import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';

import * as Constants from '../../constants';

import { useStyles, AbilityArea, AreaTag, BoostButton, AttackButton, DefenseButton, JamButton, ConfuseButton,
         SpeechBubble } from '../theme';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { yellow } from '@mui/material/colors';

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
                            <Button size="large" variant="contained" disabled>
                                {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                            </Button> 
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
                                                <BoostButton size="large" variant="contained" 
                                                sx={{border:2, borderColor: yellow["A200"]}}>
                                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}<br/>
                                                    {selector.msg.lang.REMAINING} {value.remaining}
                                                </BoostButton>
                                            </Tooltip> : 
                                            <div>
                                                {value.type === Constants.ATK_TP ? 
                                                    <Tooltip key={value.abilityId} title={
                                                        <SpeechBubble>
                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                        </SpeechBubble>}
                                                    placement="bottom">
                                                        <AttackButton size="large" variant="contained" 
                                                        sx={{border:2, borderColor: yellow["A200"]}}>
                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}<br/>
                                                            {selector.msg.lang.REMAINING} {value.remaining}
                                                        </AttackButton>
                                                    </Tooltip> :
                                                    <div>
                                                        {value.type === Constants.DEF_TP ? 
                                                            <Tooltip key={value.abilityId} title={
                                                                <SpeechBubble>
                                                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                                </SpeechBubble>}
                                                            placement="bottom">
                                                                <DefenseButton size="large" variant="contained" 
                                                                sx={{border:2, borderColor: yellow["A200"]}}>
                                                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}<br/>
                                                                    {selector.msg.lang.REMAINING} {value.remaining}
                                                                </DefenseButton>
                                                            </Tooltip> :
                                                            <div>
                                                                {value.type === Constants.JAM_TP ? 
                                                                    <Tooltip key={value.abilityId} title={
                                                                        <SpeechBubble>
                                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                                        </SpeechBubble>}
                                                                    placement="bottom">
                                                                        <JamButton size="large" variant="contained" 
                                                                        sx={{border:2, borderColor: yellow["A200"]}}>
                                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}<br/>
                                                                            {selector.msg.lang.REMAINING} {value.remaining}
                                                                        </JamButton>
                                                                    </Tooltip> :
                                                                    <Tooltip key={value.abilityId} title={
                                                                        <SpeechBubble>
                                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                                        </SpeechBubble>}
                                                                    placement="bottom">
                                                                        <ConfuseButton size="large" variant="contained" 
                                                                        sx={{border:2, borderColor: yellow["A200"]}}>
                                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}<br/>
                                                                            {selector.msg.lang.REMAINING} {value.remaining}
                                                                        </ConfuseButton>
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
                                                <BoostButton size="large" variant="contained">
                                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}<br/>
                                                    {selector.msg.lang.REMAINING} {value.remaining}
                                                </BoostButton>
                                            </Tooltip> : 
                                            <div>
                                                {value.type === Constants.ATK_TP ? 
                                                    <Tooltip key={value.abilityId} title={
                                                        <SpeechBubble>
                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                        </SpeechBubble>}
                                                    placement="bottom">
                                                        <AttackButton size="large" variant="contained">
                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}<br/>
                                                            {selector.msg.lang.REMAINING} {value.remaining}
                                                        </AttackButton>
                                                    </Tooltip> :
                                                    <div>
                                                        {value.type === Constants.DEF_TP ? 
                                                            <Tooltip key={value.abilityId} title={
                                                                <SpeechBubble>
                                                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                                </SpeechBubble>}
                                                            placement="bottom">
                                                                <DefenseButton size="large" variant="contained">
                                                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}<br/>
                                                                    {selector.msg.lang.REMAINING} {value.remaining}
                                                                </DefenseButton>
                                                            </Tooltip> :
                                                            <div>
                                                                {value.type === Constants.JAM_TP ? 
                                                                    <Tooltip key={value.abilityId} title={
                                                                        <SpeechBubble>
                                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                                        </SpeechBubble>}
                                                                    placement="bottom">
                                                                        <JamButton size="large" variant="contained">
                                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}<br/>
                                                                            {selector.msg.lang.REMAINING} {value.remaining}
                                                                        </JamButton>
                                                                    </Tooltip> :
                                                                    <Tooltip key={value.abilityId} title={
                                                                        <SpeechBubble>
                                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                                                        </SpeechBubble>}
                                                                    placement="bottom">
                                                                        <ConfuseButton size="large" variant="contained">
                                                                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}<br/>
                                                                            {selector.msg.lang.REMAINING} {value.remaining}
                                                                        </ConfuseButton>
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