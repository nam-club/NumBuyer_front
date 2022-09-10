import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AbilityCard, AbilityButton, SpeechBubble } from '../theme';
import { AbilityButtonMobile } from '../themeMobile';


import { setAbilityAction, cancelAbilityAction } from '../../redux/players/actions';
import { setValidAction } from '../../redux/msg/actions';

import NavigationComponent from './NavigationComponent';
import AbilityInfoIconComponent from './atoms/AbilityInfoIconComponent';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import { useMediaQuery } from "@mui/material";

const SelectAbilityComponent = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const matches = useMediaQuery("(min-width:520px)");

    console.log(props.abilities);

    return (
        <Typography component="div" align="center">
            {matches ?
            <AbilityCard>
                <NavigationComponent message={props.type} messages={[]} color={props.color} background={props.background} />
                {props.abilities.map((value) => (
                    selector.players.player.abilities.find((id) => {return id === value.abilityId}) 
                    ?
                    <Tooltip key={value.abilityId} title={
                        <SpeechBubble>
                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                        </SpeechBubble>}
                    placement="bottom">
                        <AbilityButton
                            sx={[{backgroundImage: value.selectedBgImage, color: value.tagColor, 'text-shadow': '2px 4px 6px #000000', boxShadow: 6}, 
                                {'&:hover': {backgroundImage: value.selectedBgImage, 'text-shadow': '1px 2px 3px #000000', opacity: 0.8}}]}
                            onClick={() => {
                                dispatch(cancelAbilityAction(value.abilityId));
                                props.update();
                                if(selector.players.player.abilities.length >= 2) {
                                    dispatch(setValidAction({validFlg: false}));
                                }
                            }}>
                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                        </AbilityButton>
                    </Tooltip>
                    :
                    <Tooltip key={value.abilityId} title={
                        <SpeechBubble>
                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                        </SpeechBubble>} 
                        placement="bottom">
                        <AbilityButton
                            sx={[{backgroundImage: value.bgImage, color: value.tagColor, 'text-shadow': '2px 4px 6px #000000', boxShadow: 6}, 
                                {'&:hover': {backgroundImage: value.bgImage, 'text-shadow': '2px 4px 6px #000000', opacity: 0.8}}]}
                            onClick={() => {
                                dispatch(setAbilityAction(value.abilityId));
                                props.update();
                                if(selector.players.player.abilities.length >= 2) {
                                    dispatch(setValidAction({validFlg: false}));
                                }
                            }}>
                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                        </AbilityButton>
                    </Tooltip>
                ))}
            </AbilityCard>
            :
            <AbilityCard>
                <NavigationComponent message={props.type} messages={[]} color={props.color} background={props.background} />
                {props.abilities.map((value) => (
                    selector.players.player.abilities.find((id) => {return id === value.abilityId}) 
                    ?
                    <Grid container key={value.abilityId}>
                        <Grid item xs={2}/>
                        <Grid item xs={8}>
                            <Tooltip title={
                                <SpeechBubble>
                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                </SpeechBubble>}
                            placement="bottom">
                                <AbilityButtonMobile
                                    sx={[{backgroundImage: value.selectedBgImage, color: value.tagColor, 'text-shadow': '2px 4px 6px #000000', boxShadow: 6}, 
                                        {'&:hover': {backgroundImage: value.selectedBgImage, 'text-shadow': '2px 4px 6px #000000', opacity: 0.8}}]}
                                    onClick={() => {
                                        dispatch(cancelAbilityAction(value.abilityId));
                                        props.update();
                                        if(selector.players.player.abilities.length >= 2) {
                                            dispatch(setValidAction({validFlg: false}));
                                        }
                                    }}>
                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                                </AbilityButtonMobile>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={2}>
                            <AbilityInfoIconComponent
                            comment={value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                            placement={props.placement} margin="50% 10%" />
                        </Grid>
                    </Grid>
                    :
                    <Grid container key={value.abilityId}>
                        <Grid item xs={2}/>
                        <Grid item xs={8}>
                            <AbilityButtonMobile
                                sx={[{backgroundImage: value.bgImage, color: value.tagColor, 'text-shadow': '2px 4px 6px #000000', boxShadow: 6}, 
                                    {'&:hover': {backgroundImage: value.bgImage, 'text-shadow': '2px 4px 6px #000000', opacity: 0.8}}]}
                                onClick={() => {
                                    dispatch(setAbilityAction(value.abilityId));
                                    props.update();
                                    if(selector.players.player.abilities.length >= 2) {
                                        dispatch(setValidAction({validFlg: false}));
                                    }
                                }}>
                                {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                            </AbilityButtonMobile>
                        </Grid>
                        <Grid item xs={2}>
                            <AbilityInfoIconComponent
                            comment={value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                            placement={props.placement} margin="50% 10%" />
                        </Grid>
                    </Grid>
                ))}
            </AbilityCard>
            }
        </Typography>
    );
}

export default SelectAbilityComponent;