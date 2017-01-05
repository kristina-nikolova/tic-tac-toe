import React, { Component } from 'react';
import './ResetButton.scss';

class ResetButton extends Component {
  render() {
    return (
      <button className="button--reset" onClick={this.props.reset}>Reset</button>
    )
  }
}

ResetButton.propTypes = {
  reset: React.PropTypes.func,
  winningPath: React.PropTypes.array
};

export default ResetButton;