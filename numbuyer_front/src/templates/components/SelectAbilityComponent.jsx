import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AbilityCard, AbilityButton, SelectedAbilityButton, SpeechBubble } from '../theme';
import { AbilityButtonMobile, SelectedAbilityButtonMobile } from '../themeMobile';


import { setAbilityAction } from '../../redux/players/actions';
import { setValidAction } from '../../redux/msg/actions';

import NavigationComponent from './NavigationComponent';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { useMediaQuery } from "@mui/material";

const SelectAbilityComponent = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const matches = useMediaQuery("(min-width:520px)");

    return (
        <Typography component="div" align="center">
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
                                {matches ?
                                <SelectedAbilityButton
                                    sx={[{background: props.btnColor, color: props.fcsTagColor}, 
                                        {'&:hover': {background: props.fcsColor}}]}>
                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                                </SelectedAbilityButton>
                                :
                                <SelectedAbilityButtonMobile
                                    sx={[{background: props.btnColor, color: props.fcsTagColor}, 
                                        {'&:hover': {background: props.fcsColor}}]}>
                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                                </SelectedAbilityButtonMobile>
                                }
                            </Tooltip>
                        </Grid>
                        <Grid item xs={2}>
                            {!matches && 
                                <InfoIcon sx={{margin: '50% 10%'}} onClick={() => {
                                    console.log('あああ');
                                }}/>
                            }
                        </Grid>
                    </Grid>
                    :
                    <Grid container key={value.abilityId}>
                        <Grid item xs={2}/>
                        <Grid item xs={8}>
                            <Tooltip title={
                                <SpeechBubble>
                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                                </SpeechBubble>} 
                                placement="bottom">
                                {matches ?
                                <AbilityButton
                                    onClick={() => {
                                        dispatch(setAbilityAction(value.abilityId));
                                        props.update();
                                        if(selector.players.player.abilities.length >= 2) {
                                            dispatch(setValidAction({validFlg: false}));
                                        }
                                    }}>
                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                                </AbilityButton>
                                :
                                <AbilityButtonMobile
                                    onClick={() => {
                                        dispatch(setAbilityAction(value.abilityId));
                                        props.update();
                                        if(selector.players.player.abilities.length >= 2) {
                                            dispatch(setValidAction({validFlg: false}));
                                        }
                                    }}>
                                    {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                                </AbilityButtonMobile>
                                }
                            </Tooltip>
                        </Grid>
                        <Grid item xs={2}>
                        {!matches && 
                            <InfoIcon sx={{margin: '50% 10%'}} onClick={() => {
                                console.log('あああ');
                            }}/>
                        }
                        </Grid>
                    </Grid>
                ))}
            </AbilityCard>
        </Typography>
    );
}

export default SelectAbilityComponent;