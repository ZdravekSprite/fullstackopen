import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commentBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import { Form, Button } from 'react-bootstrap'

const Blog = ({ blog }) => {
  if (!blog) {
    return null
  }

  const [newComment, setNewComment] = useState(
    'add comment...'
  )
  const addComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, newComment))
  }
  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
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
        <Button onClick={like}>like</Button>
      </div>
      <div>added by {blog.user.name}</div>
      {user.username === blog.user.username && <Button onClick={remove}>remove</Button>}
      <h4>comments</h4>
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Control
            type="text"
            name="newComment"
            value={newComment}
            onChange={handleCommentChange}
          />
          <Button type="submit">add comment</Button>
        </Form.Group>
      </Form>
      <ul className="striped">
        {blog.comments.map((c, i) =>
          <li key={i}>{c}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog