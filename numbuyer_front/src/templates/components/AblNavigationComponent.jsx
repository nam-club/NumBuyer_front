import React from 'react';
import { useSelector } from 'react-redux';

import * as Constants from '../../constants';
import { MessageBox, NaviMessage, NaviMessages } from '../theme';
import { MessageBoxMobile, NaviMessageMobile, NaviMessagesMobile, WrapMessageMobile } from '../themeMobile';


import { useMediaQuery } from "@mui/material";

const AblNavigationComponent = (props) => {
    const matches = useMediaQuery("(min-width:520px)");
    const selector = useSelector(state => state);

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
                <NaviMessageMobile sx={{fontSize: Constants.FONT_SIZES.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).fontSize}}>{props.message}</NaviMessageMobile>
                <NaviMessagesMobile>{props.effect}</NaviMessagesMobile>
            </MessageBoxMobile>
        </WrapMessageMobile>
        }
        </div>
    );
}

export default AblNavigationComponent;