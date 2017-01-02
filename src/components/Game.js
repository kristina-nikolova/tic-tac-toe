import React, { Component } from 'react';
import Header from './Header';
import Announcement from './Announcement';
import Board from './Board';
import Score from './Score';

class Game extends Component {
  constructor() {
      super();
      this.state = {
        winner: null,
        gameOverMessage: 'Game over!',
        score: {
          playerScore: 0,
          tiesScore: 0,
          aiScore: 0
        }
      }

      this.gameOverHandler = this.gameOverHandler.bind(this);
      this.resetGameHandler = this.resetGameHandler.bind(this);
  }

  gameOverHandler(winner, message) {
    this.setState({
      winner: winner,
      gameOverMessage: message,
      score: {
        playerScore: winner === 'x' ? this.state.score.playerScore + 1 : this.state.score.playerScore,
        tiesScore: winner === 'no winner' ? this.state.score.tiesScore + 1 : this.state.score.tiesScore,
        aiScore: winner === 'o' ? this.state.score.aiScore + 1 : this.state.score.aiScore
      }
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
          <Score score={this.state.score} />       
        </div>
      </div>
    );
  }
}

export default Game;
