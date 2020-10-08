const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else {
    var max = blogs.reduce(function (prev, current) {
      return (prev.likes > current.likes) ? prev : current
    })
    return {
      title: max.title,
      author: max.author,
      likes: max.likes
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}