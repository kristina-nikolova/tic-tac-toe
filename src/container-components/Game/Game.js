import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Announcement from '../../components/Announcement/Announcement';
import Score from '../../components/Score/Score';
import Board from '../Board/Board';

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
        },
        loosingPlay:  Math.random() >= 0.5,
        level: 1
      };

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
      },
      loosingPlay:  Math.random() >= 0.5
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
      /**
       * change level if user has 3 wins
       * **/
      this.changeLevelHandler();
  }

  /**
   * @name changeLevelHandler
   * @params 
   * @desc Change game level
  */
  changeLevelHandler() {
    if (this.state.score.playerScore >= 5) {
      this.setState({
        level: this.state.level + 1,
        score: {
          playerScore: 0,
          tiesScore: 0,
          aiScore: 0
        }
      });
    }

    /**
     * change the possibility of loosing game from AI
     */
    switch(this.state.level) {
    case 1:
        this.setState({
          loosingPlay:  Math.random() >= 0.5
        });
        break;
    case 2:
        this.setState({
          loosingPlay:  Math.random() > 0.8
        });
        break;
    case 3:
        this.setState({
          loosingPlay:  false
        });
        break;
    }

  }

  render() {
    return (
      <div className="App center">
        <Header message="Tic Tac Toe"/>
        <div>
          <Announcement winner={this.state.winner} 
                        message={this.state.gameOverMessage} />
          <Board gameOverHandler={this.gameOverHandler}
                 resetGameHandler={this.resetGameHandler}
                 loosingPlay={this.state.loosingPlay} />
          <Score score={this.state.score}
                 level={this.state.level} />       
        </div>
      </div>
    );
  }
}

export default Game;
