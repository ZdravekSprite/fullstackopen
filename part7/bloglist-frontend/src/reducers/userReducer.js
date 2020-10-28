const reducer = (state = null, action) => {
  //console.log('state now: ', state)
  //console.log('action ', action)

  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (user) => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logout = (user) => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
      data: user
    })
  }
}

export default reducer