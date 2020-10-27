import blogServices from '../services/blogs'

const byLikes = (a1, a2) => a2.likes - a1.likes

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data.sort(byLikes)
    case 'CREATE':
      return [...state, action.data]
    default:
      return state
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const data = await blogServices.create(blog)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogServices.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export default reducer