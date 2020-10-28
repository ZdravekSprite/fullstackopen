import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = (props) => {
  const blogs = useSelector(state => {
    const byLikes = (b1, b2) => b2.likes - b1.likes
    return state.blogs.sort(byLikes)
  })

  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}
export default BlogList