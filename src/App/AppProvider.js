import React from 'react';
// #14 @ 00:40
const cc = require('cryptocompare');
// #12 @ 03:24
export const AppContext = React.createContext();

// default state
export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard',
            // #13 @ 02:20
            ...this.savedSettings(),
            setPage: this.setPage,
            confirmFavorites: this.confirmFavorites
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

    confirmFavorites = () => {
        this.setState ({
            firstVisit: false,
            page: 'dashboard'
        });
        // console.log('Hello, it\'s me...')
        // #13 @ 08:36
        localStorage.setItem('cryptodash', JSON.stringify({
            test: 'hello'
        }));
    }

    // # 13 @ 03:10
    savedSettings() {
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'))
        if(!cryptoDashData) {
            return {page: 'settings', firstVisit: true}
        }
        return {};
    }

    // #12 @ 02:50
    setPage = page => this.setState({page})
    // # 12 @ 04:04
    render() {
        return (
            <AppContext.Provider value={this.state}>
            {this.props.children}
           </AppContext.Provider>
        )
    }
}