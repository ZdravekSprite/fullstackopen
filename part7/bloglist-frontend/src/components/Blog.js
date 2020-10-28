import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const user = useSelector(state => state.user )

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const label = visible ? 'hide' : 'view'

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
    <div style={blogStyle} className='blog'>
      <div>
        <i>{blog.title}</i> by {blog.author} <button onClick={() => setVisible(!visible)}>{label}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <button onClick={like}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && <button onClick={remove}>remove</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired
}

export default Blog