import React from 'react';

const Announcement = ({winner, message}) => (
    <div className={winner ? 'visible' : 'invisible'}>
        <h2>{message}</h2>
     </div>
);

Announcement.propTypes = {
  winner: React.PropTypes.string,
  message: React.PropTypes.string.isRequired
};

export default Announcement;