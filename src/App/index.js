import React from 'react'
// import React, { Component } from 'react';
import './App.css';
// #13 @ 005:51
// import WelcomeMessage from '../Settings/WelcomeMessage';
//#7 @ 03:13
// import styled, { css }from 'styled-components';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import { AppProvider } from './AppProvider';
import Settings from '../Settings';


class App extends React.Component {
  render()  {
    return (
      <AppLayout>
        <AppProvider>
          <AppBar />
          <Settings />
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
