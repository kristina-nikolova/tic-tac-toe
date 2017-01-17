import React from 'react';
import styles from './SelectPlayer.scss';

const SelectPlayer = ({selectedPlayer, selectPlayerHandler}) => {
  const playerX = 'x';
  const playerO = 'o';

  return (
    <div className={'center ' + styles.selectPlayerWrap}>
      <div>Select player:</div> 
      <button value={playerX} 
              className={'button ' + styles.buttonSelectPlayer + (playerX === selectedPlayer ? ' selected' : ' ')}
              onClick={() => selectPlayerHandler(playerX)}>X</button>
      <button value={playerO}
              className={'button ' + styles.buttonSelectPlayer + (playerO === selectedPlayer ? ' selected' : ' ')}
              onClick={() => selectPlayerHandler(playerO)}>O</button>
    </div>  
)};

SelectPlayer.propTypes = {
  selectedPlayer: React.PropTypes.string,
  selectPlayerHandler: React.PropTypes.func.isRequired
};

export default SelectPlayer;