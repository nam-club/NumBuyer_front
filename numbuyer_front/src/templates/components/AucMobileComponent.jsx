import React from 'react';
import { useSelector } from 'react-redux';

import * as Constants from '../../constants';

import { WrapDisplay } from '../theme';
import { AreaTagMobile, AuctionCardMobile, CardValueMobile } from '../themeMobile';

import { grey } from '@mui/material/colors';
import Slide from '@mui/material/Slide';

const AucMobileComponent = (props) => {
    const selector = useSelector(state => state);

    const [fade, setFade] = React.useState(false); // フェードイン用フラグ

    React.useEffect(() => {
        if(selector.game.phase === Constants.SHOW_AUC_PH) {
            setFade(false);
            setFade(true);
        }
    }, [selector.game.phase]);

    return (
        <div>
            {(props.auctionCards.length !== 0 && (selector.game.phase === Constants.AUCTION_PH))
            &&
            <div>
                <AreaTagMobile align="left" sx={{margin: '2%', color: grey[50]}}>{selector.msg.lang.AUCTION}</AreaTagMobile>
                <WrapDisplay>
                    {props.auctionCards.auctionCards.map((value, index) => (
                        <Slide direction="down" in={fade} mountOnEnter unmountOnExit timeout={1500} key={index}>
                            <AuctionCardMobile variant="contained">
                                <CardValueMobile>{value}</CardValueMobile>
                            </AuctionCardMobile>
                        </Slide>
                    ))}  
                </WrapDisplay>
            </div>
            }
        </div>
    )
}

export default AucMobileComponent;