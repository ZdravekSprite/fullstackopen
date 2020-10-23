const notificationReducer = (state = null, action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch (action.type) {
    case 'SHOW':
    case 'HIDE':
      return action.data
    default:
      return null
  }
}

export const setNotification = message => {
  return {
    type: 'SHOW',
    data: message
  }
}

export const removeNotification = () => {
  return {
    type: 'HIDE',
    data: null
  }
}

export default notificationReducer