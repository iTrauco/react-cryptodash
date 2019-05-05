import React from 'react'
// import React, { Component } from 'react';
import './App.css';
import WelcomeMessage from './WelcomeMessage';
//#7 @ 03:13
// import styled, { css }from 'styled-components';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import { AppProvider } from './AppProvider';


class App extends React.Component {
  render()  {
    return (
      <AppLayout>
        <AppProvider>
          <AppBar/>
          <WelcomeMessage/>
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
