import React, { Component } from 'react';
import logo from '../assets/logo.svg';
// import Clock from './Clock';
// import ResetButton from './ResetButton';
// import LoginControl from './LoginControl';
import TicTacToe from './TicTacToe';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Tic Tac Toe Game</h2>
        </div>
        <div className="App-content">
            <TicTacToe width={ 3 } singlePlayer />
        </div>
      </div>
    );
  }
}

export default App;
