import React, { Component } from 'react';

class ResetButton extends Component {
  /**
   * @props reset()
  **/

  render() {
    return (
      <button className="board__button-reset" onClick={this.props.reset}>Reset</button>
    )
  }
}

export default ResetButton;