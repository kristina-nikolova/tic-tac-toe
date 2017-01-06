import React from 'react';
import logo from '../../assets/logo.svg';
import './Header.scss';

const Header = ({message}) => (
    <div className="game__header">
          <img src={logo} className="header__logo" alt="logo" />
          <h1 className="header__title">{message}</h1>
    </div>
);

Header.propTypes = {
  message: React.PropTypes.string.isRequired
};

export default Header;