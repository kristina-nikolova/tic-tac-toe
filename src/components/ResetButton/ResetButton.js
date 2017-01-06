import React from 'react';
import './ResetButton.scss';

const ResetButton = ({reset, winningPath}) => (
    <button className="button--reset" onClick={reset}>Reset</button>
);

ResetButton.propTypes = {
  reset: React.PropTypes.func.isRequired,
  winningPath: React.PropTypes.array
};

export default ResetButton;