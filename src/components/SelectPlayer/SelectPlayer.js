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
      <div>
        <div className={this.props.showSelectPlayer ? '' : 'hidden'}>
          Select player: 
          <button value={playerX} 
                  className={playerX === this.state.selectedPlayer ? 'red--border' : ''}
                  onClick={this.selectPlayerHandler}>X</button>
          <button value={playerO}
                  className={playerO === this.state.selectedPlayer ? 'red--border' : ''}
                  onClick={this.selectPlayerHandler}>O</button>
        </div>
        <div className={this.props.showSelectPlayer ? 'hidden' : ''}>You are the <span className="bold">{this.state.selectedPlayer}</span> player</div>
      </div>  
	  );
	}
}

SelectPlayer.propTypes = {
  showSelectPlayer: React.PropTypes.bool.isRequired,
  selectPlayerHandler: React.PropTypes.func.isRequired
};

export default SelectPlayer;