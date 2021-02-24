const notificationReducer = (state = '', action) => {
    switch(action.type){
        case 'SHOW':
            return action.data

        default:
            return state;
    }
}

export const showNotification = notifcation => {
    return{
      type: 'SHOW',
      data: notifcation
    }
  }

  export default notificationReducer;