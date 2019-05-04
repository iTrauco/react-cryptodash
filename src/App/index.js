import React, { Component } from 'react';
import './App.css';

import WelcomeMessage from './WelcomeMessage';
//#7 @ 03:13
import styled, { css }from 'styled-components';

const MyButton = styled.div`
  color: green;
  ${props => props.primary && css`
    color: palevioletred;
  `}
`
// A new component based on Button, but with some override styles
const TomatoButton = styled(MyButton)`
  color: tomato;
  border-color: tomato;
`;

class App extends React.Component {
  render()  {
    return (
      <div>
      <WelcomeMessage/>
      <MyButton> Hello</MyButton>
      <MyButton primary> Hello</MyButton>
      <TomatoButton>Hello</TomatoButton>
      </div>
    );
  }
}

export default App;
