import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLoginClick() {
    this.setState(prevState => ({isLoggedIn: true}))
  }

   handleLogoutClick() {
    this.setState(prevState => ({isLoggedIn: false}))
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button = null;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        {button}
      </div>
    )
  }
}

export default LoginControl;