import React, { Component } from 'react';
import '../styles/components/Tile.scss';

class Tile extends Component {
	/**
   * @props loc
   * @props value
   * @props turn
   * @props updateBoard()
   */

  	handleTileClick(props) {
  	  //this function is passed from the parent and it is updated from the child on click	
      props.updateBoard(props.loc);
    }

	render() {
	  return (
	    <div className={"tile card " + this.props.loc} onClick={() => this.handleTileClick(this.props)}>
	      <p className="tile--label">{this.props.value}</p>
	    </div>
	  );
	}
}

export default Tile;