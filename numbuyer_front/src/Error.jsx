import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { setLangAction } from './redux/msg/actions';

import {
  MainLogo, MainTitle, VerMsg, BackToTopButton, InfoMsg
} from './templates/theme';
import {
  MainLogoMobile, MainTitleMobile, VerMsgMobile, BackToTopButtonMobile
} from './templates/themeMobile';

import * as Constants from './constants';
import * as ConstantsMsg from './constantsMsg';
import GlobalStyle from "./globalStyles";

import logo from './assets/logo.png';
import title from './assets/title.png';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { grey } from '@mui/material/colors';
import { useMediaQuery } from "@mui/material";


const Error = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const matches = useMediaQuery("(min-width:520px)");

  const language = window.navigator.language;
  switch (language) {
    case Constants.ENGLISH:
      dispatch(setLangAction(ConstantsMsg.English));
      break;
    case Constants.JAPANESE:
      dispatch(setLangAction(ConstantsMsg.Japanese));
      break;
    case Constants.CHINESE:
      dispatch(setLangAction(ConstantsMsg.Chinese));
      break;
    default:
      break;
  }

  return (
    <Typography component="div" align="center" sx={{ color: grey[50] }}>
      <GlobalStyle />
      {matches ?
        <>
          <Grid container>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={2}>
                  <MainLogo src={logo} />
                </Grid>
                <Grid item xs={8}>
                  <MainTitle src={title} />
                </Grid>
                <Grid item xs={2}>
                  <VerMsg sx={{ color: grey[50], fontSize: '1.5em' }}>( {Constants.VERSION} )</VerMsg>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3} />
          </Grid>
          <InfoMsg sx={{ fontSize: '4em' }}>404</InfoMsg>
          <InfoMsg sx={{ fontSize: '2em' }}>{selector.msg.lang.NOT_FOUND_ERR}</InfoMsg>
          <BackToTopButton size="large" variant="contained"
            onClick={() => {
              dispatch(push('/'));
            }}>{selector.msg.lang.BACK_TOP_BTN}
          </BackToTopButton>
        </>
        :
        <>
          <div><MainLogoMobile src={logo} /></div>
          <Grid container>
            <Grid item xs={2} />
            <Grid item xs={8}>
              <MainTitleMobile src={title} />
            </Grid>
            <Grid item xs={2}>
              <VerMsgMobile sx={{ color: grey[50], fontSize: '0.75em' }}>( {Constants.VERSION} )</VerMsgMobile>
            </Grid>
          </Grid>
          <InfoMsg sx={{ fontSize: '4em' }}>404</InfoMsg>
          <InfoMsg sx={{ fontSize: '2em' }}>{selector.msg.lang.NOT_FOUND_ERR}</InfoMsg>
          <BackToTopButtonMobile size="large" variant="contained"
            onClick={() => {
              dispatch(push('/'));
            }}>{selector.msg.lang.BACK_TOP_BTN}
          </BackToTopButtonMobile>
        </>
      }
    </Typography>
  )
}
export default Error;