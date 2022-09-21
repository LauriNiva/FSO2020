import React from 'react';

const Notification = ({ message }) => {
  if (message === null) {
    return <div></div>;
  }

  if (message.startsWith('Error')) {
    return <div className="notification-error notification">{message}</div>;
  }

  return <div className="notification-message notification">{message}</div>;
};

export default Notification;
