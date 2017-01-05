import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './Header.scss';

class Header extends Component {
  render() {
    return (
      <div className="game__header">
          <img src={logo} className="header__logo" alt="logo" />
          <h1 className="header__title">{this.props.message}</h1>
      </div>
    )
  }
}

Header.propTypes = {
  message: React.PropTypes.string
};

export default Header;