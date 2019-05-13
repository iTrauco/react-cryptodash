import React from 'react';
import styled from 'styled-components';
import { backgroundColor2, fontSize2 } from '../Shared/Styles';
import { AppContext } from '../App/AppProvider';
import _ from 'lodash';
import fuzzy from 'fuzzy';

const SearchGrid = styled.div `
    display: grid;
    grid-template-columns: 200px 1fr;
`

const SearchInput = styled.input `
    ${backgroundColor2}
    ${fontSize2}
    border: 1px solid;
    height: 25px;
    color: #1163c9;
    place-self: center left;
`
//#26 @ 05:13
const handleFilter = _.debounce((inputValue, coinList, setFilteredCoins) => {
    // console.log(inputValue)
    // Gert all the coin symbols
    let coinSymbols = Object.keys(coinList);
    //Get all the coin names and map symbol to name
    let coinNames = coinSymbols.map(sym => coinList[sym].CoinName)
    let allStringsToSearch = coinSymbols.concat(coinNames);
    // console.log(allStringsToSearch);
    let fuzzyResults = fuzzy
    .filter(inputValue, allStringsToSearch, {})
    .map(result => result.string);
    // console.log(fuzzyResults);
    let filteredCoins = _.pickBy(coinList, (result, symKey) => {
        let coinName = result.CoinName;
        return (_.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName));
    });

    console.log(filteredCoins);
    setFilteredCoins(filteredCoins);
}, 500);

//#26 @ 03:13
function filterCoins(e, setFilteredCoins, coinList){
    let inputValue = e.target.value;
    // console.log(inputValue);
    if( !inputValue){
        setFilteredCoins(null);
        return;
    }
    handleFilter(inputValue, coinList, setFilteredCoins);
}

export default function () {
    return (
        <AppContext.Consumer>
            {({setFilteredCoins, coinList}) =>
                 <SearchGrid> 
                     <h2> Search all coins</h2>
                <SearchInput onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}/>
                </SearchGrid>
        }
        </AppContext.Consumer>
    );
}