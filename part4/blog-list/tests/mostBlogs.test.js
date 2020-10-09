const listHelper = require('../utils/list_helper')
const blogs = require('./blogs')

describe('most blogs', () => {
  test('of empty list is zero', () => {
    const result = listHelper.mostBlogs(blogs.emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals to author of that blog', () => {
    const result = listHelper.mostBlogs(blogs.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(blogs.blogs)
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })

})