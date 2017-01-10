import React from 'react';
import styles from './ResetButton.scss';

const ResetButton = ({reset}) => (
    <button className={'button ' +  styles.buttonReset} onClick={reset}>New Game</button>
);

ResetButton.propTypes = {
  reset: React.PropTypes.func.isRequired
};

export default ResetButton;