import React from 'react';
import { useSelector } from 'react-redux';

import * as Constants from '../../../constants';
import { AbilityInfoCard, SpeechBubble } from '../../theme';
import { AbilityInfoCardMobile, PlayerAbilityTooltipMobile } from '../../themeMobile';

import { Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useMediaQuery } from "@mui/material";

const PlayerInfoAbilityComponent = (props) => {
    const selector = useSelector(state => state);
    const matches = useMediaQuery("(min-width:520px)");
    const [openTip, setOpenTip] = React.useState(false);

    const handleCloseTip = () => {
        setOpenTip(false);
    };
    
    const handleOpenTip = () => {
        setOpenTip(true);
    };

    return (
        <Typography>
            {matches ?
            <div>
            {(props.ability.abilityId === Constants.PRV_ABILITIES[0].abilityId || 
              props.ability.abilityId === Constants.PRV_ABILITIES[1].abilityId) ?
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
                    sx={{ background: props.background, color: props.color, backgroundImage: props.bgImage, 'textShadow': props.textShadow }}>
                        {props.ability.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                    </AbilityInfoCard>
                </Tooltip>
            }
            </div>
            :
            <div>
            {(props.ability.abilityId === Constants.PRV_ABILITIES[0].abilityId || 
              props.ability.abilityId === Constants.PRV_ABILITIES[1].abilityId) ?
                <AbilityInfoCardMobile size="large" variant="contained"
                sx={{ background: props.background, color: props.color }}>
                    {props.ability.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                </AbilityInfoCardMobile>
            :
                <PlayerAbilityTooltipMobile
                    PopperProps={{
                    disablePortal: true,
                    }}
                    onClose={handleCloseTip}
                    open={openTip}
                    disableFocusListener
                    disableHoverListener
                    placement="bottom-start"
                    title={props.ability.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}>
                    <AbilityInfoCardMobile size="large" variant="contained"
                    sx={{ background: props.background, color: props.color, backgroundImage: props.bgImage, 'textShadow': props.textShadow }}
                    onClick={handleOpenTip}>
                        {props.ability.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                    </AbilityInfoCardMobile>
                </PlayerAbilityTooltipMobile>
            }
            </div>
            }
        </Typography>
    );
}

export default PlayerInfoAbilityComponent;