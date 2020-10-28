import blogServices from '../services/blogs'

const byLikes = (a1, a2) => a2.likes - a1.likes

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data.sort(byLikes)
    case 'CREATE':
      return [...state, action.data]
    case 'LIKE': {
      const liked = action.data
      return state.map(b => b.id === liked.id ? liked : b).sort(byLikes)
    }
    case 'REMOVE': {
      return state.filter(b => b.id !== action.data)
    }
    default:
      return state
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogServices.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const toLike = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
    const data = await blogServices.update(toLike)
    dispatch({
      type: 'LIKE',
      data
    })
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