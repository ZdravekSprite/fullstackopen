const listHelper = require('../utils/list_helper')
const blogs = require('./blogs')

describe('favorite blog', () => {
  test('of empty list is zero', () => {
    const result = listHelper.favoriteBlog(blogs.emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals to that blog', () => {
    const result = listHelper.favoriteBlog(blogs.listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(blogs.blogs)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })

})