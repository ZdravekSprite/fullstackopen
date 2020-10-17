import React, { useState } from 'react'
import blogService from '../services/blogs'
import ReactDOM from 'react-dom'

const Blog = ({ blog, del }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  let blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateBlog = async (blogObject) => {
    try {
      await blogService.update(blogObject)
      setLikes(blogObject.likes)
    } catch (error) {
      console.log('error', error)
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      await blogService.remove(blogObject)
      del()
    } catch (error) {
      console.log('error', error)
    }
  }

  const likeBlog = (event) => {
    event.preventDefault()
    updateBlog({
      id: blog.id,
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes+1
    })
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) { 
      deleteBlog({
        id: blog.id,
        user: blog.user.id,
        title: blog.title,
        author: blog.author
      })
    }
  }

  const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
  const user = JSON.parse(loggedUserJSON)
  const deleteButton = () => (user.username === blog.user.username)
    ? <button onClick={removeBlog}>remove</button>
    : ""

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}<button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button><br/>
        {blog.url}<br/>
        {likes}<button onClick={likeBlog}>like</button><br/>
        {blog.author}<br/>
        {deleteButton()}
      </div>
    </div>
  )
}

export default Blog
