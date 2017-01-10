import React, { Component } from 'react';
import styles from './Tile.scss';

class Tile extends Component {
  	handleTileClick(props) {
      /**
      ** Update board in the parent state when the player makes a move
      **/
      props.updateBoardAfterPlayerMove(props.loc);
    }

	render() {
	  return (
      <div className={this.props.winningPath.indexOf(this.props.loc) !== -1 ? styles.tileWinning : ''}>
  	    <div className={styles.tile + " card " + this.props.loc} 
             onClick={() => this.handleTileClick(this.props)}>
  	      <p className={styles.tileLabel}>{this.props.value}</p>
  	    </div>
      </div>
	  );
	}
}

Tile.propTypes = {
  loc: React.PropTypes.number.isRequired,
  value: React.PropTypes.string,
  winningPath: React.PropTypes.array,
  updateBoardAfterPlayerMove: React.PropTypes.func.isRequired
};

export default Tile;