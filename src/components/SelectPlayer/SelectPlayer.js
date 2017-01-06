import React, { Component } from 'react';

class SelectPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedPlayer: 'x'
        }

        this.selectPlayerHandler = this.selectPlayerHandler.bind(this);
    }

  	selectPlayerHandler(event) {
      this.setState({selectedPlayer: event.target.value});
      /**
      ** Update player in the parent state
      **/
      this.props.selectPlayer(this.state.selectedPlayer);
    }

	render() {
	  return (
      <select value={this.state.selectedPlayer} onChange={this.selectPlayerHandler}>
        <option value="x">Player X</option>
        <option value="o">Player O</option>
      </select>
	  );
	}
}

SelectPlayer.propTypes = {
  selectPlayer: React.PropTypes.func.isRequired
};

export default SelectPlayer;