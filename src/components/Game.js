import React, { Component } from 'react';
import Header from './Header';
import Announcement from './Announcement';
import Board from './Board';

class Game extends Component {
  constructor() {
      super();
      this.state = {
        winner: null,
        gameOverMessage: 'Game over!'
      }

      this.gameOverHandler = this.gameOverHandler.bind(this);
      this.resetGameHandler = this.resetGameHandler.bind(this);
  }

  gameOverHandler(winner, message) {
      this.setState({
        winner: winner,
        gameOverMessage: message
      });
  }

  /**
   * @name resetGameHandler
   * @params 
   * @desc Reset the winner and the message
  */
  resetGameHandler(winner, message) {
      this.setState({
        winner: null,
        gameOverMessage: 'Game over!'
      });
  }

  render() {
    return (
      <div className="App center">
        <Header message="Tic Tac Toe"/>
        <div>
          <Announcement winner={this.state.winner} 
                        message={this.state.gameOverMessage} />
          <Board gameOverHandler={this.gameOverHandler}
                 resetGameHandler={this.resetGameHandler} />
        </div>
      </div>
    );
  }
}

export default Game;
