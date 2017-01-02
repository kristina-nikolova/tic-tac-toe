import React, { Component } from 'react';
import '../styles/components/ResetButton.scss';

class ResetButton extends Component {
  /**
   * @props reset()
  **/

  render() {
    return (
      <button className="button--reset" onClick={this.props.reset}>Reset</button>
    )
  }
}

export default ResetButton;