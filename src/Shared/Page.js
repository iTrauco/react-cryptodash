import React from 'react';
import { AppContext } from '../App/AppProvider';

// #15 @ 01:17
export default function ({name, children}) {
    return <AppContext.Consumer>
        {({page}) => {
            if (page !== name) {
                return null;
            }
            return <div> {children} </div>;
        }}
    </AppContext.Consumer>;
}