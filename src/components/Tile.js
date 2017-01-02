import React, { Component } from 'react';
import '../styles/components/Tile.scss';

class Tile extends Component {
	/**
   * @props loc
   * @props value
   * @props turn
   * @props winningPath
   * @props updateBoard()
   */

  	handleTileClick(props) {
      /**
      ** Update board in the parent state when the player makes a move
      **/
      props.updateBoard(props.loc);
    }

	render() {
	  return (
      <div className={this.props.winningPath.indexOf(this.props.loc) !== -1 ? 'tile--winning' : ''}>
  	    <div className={"tile card " + this.props.loc} 
             onClick={() => this.handleTileClick(this.props)}>
  	      <p className="tile--label">{this.props.value}</p>
  	    </div>
      </div>
	  );
	}
}

export default Tile;