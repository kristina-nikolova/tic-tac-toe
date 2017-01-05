import React, { Component } from 'react';

class Announcement extends Component {
  render() {
    return (
      <div className={this.props.winner ? 'visible' : 'invisible'}>
        <h2>{this.props.message}</h2>
      </div>
    )
  }
}

Announcement.propTypes = {
  winner: React.PropTypes.string,
  message: React.PropTypes.string
};

export default Announcement;