import React from 'react';
import { useSelector } from 'react-redux';

import * as Constants from '../../constants';
import { AbilityInfoCard, SpeechBubble } from '../theme';
import { AbilityInfoCardMobile } from '../themeMobile';

import { Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useMediaQuery } from "@mui/material";

const PlayerInfoAbilityComponent = (props) => {
    const selector = useSelector(state => state);
    const matches = useMediaQuery("(min-width:520px)");

    return (
        <Typography>
            {matches ?
            <div>
            {props.ability.abilityId === Constants.PRV_ABILITY.abilityId ?
                <AbilityInfoCard size="large" variant="contained"
                sx={{ background: props.background, color: props.color }}>
                    {props.ability.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                </AbilityInfoCard>
            :
                <Tooltip title={
                    <SpeechBubble>
                        {props.ability.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                    </SpeechBubble>}
                placement="bottom">
                    <AbilityInfoCard size="large" variant="contained"
                    sx={{ background: props.background, color: props.color }}>
                        {props.ability.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                    </AbilityInfoCard>
                </Tooltip>
            }
            </div>
            :
            <div>
            {props.ability.abilityId === Constants.PRV_ABILITY.abilityId ?
                <AbilityInfoCardMobile size="large" variant="contained"
                sx={{ background: props.background, color: props.color }}>
                    {props.ability.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                </AbilityInfoCardMobile>
            :
                <Tooltip title={
                    <SpeechBubble>
                        {props.ability.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                    </SpeechBubble>}
                placement="bottom">
                    <AbilityInfoCardMobile size="large" variant="contained"
                    sx={{ background: props.background, color: props.color }}>
                        {props.ability.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                    </AbilityInfoCardMobile>
                </Tooltip>
            }
            </div>
            }
        </Typography>
    );
}

export default PlayerInfoAbilityComponent;