import React from 'react';

class ResetButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState =>  ({isToggleOn: !prevState.isToggleOn})
    )
  }

  render() {
    return (
      //todo: hide if it is empty
      <button onClick={this.handleClick}>Reset</button>
    )
  }
}

export default ResetButton;