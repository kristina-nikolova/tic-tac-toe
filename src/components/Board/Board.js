import React from 'react';
import styles from './Board.scss';
import Tile from '../../components/Tile/Tile';

const Board = ({gameBoard, winningPath, updateBoardAfterPlayerMove}) => (
    <div className={styles.board}>
      {gameBoard.map((value, i) => (
          <Tile
            key={i}
            loc={i}
            value={value}
            winningPath={winningPath}
            updateBoardAfterPlayerMove={updateBoardAfterPlayerMove} />
      ))}
    </div>
);

Board.propTypes = {
  gameBoard: React.PropTypes.array.isRequired,
  winningPath: React.PropTypes.array,
  updateBoardAfterPlayerMove: React.PropTypes.func
};

export default Board;
