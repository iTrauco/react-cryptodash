import React from 'react';
import { AppContext } from '../App/AppProvider';

// ========================================================
// #13 @ 09:01
export default function ({firstVisit}) {
  return(
    <AppContext.Consumer>
    {({firstVisit}) =>
    firstVisit ? <div>
        Welcome to CryptoDash, please select your favorite coins to begin. {' '}
      </div> : null
    }
  </AppContext.Consumer>
  );
};

// ========================================================
// function Welcome() {
// //     return <h1>Welcome to CryptoDash!</h1>;
// //   }

//   export default Welcome;