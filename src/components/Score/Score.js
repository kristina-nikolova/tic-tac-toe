import React, { Component } from 'react';

class Score extends Component {
  render() {
    return (
      <div>
        <h2>Level {this.props.level}</h2>
        <div>
          <div><span className="bold">Player:</span>{this.props.score.playerScore}</div>
          <div><span className="bold">Ties:</span>{this.props.score.tiesScore}</div>
          <div><span className="bold">Computer:</span>{this.props.score.aiScore}</div>
        </div>
      </div>
    )
  }
}

Score.propTypes = {
  score: React.PropTypes.object,
  level: React.PropTypes.number
};

export default Score;