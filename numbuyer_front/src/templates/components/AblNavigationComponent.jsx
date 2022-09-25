import React from 'react';

import { MessageBox, NaviMessage, NaviMessages } from '../theme';
import { MessageBoxMobile, NaviMessageMobile, NaviMessagesMobile, WrapMessageMobile } from '../themeMobile';


import { useMediaQuery } from "@mui/material";

const AblNavigationComponent = (props) => {
    const matches = useMediaQuery("(min-width:520px)");

    return (
        <div>
        {matches ?
        <MessageBox sx={{background: props.background, backgroundImage: props.bgImage, color:props.color, 'textShadow': '2px 4px 6px #000000'}}>
            <NaviMessage>{props.message}</NaviMessage>
            <NaviMessages>{props.effect}</NaviMessages>
        </MessageBox>
        :
        <WrapMessageMobile>
            <MessageBoxMobile sx={{background: props.background, backgroundImage: props.bgImage, color:props.color, 'textShadow': '2px 4px 6px #000000'}}>
                <NaviMessageMobile>{props.message}</NaviMessageMobile>
                <NaviMessagesMobile>{props.effect}</NaviMessagesMobile>
            </MessageBoxMobile>
        </WrapMessageMobile>
        }
        </div>
    );
}

export default AblNavigationComponent;