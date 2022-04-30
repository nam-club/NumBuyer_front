import React from 'react';
import { useSelector } from 'react-redux';

import * as Constants from '../../constants';
import PlayerInfoAbilityComponent from './PlayerInfoAbilityComponent';

import { MyPlayerList, PlayerList, PlayerName, PlayerInfoIcon, PlayerInfo, AbilityInfoCard, SpeechBubble } from '../theme';
import coin from '../../assets/coin.png';
import card from '../../assets/card.png';

import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { teal, red, blue, yellow, grey } from '@mui/material/colors';

const PlayerInfoComponent = (props) => {
    const selector = useSelector(state => state);
    const [myAbilities, setMyAbilities] = React.useState([]); // 自分の所持アビリティ
    const prvAbilities = [Constants.PRV_ABILITY, Constants.PRV_ABILITY]; // 非公開アビリティ

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

    React.useEffect(() => {
        // 発動アビリティが1つの時に片方をグレーにする
        if(props.myPlayer.firedAbilities && props.myPlayer.firedAbilities.length === 1) {
            let greyAbilities = myAbilities.filter((d) => {return d.abilityId !== props.myPlayer.firedAbilities[0].abilityId});
            for(let g of greyAbilities) {
                g.type = Constants.NON_TP;
                props.myPlayer.firedAbilities.push(g);
            }
            console.log(props.myPlayer.firedAbilities);
        }
    }, [props.myPlayer]);

    return (
        <Typography>
            {props.myPlayer &&
                <MyPlayerList>
                    <PlayerName><b>{props.myPlayer.playerName}</b></PlayerName>
                    <PlayerInfoIcon src={card} /><PlayerInfo>×{props.myPlayer.cardNum}　</PlayerInfo>
                    <PlayerInfoIcon src={coin} /> <PlayerInfo>{props.myPlayer.coin + ' ' + selector.msg.lang.COIN}</PlayerInfo>
                        {props.myPlayer.firedAbilities && props.myPlayer.firedAbilities.length > 0 ?
                            <div>
                                 <Grid container>
                                    {props.myPlayer.firedAbilities.map((value, index) => (
                                        <Grid item xs={6}>
                                                <div key={index}>
                                                {value.type === Constants.BST_TP ? 
                                                    <PlayerInfoAbilityComponent ability={value} background={blue[300]} color={grey[50]} />    : 
                                                    <div>
                                                        {value.type === Constants.ATK_TP ? 
                                                            <PlayerInfoAbilityComponent ability={value} background={red[300]} color={grey[50]} />
                                                        :
                                                            <div>
                                                                {value.type === Constants.RCV_TP ? 
                                                                    <PlayerInfoAbilityComponent ability={value} background={teal[300]} color={grey[50]} /> 
                                                                :
                                                                    <div>
                                                                        {value.type === Constants.JAM_TP ? 
                                                                            <PlayerInfoAbilityComponent ability={value} background={yellow[300]} color={grey[700]} /> 
                                                                        :
                                                                            <div>
                                                                                {value.type === Constants.CNF_TP ? 
                                                                                    <PlayerInfoAbilityComponent ability={value} background={grey[700]} color={grey[50]} />
                                                                                :
                                                                                    <PlayerInfoAbilityComponent ability={value} background={grey[400]} color={grey[700]} />
                                                                                }
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                }
                                                            </div>
                                                        }
                                                    </div>
                                                }
                                                </div>
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
                                            <div key={faIndex}>
                                            {fa.type === Constants.BST_TP ? 
                                                <PlayerInfoAbilityComponent ability={fa} background={blue[300]} color={grey[50]} />
                                            : 
                                                <div>
                                                    {fa.type === Constants.ATK_TP ? 
                                                        <PlayerInfoAbilityComponent ability={fa} background={red[300]} color={grey[50]} />
                                                    :
                                                        <div>
                                                            {value.type === Constants.RCV_TP ? 
                                                                <PlayerInfoAbilityComponent ability={fa} background={teal[300]} color={grey[50]} /> 
                                                            :
                                                                <div>
                                                                    {fa.type === Constants.JAM_TP ? 
                                                                        <PlayerInfoAbilityComponent ability={fa} background={yellow[300]} color={grey[700]} /> 
                                                                    :
                                                                        <div>
                                                                            {fa.type === Constants.CNF_TP ?
                                                                                <PlayerInfoAbilityComponent ability={fa} background={grey[700]} color={grey[50]} />
                                                                            :
                                                                                <PlayerInfoAbilityComponent ability={fa} background={grey[400]} color={grey[700]} />
                                                                            }
                                                                        </div>
                                                                    }
                                                                </div>
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            }
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        }
                </PlayerList>
            ))}
        </Typography>
    );
}

export default PlayerInfoComponent;