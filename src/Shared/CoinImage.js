import React from 'react';
import styled, {css} from 'styled-components';

const CoinImage = styled.img `
    height: 50px;
    ${props => props.spotlight && css `
    height: 200px;
    `}
`

export default function ({coin, spotlight}) {
    return <CoinImage
    spotlight={spotlight}
    alt={coin.CoinSymbol}
    // style={style || {height: '50px'}}
    src={`http://cryptocompare.com/${
        coin.ImageUrl
    }`}
    />;
}