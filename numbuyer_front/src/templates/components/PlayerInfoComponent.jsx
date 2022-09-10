import React from 'react';
import { useSelector } from 'react-redux';

import * as Constants from '../../constants';
import PlayerInfoAbilityComponent from './organisms/PlayerInfoAbilityComponent';

import { useStyles, MyPlayerList, PlayerList, PlayerName, PlayerInfoIcon, PlayerInfo, AbilityInfoCard, SpeechBubble } from '../theme';
import { MyPlayerListMobile, PlayerListMobile, PlayerNameMobile, PlayerInfoIconMobile, PlayerInfoMobile } from '../themeMobile';

import coin from '../../assets/coin.png';
import card from '../../assets/card.png';

import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { teal, red, blue, amber, grey } from '@mui/material/colors';
import { useMediaQuery } from "@mui/material";

const PlayerInfoComponent = (props) => {
    const classes = useStyles();
    const selector = useSelector(state => state);
    const [myAbilities, setMyAbilities] = React.useState([]); // 自分の所持アビリティ
    const prvAbilities = [Constants.PRV_ABILITY, Constants.PRV_ABILITY]; // 非公開アビリティ

    const matches = useMediaQuery("(min-width:520px)");

    React.useEffect(() => {
        setMyAbilities(selector.players.player.abilities);
    }, [selector.players.player.abilities]);

    React.useEffect(() => {
        // 発動アビリティが1つの時に片方を「???」にする
        for(let p of props.players) {
            if(p.firedAbilities && p.firedAbilities.length === 1) {
                p.firedAbilities.push(Constants.PRV_ABILITY);
            }
        }
    }, [props.players]);

    return (
        <Typography>
            {matches ?
            <div>
            {props.myPlayer &&
                <MyPlayerList>
                    <PlayerName><b>{props.myPlayer.playerName}</b></PlayerName>
                    <PlayerInfoIcon src={card} /><PlayerInfo>×{props.myPlayer.cardNum}　</PlayerInfo>
                    <PlayerInfoIcon src={coin} /> <PlayerInfo>{props.myPlayer.coin + ' ' + selector.msg.lang.COIN}</PlayerInfo>
                    {props.myPlayer.fluctCoin !== '' &&
                        <PlayerInfo>{props.myPlayer.fluctCoin}</PlayerInfo>
                    }
                    {props.myPlayer.firedAbilities && props.myPlayer.firedAbilities.length > 0 ?
                        <div>
                            <Grid container>
                            {props.myPlayer.firedAbilities.map((value, index) => (
                                <Grid item xs={6}>
                                    <PlayerInfoAbilityComponent key={index} ability={value} bgImage={value.selectedBgImage} color={value.tagColor} textShadow='2px 4px 6px #000000' />
                                </Grid>
                            ))}
                            </Grid>
                        </div>
                    :
                    <div>
                        <Grid container>
                            {myAbilities.map((value, index) => (
                                <Grid item xs={6} key={index}>
                                    <PlayerInfoAbilityComponent ability={value} background={grey[400]} color={grey[700]} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    }
                </MyPlayerList>
            }
            {props.players && props.players.map((value, index) => (
                <PlayerList key={index}>
                    <PlayerName><b>{value.playerName}</b></PlayerName>
                    <PlayerInfoIcon src={card} /><PlayerInfo>×{value.cardNum}　</PlayerInfo>
                    <PlayerInfoIcon src={coin} /> <PlayerInfo>{value.coin + ' ' + selector.msg.lang.COIN}</PlayerInfo>
                        {(!value.firedAbilities || value.firedAbilities.length === 0) ?
                            <div>
                                <Grid container>
                                    {prvAbilities.map((pa,paIndex) => (
                                        <Grid item xs={6}>
                                            <PlayerInfoAbilityComponent key={paIndex} ability={pa} background={grey[400]} color={grey[700]} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        :
                            <div>
                                <Grid container>
                                    {value.firedAbilities.map((fa,faIndex) => (
                                        <Grid item xs={6}>
                                            <PlayerInfoAbilityComponent key={faIndex} ability={fa} bgImage={fa.selectedBgImage} color={fa.tagColor} textShadow='2px 4px 6px #000000' />
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        }
                </PlayerList>
            ))}
            </div>
            :
            <div>
            {props.myPlayer &&
                <MyPlayerListMobile>
                    <Grid container>
                        <Grid item xs={6}>
                            <PlayerNameMobile><b>{props.myPlayer.playerName}</b></PlayerNameMobile>
                        </Grid>
                        <Grid item xs={6}>
                            <PlayerInfoIconMobile src={card} /><PlayerInfoMobile>{props.myPlayer.cardNum}　</PlayerInfoMobile>
                            <PlayerInfoIconMobile src={coin} /><PlayerInfoMobile>{props.myPlayer.coin}</PlayerInfoMobile>
                        </Grid>
                    </Grid>
                        {props.myPlayer.firedAbilities && props.myPlayer.firedAbilities.length > 0 ?
                            <div>
                                 <Grid container>
                                    {props.myPlayer.firedAbilities.map((value, index) => (
                                        <Grid item xs={6}>
                                            <PlayerInfoAbilityComponent key={index} ability={value} bgImage={value.selectedBgImage} color={value.tagColor} textShadow='2px 4px 6px #000000' />
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        :
                        <div>
                            <Grid container>
                                {myAbilities.map((value, index) => (
                                    <Grid item xs={6}>
                                        <PlayerInfoAbilityComponent key={index} ability={value} background={grey[400]} color={grey[700]} />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                        }
                </MyPlayerListMobile>
            }
            {props.players && props.players.map((value, index) => (
                <PlayerListMobile key={index}>
                    <Grid container>
                        <Grid item xs={6}>
                            <PlayerNameMobile><b>{value.playerName}</b></PlayerNameMobile>
                        </Grid>
                        <Grid item xs={6}>
                            <PlayerInfoIconMobile src={card} /><PlayerInfoMobile>{value.cardNum}　</PlayerInfoMobile>
                            <PlayerInfoIconMobile src={coin} /><PlayerInfoMobile>{value.coin}</PlayerInfoMobile>
                        </Grid>
                    </Grid>
                    {(!value.firedAbilities || value.firedAbilities.length === 0) ?
                        <div>
                            <Grid container>
                                {prvAbilities.map((pa,paIndex) => (
                                    <Grid item xs={6}>
                                        <PlayerInfoAbilityComponent key={paIndex} ability={pa} background={grey[400]} color={grey[700]} />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    :
                        <div>
                            <Grid container>
                                {value.firedAbilities.map((fa,faIndex) => (
                                    <Grid item xs={6}>
                                        <PlayerInfoAbilityComponent key={faIndex} ability={fa} bgImage={fa.selectedBgImage} color={fa.tagColor} textShadow='2px 4px 6px #000000' />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    }
                </PlayerListMobile>
            ))}
            </div>
            }
        </Typography>
    );
}

export default PlayerInfoComponent;