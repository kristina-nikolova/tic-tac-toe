import React, { Component } from 'react';
// import '../styles/components/ResetButton.scss';

class Score extends Component {
  /**
   * @props score()
  **/

  render() {
    return (
      <div>
      	<div><span className="bold">Player:</span>{this.props.score.playerScore}</div>
        <div><span className="bold">Ties:</span>{this.props.score.tiesScore}</div>
        <div><span className="bold">Computer:</span>{this.props.score.aiScore}</div>
      </div>
    )
  }
}

export default Score;