import React from 'react';

const Notification = ({ message }) => {
    const messageStyle1 = {
        color: 'green',
        borderStyle: 'solid',
        boderRadis: 5,
        padding: 10,
        marginBottom: 5,
        background: 'lightgrey'
    }

    const messageStyle2 = {
        color: 'red',
        borderStyle: 'solid',
        boderRadis: 5,
        padding: 10,
        marginBottom: 5,
        background: 'lightgrey'
    }
    
    if (message === null){
      return null
    }else{
      return(
        <div style={message.slice(0,11) === 'Information' ? messageStyle2 : messageStyle1}>
          {message}
        </div>
      )
    } 
  }

  export default Notification;