import React from 'react';

const Score = ({score, level}) => (
    <div>
      <h2>Level {level}</h2>
      <div>
        <div><span className="bold">Player:</span>{score.playerScore}</div>
        <div><span className="bold">Ties:</span>{score.tiesScore}</div>
        <div><span className="bold">Computer:</span>{score.aiScore}</div>
      </div>
    </div>
);

Score.propTypes = {
  score: React.PropTypes.object.isRequired,
  level: React.PropTypes.number.isRequired
};

export default Score;