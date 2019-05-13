import React from 'react';
import _ from 'lodash';

// #14 @ 00:40
const cc = require('cryptocompare');
// #12 @ 03:24
export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

// default state
export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard',
            favorites:['BTC', 'ETH', 'XMR', 'DOGE'],
            // #13 @ 02:20
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setFilteredCoins: this.setFilteredCoins
        }
    }

    componentDidMount = () => { // #14 @ 01:30
        this.fetchCoins();
    }

    fetchCoins = async () => { // #14 @ 01:30
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
        // console.log(coinList)
    }

    addCoin = key => {
        let favorites = [...this.state.favorites];
        if(favorites.length < MAX_FAVORITES){
            favorites.push(key);
            this.setState({favorites});
        }
    }

    removeCoin = key => {
        let favorites = [...this.state.favorites];
        this.setState({favorites: _.pull(favorites, key)})
    }

    isInFavorites = key => _.includes(this.state.favorites, key)

    confirmFavorites = () => {
        this.setState ({
            firstVisit: false,
            page: 'dashboard'
        });
        // console.log('Hello, it\'s me...')
        // #13 @ 08:36
        localStorage.setItem('cryptodash', JSON.stringify({
            favorites: this.state.favorites
        }));
    }

    // # 13 @ 03:10
    savedSettings() {
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'))
        if(!cryptoDashData) {
            return {page: 'settings', firstVisit: true}
        }
        let {favorites} = cryptoDashData;
        return {favorites};
    }

    // #12 @ 02:50
    setPage = page => this.setState({page})
    
    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins}) //#26 @ 00:49
    
    // # 12 @ 04:04
    render() {
        return (
            <AppContext.Provider value={this.state}>
            {this.props.children}
           </AppContext.Provider>
        )
    }
}