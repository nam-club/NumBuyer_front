import React from 'react';
import { useSelector } from 'react-redux';

import { MyPlayerList, PlayerList, PlayerName, PlayerInfoIcon, PlayerInfo } from '../theme';
import coin from '../../assets/coin.png';
import card from '../../assets/card.png';

import { Typography } from '@mui/material';

const PlayerInfoComponent = (props) => {
    const selector = useSelector(state => state);

    console.log(props.myPlayer);
    console.log(props.players);

    return (
        <Typography>
            {props.myPlayer &&
                <MyPlayerList>
                    <PlayerName><b>{props.myPlayer.playerName}</b></PlayerName>
                    <PlayerInfoIcon src={card} /><PlayerInfo>×{props.myPlayer.cardNum}　</PlayerInfo>
                    <PlayerInfoIcon src={coin} /> <PlayerInfo>{props.myPlayer.coin + ' ' + selector.msg.lang.COIN}</PlayerInfo>
                </MyPlayerList>
            }
            {props.players && props.players.map((value, index) => (
                <PlayerList key={index}>
                    <PlayerName><b>{value.playerName}</b></PlayerName>
                    <PlayerInfoIcon src={card} /><PlayerInfo>×{value.cardNum}　</PlayerInfo>
                    <PlayerInfoIcon src={coin} /> <PlayerInfo>{value.coin + ' ' + selector.msg.lang.COIN}</PlayerInfo>
                </PlayerList>
            ))}
        </Typography>
    );
}

export default PlayerInfoComponent;