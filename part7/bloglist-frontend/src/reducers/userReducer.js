import userServices from '../services/users'

const byBlogs = (a1, a2) => a2.blogs.length - a1.blogs.length

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ALL':
      return action.data.sort(byBlogs)
    case 'CREATE':
      return [...state, action.data]
    case 'REMOVE': {
      return state.filter(b => b.id !== action.data)
    }
    default:
      return state
  }
}

export const removeUser = (id) => {
  return async dispatch => {
    await userServices.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id
    })
  }
}

export const createUser = (user) => {
  return async dispatch => {
    const data = await userServices.create(user)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const allUsers = () => {
  return async dispatch => {
    const data = await userServices.getAll()
    dispatch({
      type: 'ALL',
      data
    })
  }
}

export default reducer