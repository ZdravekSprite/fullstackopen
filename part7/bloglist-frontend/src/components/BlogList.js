import React from 'react'
import Blog from './Blog'

const BlogList = ({
  blogs,
  handleLike,
  handleRemove,
  user
}) => {

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username === blog.user.username}
        />
      )}
    </div>
  )
}
export default BlogList