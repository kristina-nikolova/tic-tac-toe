import React, { Component } from 'react';

class Announcement extends Component {
  /**
   * @props winner
   * @props message
   */
  render() {
    return (
      <div className={this.props.winner ? 'visible' : 'invisible'}>
        <h2>{this.props.message}</h2>
      </div>
    )
  }
}

export default Announcement;