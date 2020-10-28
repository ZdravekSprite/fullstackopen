import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  if (!blog) {
    return null
  }

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const like = () => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`you liked  '${blog.title}' by ${blog.author}!`))
  }

  const remove = () => {
    dispatch(removeBlog(blog.id))
    dispatch(setNotification(`you removed  '${blog.title}' by ${blog.author}!`))
  }

  return (
    <div className='blog'>
      <h1>{blog.title} {blog.author}</h1>
      <div><a href={blog.url} target="_blank" rel="noreferrer" >{blog.url}</a></div>
      <div> {blog.likes} likes
        <button onClick={like}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {user.username === blog.user.username && <button onClick={remove}>remove</button>}
      <h4>comments</h4>
      <ul>
        {blog.comments.map((c, i) =>
          <li key={i}>{c}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog