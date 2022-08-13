import React from 'react';
import { useSelector } from 'react-redux';

import * as Constants from '../../constants';

import { useStyles, WrapDisplay } from '../theme';
import { AreaTagMobile, AuctionCardMobile, CardValueMobile } from '../themeMobile';

import Card from '@mui/material/Card';
import Slide from '@mui/material/Slide';

const AucMobileComponent = (props) => {
    const classes = useStyles();
    const selector = useSelector(state => state);

    const [fade, setFade] = React.useState(false); // フェードイン用フラグ

    React.useEffect(() => {
        console.log(selector.game.phase + "フェーズ");
        if(selector.game.phase === Constants.SHOW_AUC_PH) {
            setFade(false);
            setFade(true);
        }
    }, [selector.game.phase]);

    return (
        <Card className={classes.auction_root + ' ' + (selector.game.phase === Constants.AUCTION_PH ? classes.auction_root_animation : '')}
        sx={{margin: "0 2%"}}>
            <AreaTagMobile align="left" sx={{marginTop: 0, marginBottom: 0}}>{selector.msg.lang.AUCTION}</AreaTagMobile>
            {(props.auctionCards.length !== 0 && 
                !((selector.game.phase === Constants.READY_PH)
                    || (selector.game.phase === Constants.GIVE_CARD_PH)
                    || (selector.game.phase === Constants.SHOW_TAR_PH)))
            &&
                <WrapDisplay>
                    {props.auctionCards.auctionCards.map((value, index) => (
                        <Slide direction="down" in={fade} mountOnEnter unmountOnExit timeout={1500} key={index}>
                            <AuctionCardMobile variant="contained">
                                <CardValueMobile>{value}</CardValueMobile>
                            </AuctionCardMobile>
                        </Slide>
                    ))}  
                </WrapDisplay>
            }
        </Card>
    )
}

export default AucMobileComponent;