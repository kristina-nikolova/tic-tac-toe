import React from 'react';

const Score = ({score, level, player, aiPlayer}) => (
    <div>
      <h2>Level {level}</h2>
      <div>
        <div><span className="bold">Player ({player}):</span>{score.playerScore}</div>
        <div><span className="bold">Ties:</span>{score.tiesScore}</div>
        <div><span className="bold">Computer ({aiPlayer}):</span>{score.aiScore}</div>
      </div>
    </div>
);

Score.propTypes = {
  player: React.PropTypes.string.isRequired,
  aiPlayer: React.PropTypes.string.isRequired,
  score: React.PropTypes.object.isRequired,
  level: React.PropTypes.number.isRequired
};

export default Score;