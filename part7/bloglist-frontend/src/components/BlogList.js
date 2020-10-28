import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => {
    const byLikes = (b1, b2) => b2.likes - b1.likes
    return state.blogs.sort(byLikes)
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {blogs.map(b =>
        <div style={blogStyle} key={b.id}><Link to={'/blogs/'+b.id}>{b.title} {b.author}</Link></div>
      )}
    </div>
  )
}
export default BlogList