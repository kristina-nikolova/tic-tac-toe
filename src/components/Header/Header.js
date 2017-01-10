import React from 'react';
import logo from '../../assets/logo.svg';
import styles from './Header.scss';

const Header = ({message}) => (
    <div className={styles.gameHeader}>
          <img src={logo} className={styles.headerLogo} alt="logo" />
          <h1 className={styles.headerTitle}>{message}</h1>
    </div>
);

Header.propTypes = {
  message: React.PropTypes.string.isRequired
};

export default Header;