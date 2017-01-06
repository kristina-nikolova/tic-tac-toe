import React, { Component } from 'react';
import './Tile.scss';

class Tile extends Component {
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

Tile.propTypes = {
  loc: React.PropTypes.number.isRequired,
  value: React.PropTypes.string,
  winningPath: React.PropTypes.array,
  updateBoard: React.PropTypes.func.isRequired
};

export default Tile;