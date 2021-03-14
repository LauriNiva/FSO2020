import React from 'react';

const Notification = ({ message }) => {
    if (message === null) {
        return(
        <div className="emptymessage">
            
        </div>
        );
    };

    return (
        <div className="message">
            {message}
        </div>
    );
};

export default Notification;