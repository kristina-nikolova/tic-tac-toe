import React, { Component } from 'react';
import './SelectPlayer.scss';

class SelectPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedPlayer: ''
        }

        this.selectPlayerHandler = this.selectPlayerHandler.bind(this);
    }

  	selectPlayerHandler(event) {
      this.setState({selectedPlayer: event.target.value}, function() {
        /**
        ** Update player in the parent state
        **/
        this.props.selectPlayerHandler(this.state.selectedPlayer);
      });
    }

	render() {
    const playerX = 'x';
    const playerO = 'o';

	  return (
      <div className='select-player__wrap center'>
        <div>Select player:</div> 
        <button value={playerX} 
                className={'button button--select-player ' + (playerX === this.state.selectedPlayer ? 'selected' : '')}
                onClick={this.selectPlayerHandler}>X</button>
        <button value={playerO}
                className={'button button--select-player ' + (playerO === this.state.selectedPlayer ? 'selected' : '')}
                onClick={this.selectPlayerHandler}>O</button>
      </div>  
	  );
	}
}

SelectPlayer.propTypes = {
  selectPlayerHandler: React.PropTypes.func.isRequired
};

export default SelectPlayer;