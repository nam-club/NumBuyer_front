import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AbilityCard, AbilityButton, SelectedAbilityButton, AbilitySkillTag, SpeechBubble } from '../theme';

import { setAbilityAction } from '../../redux/players/actions';
import { setValidAction } from '../../redux/msg/actions';

import NavigationComponent from './NavigationComponent';

import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

const AbilityComponent = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    return (
        <Typography component="div" align="center">
            <AbilityCard>
                <NavigationComponent message={props.type} messages={[]} color={props.color} bColor={props.bColor} />
                {props.abilities.map((value) => (
                    selector.players.player.abilities.find((id) => {return id === value.abilityId}) 
                    ?
                    <Tooltip key={value.abilityId} title={
                        <SpeechBubble>
                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                        </SpeechBubble>}
                    placement="bottom">
                        <SelectedAbilityButton
                            sx={[{background: props.btnColor, color: props.fcsTagColor}, 
                                {'&:hover': {background: props.fcsColor}}]}>
                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                        </SelectedAbilityButton>
                    </Tooltip>
                    :
                    <Tooltip key={value.abilityId} title={
                        <SpeechBubble>
                            {value.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                        </SpeechBubble>} 
                        placement="bottom">
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
                    </Tooltip>
                    ))
                }
            </AbilityCard>
        </Typography>
    );
}

export default AbilityComponent;