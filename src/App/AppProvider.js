import React from 'react';
// #12 @ 03:24
export const AppContext = React.createContext();

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard'
        }
    }
    // #12 @ 02:50
    setpage = page => this.setState({page})

    // # 12 @ 04:04
    render() {
        return (
            <AppContext.Provider value={this.state}>
            {this.props.children}
           </AppContext.Provider>
        )
    }
}