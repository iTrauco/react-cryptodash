import React from 'react';
import _ from 'lodash';
import moment from 'moment';
// #14 @ 00:40
const cc = require('cryptocompare');
// #12 @ 03:24
export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

const TIME_UNITS = 10;

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
            setCurrentFavorite: this.setCurrentFavorite,
            setFilteredCoins: this.setFilteredCoins
        }
    }

    componentDidMount = () => { // #14 @ 01:30
        this.fetchCoins();
        this.fetchPrices();
        this.fetchHistorical();
    }

    fetchCoins = async () => { // #14 @ 01:30
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
        // console.log(coinList)
    }
    //
////===============================================================================
    // #27 // #27 01:12
    fetchPrices = async () => {
        if(this.state.firstVisit) return;
        let prices = await this.prices();
        console.log(prices);
        this.setState({prices});
    }
    //
////===============================================================================
    // #33 @ 02:30
    fetchHistorical = async () => {
        if (this.state.firstVisit) return;

        const results = await this.historical();
        // console.log('results', results);
        const historical = [
            {
                name: this.state.currentFavorite,
                data: results.map((ticker, index) => [
                    moment().subtract({months: TIME_UNITS - index}).valueOf(),
                        ticker.USD // y axis value
                ])
            }
        ]
        this.setState({historical});
    }
    //
////===============================================================================
    // #27 @ 02:00
    prices = async () => {
        let returnData = [];
        for (let i = 0; i < this.state.favorites.length; i++)   {
            try { 
                let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
                returnData.push(priceData);
             } catch(e) {
                 console.warn('Fetch price error: ', e);
             }
        }
        return returnData;
    }
    //
//////===============================================================================
    // #33 @ 06:47
    historical = () => {
        let promises = [];
        for (let units = TIME_UNITS; units > 0; units--) {
            promises.push(
                cc.priceHistorical(
                    this.state.currentFavorite,
                    ['USD'],
                    moment()
                    .subtract({months: units})
                    .toDate()
                )
            )
        }
        return Promise.all(promises);
    }




    //
//////===============================================================================
    //
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
//    
//=================================================================================
    confirmFavorites = () => {
        let currentFavorite = this.state.favorites[0];
        this.setState ({
            firstVisit: false,
            page: 'dashboard',
            currentFavorite,
            prices: null,
            historical: null
        }, () => { // #27 00:58 
            this.fetchPrices(); // #27 00:58 
            this.fetchHistorical();
        });

        // console.log('Hello, it\'s me...')
        // #13 @ 08:36
        localStorage.setItem('cryptodash', JSON.stringify({
            favorites: this.state.favorites,
            currentFavorite
        }));
    }

    // #29 @ 06:26
    setCurrentFavorite = (sym) => {
        this.setState({
            currentFavorite: sym,
            historical: null
        }, this.fetchHistorical);

        localStorage.setItem('cryptoDash', JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoDash')),
            currentFavorite: sym
        }))
    }

    // # 13 @ 03:10
    savedSettings() {
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'))
        if(!cryptoDashData) {
            return {page: 'settings', firstVisit: true}
        }
        let {favorites, currentFavorite} = cryptoDashData;
        return {favorites, currentFavorite};
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