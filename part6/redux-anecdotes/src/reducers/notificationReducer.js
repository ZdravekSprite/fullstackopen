const notificationReducer = (state = null, action) => {
  //console.log('state now n: ', state)
  //console.log('action n', action)

  switch (action.type) {
    case 'SHOW':
      if (state !== null) clearTimeout(state[1])
      return action.data
    case 'HIDE':
      return action.data
    default:
      return state
  }
}

export const setNotification = (message, time = 5) => {
  return async dispatch => {
    const timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
    await dispatch({
      type: 'SHOW',
      data: [message, timeoutID]
    })
  }
}

export const removeNotification = () => {
  return {
    type: 'HIDE',
    data: null
  }
}

export default notificationReducer