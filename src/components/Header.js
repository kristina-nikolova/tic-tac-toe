import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../styles/components/Header.scss';

class Header extends Component {
  /**
   * @props message
   */
  render() {
    return (
      <div className="game__header">
          <img src={logo} className="header__logo" alt="logo" />
          <h1 className="header__title">{this.props.message}</h1>
      </div>
    )
  }
}

export default Header;