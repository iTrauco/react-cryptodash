import React from 'react'
// import React, { Component } from 'react';
import './App.css';
import WelcomeMessage from './WelcomeMessage';
//#7 @ 03:13
// import styled, { css }from 'styled-components';
import AppLayout from './AppLayout';




class App extends React.Component {
  render()  {
    return (
      <AppLayout>
      <WelcomeMessage/>

      </AppLayout>
    );
  }
}

export default App;
