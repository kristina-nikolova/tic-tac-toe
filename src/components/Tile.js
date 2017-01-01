import React, { Component } from 'react';

class Tile extends Component {
	/**
   * @props loc
   * @props value
   * @props turn
   * @props gameLoop()
   */

  	handleTileClick(props) {
  	  //this function is passed from the parent and it is updated from the child on click	
      props.gameLoop(props.loc);
    }

	render() {
	  return (
	    <div className={"board__tile card " + this.props.loc} onClick={() => this.handleTileClick(this.props)}>
	      <p className="board__tile--label">{this.props.value}</p>
	    </div>
	  );
	}
}

export default Tile;