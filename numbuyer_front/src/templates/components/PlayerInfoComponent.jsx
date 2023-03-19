import React from 'react';
import { useSelector } from 'react-redux';

import * as Constants from '../../constants';
import PlayerInfoAbilityComponent from './organisms/PlayerInfoAbilityComponent';

import { MyPlayerList, PlayerList, PlayerName, PlayerInfoIcon, PlayerInfo } from '../theme';
import { PlayerListMobile, PlayerNameMobile, PlayerInfoIconMobile, PlayerInfoMobile, FluctPlusMobile, FluctMinusMobile } from '../themeMobile';

import coin from '../../assets/coin.png';
import card from '../../assets/card.png';

import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { grey, yellow } from '@mui/material/colors';
import { useMediaQuery } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';

const PlayerInfoComponent = (props) => {
    const selector = useSelector(state => state);
    const [myAbilities, setMyAbilities] = React.useState([]); // 自分の所持アビリティ
    const prvAbilities = Constants.PRV_ABILITIES; // 非公開アビリティ

    const matches = useMediaQuery("(min-width:520px)");

    const useStyles = makeStyles((theme) => ({
        name: {
          fontSize: 'calc(0.05vw + 0.7em)', // 親要素の幅に合わせて文字サイズを変更する
        },
      }));

    const classes = useStyles();

    React.useEffect(() => {
        setMyAbilities(selector.players.player.abilities);
    }, [selector.players.player.abilities]);

    React.useEffect(() => {
        // 発動アビリティが1つの時に片方を「???」にする
        for (let p of props.players) {
            if (p.firedAbilities && p.firedAbilities.length === 1) {
                p.firedAbilities.push(Constants.PRV_ABILITIES[0]);
            }
        }
    }, [props.players]);

    return (
        <Typography>
            {matches ?
                <div>
                    {props.myPlayer &&
                        <MyPlayerList>
                            <PlayerName>{props.myPlayer.playerName}</PlayerName>
                            <PlayerInfoIcon src={card} /><PlayerInfo>×{props.myPlayer.cardNum}　</PlayerInfo>
                            <PlayerInfoIcon src={coin} /> <PlayerInfo>{props.myPlayer.coin + ' ' + selector.msg.lang.COIN}</PlayerInfo>
                            {props.myPlayer.fluctCoin !== '' &&
                                <PlayerInfo>{props.myPlayer.fluctCoin}</PlayerInfo>
                            }
                            {props.myPlayer.firedAbilities && props.myPlayer.firedAbilities.length > 0 ?
                                <div>
                                    <Grid container>
                                        {props.myPlayer.firedAbilities.map((value) => (
                                            <Grid item xs={6}>
                                                <PlayerInfoAbilityComponent key={value.abilityId} ability={value} bgImage={value.selectedBgImage} color={value.tagColor} textShadow='2px 4px 6px #000000' />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                                :
                                <div>
                                    <Grid container>
                                        {myAbilities.map((value) => (
                                            <Grid item xs={6} key={value.abilityId}>
                                                <PlayerInfoAbilityComponent ability={value} background={grey[400]} color={grey[700]} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            }
                        </MyPlayerList>
                    }
                    {props.players && props.players.map((value) => (
                        <PlayerList key={value.playerId}>
                            <PlayerName>{value.playerName}</PlayerName>
                            <PlayerInfoIcon src={card} /><PlayerInfo>×{value.cardNum}　</PlayerInfo>
                            <PlayerInfoIcon src={coin} /> <PlayerInfo>{value.coin + ' ' + selector.msg.lang.COIN}</PlayerInfo>
                            {(!value.firedAbilities || value.firedAbilities.length === 0) ?
                                <div>
                                    <Grid container>
                                        {prvAbilities.map((pa) => (
                                            <Grid item xs={6} key={pa.abilityId}>
                                                <PlayerInfoAbilityComponent ability={pa} background={grey[400]} color={grey[700]} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                                :
                                <div>
                                    <Grid container>
                                        {value.firedAbilities.map((fa) => (
                                            <Grid item xs={6} key={fa.abilityId}>
                                                <PlayerInfoAbilityComponent ability={fa} bgImage={fa.selectedBgImage} color={fa.tagColor} textShadow='2px 4px 6px #000000' />
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
                    <Grid container>
                        {props.myPlayer &&
                            <Grid item xs={3}>
                                <PlayerListMobile sx={{ background: yellow[100] }}>
                                    <PlayerNameMobile noWrap className={classes.name} variant='p'>{props.myPlayer.playerName}</PlayerNameMobile>
                                    <Grid container>
                                        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <PlayerInfoIconMobile src={card} />
                                            <PlayerInfoMobile>{props.myPlayer.cardNum}</PlayerInfoMobile>
                                            {(props.myPlayer.fluctCard && props.myPlayer.fluctCard.code === '+') &&
                                                <FluctPlusMobile> {props.myPlayer.fluctCard.value}</FluctPlusMobile>
                                            }
                                            {(props.myPlayer.fluctCard && props.myPlayer.fluctCard.code === '-') &&
                                                <FluctMinusMobile> {props.myPlayer.fluctCard.value}</FluctMinusMobile>
                                            }
                                        </Grid>
                                        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <PlayerInfoIconMobile src={coin} sx={{ marginBottom: '20%' }} />
                                            <PlayerInfoMobile>{props.myPlayer.coin}</PlayerInfoMobile>
                                            {(props.myPlayer.fluctCoin && props.myPlayer.fluctCoin.code === '+') &&
                                                <FluctPlusMobile> {props.myPlayer.fluctCoin.value}</FluctPlusMobile>
                                            }
                                            {(props.myPlayer.fluctCoin && props.myPlayer.fluctCoin.code === '-') &&
                                                <FluctMinusMobile> {props.myPlayer.fluctCoin.value}</FluctMinusMobile>
                                            }
                                        </Grid>
                                    </Grid>
                                    {props.myPlayer.firedAbilities && props.myPlayer.firedAbilities.length > 0 ?
                                        <div>
                                            <Grid container>
                                                {props.myPlayer.firedAbilities.map((value) => (
                                                    <Grid item xs={6} key={value.abilityId}>
                                                        <PlayerInfoAbilityComponent ability={value} bgImage={value.selectedBgImage} color={value.tagColor} textShadow='2px 4px 6px #000000' />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </div>
                                        :
                                        <div>
                                            <Grid container>
                                                {myAbilities.map((value) => (
                                                    <Grid item xs={6} key={value.abilityId}>
                                                        <PlayerInfoAbilityComponent ability={value} background={grey[400]} color={grey[700]} />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </div>
                                    }
                                </PlayerListMobile>
                            </Grid>
                        }
                        {props.players && props.players.map((value) => (
                            <Grid item xs={3}>
                                <PlayerListMobile key={value.playerId}>
                                    <PlayerNameMobile noWrap className={classes.name} variant='p'>{value.playerName}</PlayerNameMobile>
                                    <Grid container>
                                        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <PlayerInfoIconMobile src={card} />
                                            <PlayerInfoMobile>{value.cardNum}</PlayerInfoMobile>
                                            {(value.fluctCard && value.fluctCard.code === '+') &&
                                                <FluctPlusMobile> {value.fluctCard.value}</FluctPlusMobile>
                                            }
                                            {(value.fluctCard && value.fluctCard.code === '-') &&
                                                <FluctMinusMobile> {value.fluctCard.value}</FluctMinusMobile>
                                            }
                                        </Grid>
                                        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <PlayerInfoIconMobile src={coin} sx={{ marginBottom: '20%' }} />
                                            <PlayerInfoMobile>{value.coin}</PlayerInfoMobile>
                                            {(value.fluctCoin && value.fluctCoin.code === '+') &&
                                                <FluctPlusMobile> {value.fluctCoin.value}</FluctPlusMobile>
                                            }
                                            {(value.fluctCoin && value.fluctCoin.code === '-') &&
                                                <FluctMinusMobile> {value.fluctCoin.value}</FluctMinusMobile>
                                            }
                                        </Grid>
                                    </Grid>
                                    {(!value.firedAbilities || value.firedAbilities.length === 0) ?
                                        <div>
                                            <Grid container>
                                                {prvAbilities.map((pa) => (
                                                    <Grid item xs={6} key={pa.abilityId}>
                                                        <PlayerInfoAbilityComponent ability={pa} background={grey[400]} color={grey[700]} />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </div>
                                        :
                                        <div>
                                            <Grid container>
                                                {value.firedAbilities.map((fa) => (
                                                    <Grid item xs={6} key={fa.abilityId}>
                                                        <PlayerInfoAbilityComponent ability={fa} bgImage={fa.selectedBgImage} color={fa.tagColor} textShadow='2px 4px 6px #000000' />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </div>
                                    }
                                </PlayerListMobile>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            }
        </Typography>
    );
}

export default PlayerInfoComponent;