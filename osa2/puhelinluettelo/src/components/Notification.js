import React from 'react';

const Notification = ({ message }) => {

    if (message[0] === null) {
        return(
        <div className="emptymessage">
            
        </div>
        );
    };

    let id;
    if(message[1]){
        id = "error";
    }else{
        id ="";
    }
    return (
        <div className="message" id={id}>
            {message}
        </div>
    );
};

export default Notification;