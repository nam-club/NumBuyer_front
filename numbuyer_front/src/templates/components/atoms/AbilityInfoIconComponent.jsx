import React from 'react';

import { SelectAbilityTooltipMobile } from '../../themeMobile';
import InfoIcon from '@mui/icons-material/Info';

const AbilityInfoIconComponent = (props) => {
    const [openTip, setOpenTip] = React.useState(false);

    const handleCloseTip = () => {
        setOpenTip(false);
    };
    
    const handleOpenTip = () => {
        setOpenTip(true);
    };

    return (
        <SelectAbilityTooltipMobile
            arrow
            PopperProps={{
            disablePortal: true,
            }}
            onClose={handleCloseTip}
            open={openTip}
            disableFocusListener
            disableHoverListener
            placement={props.placement}
            title={props.comment}>
            <InfoIcon sx={{margin: props.margin}} onClick={handleOpenTip}/>
        </SelectAbilityTooltipMobile>
    );
}

export default AbilityInfoIconComponent;