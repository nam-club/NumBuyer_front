import React from 'react';
import { useSelector } from 'react-redux';

import * as Constants from '../../constants';
import { MessageBox, NaviMessage, NaviMessages } from '../theme';
import { MessageBoxMobile, NaviMessageMobile, NaviMessagesMobile } from '../themeMobile';

import { useMediaQuery } from "@mui/material";

const NavigationComponent = (props) => {
    const matches = useMediaQuery("(min-width:520px)");
    const selector = useSelector(state => state);

    return (
        <div>
        {matches ?
        <MessageBox sx={{background:props.background, backgroundImage:props.backgroundImage, color:props.color, 'textShadow': '2px 4px 6px #000000'}}>
            <NaviMessage>{props.message}</NaviMessage>
            {props.messages.length !==0 && props.messages.messages.map((value, index) => (
                <NaviMessages key={index}>{value}</NaviMessages>))
            }
        </MessageBox>
        :
        <MessageBoxMobile sx={{background:props.background, backgroundImage:props.backgroundImage, color:props.color, 'textShadow': '2px 4px 6px #000000'}}>
            <NaviMessageMobile sx={{fontSize: Constants.FONT_SIZES.find((d) => { return d.lang === selector.msg.lang.LANGUAGE }).fontSize}}>{props.message}</NaviMessageMobile>
            {props.messages.length !==0 && props.messages.messages.map((value, index) => (
                <NaviMessagesMobile key={index}>{value}</NaviMessagesMobile>))
            }
        </MessageBoxMobile>
        }
        </div>
    );
}

export default NavigationComponent;