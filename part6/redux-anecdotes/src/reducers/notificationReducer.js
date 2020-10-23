const notificationReducer = (state = null, action) => {
  //console.log('state now n: ', state)
  //console.log('action n', action)

  switch (action.type) {
    case 'SHOW':
    case 'HIDE':
      return action.data
    default:
      return state
  }
}

export const setNotification = (message, time = 5) => {
  return async dispatch => {
    await dispatch({
      type: 'SHOW',
      data: message
    })
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export const removeNotification = () => {
  return {
    type: 'HIDE',
    data: null
  }
}

export default notificationReducer