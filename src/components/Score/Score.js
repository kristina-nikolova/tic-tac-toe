import React from 'react';
import styles from './Score.scss';

const Score = ({score, level, player, aiPlayer}) => (
    <div className={styles.scoreWrap}>
      <h2 className={styles.level}>
        <div className={styles.label}>Level</div> 
        <div className={styles.number}>{level}</div></h2>
      <div className={'card ' + styles.scoreBoard}>
        <div>
          <span className={styles.scoreLabel}>Player ({player}):</span>
          <span className={styles.scoreValue}>{score.playerScore}</span>
        </div>
        <div>
          <span className={styles.scoreLabel}>Ties:</span>
          <span className={styles.scoreValue}>{score.tiesScore}</span></div>
        <div>
          <span className={styles.scoreLabel}>Computer ({aiPlayer}):</span>
          <span className={styles.scoreValue}>{score.aiScore}</span></div>
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