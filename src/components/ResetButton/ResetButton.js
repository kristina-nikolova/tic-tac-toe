import React from 'react';
import './ResetButton.scss';

const ResetButton = ({reset}) => (
    <button className="button button--reset" onClick={reset}>Reset</button>
);

ResetButton.propTypes = {
  reset: React.PropTypes.func.isRequired
};

export default ResetButton;