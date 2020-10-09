const listHelper = require('../utils/list_helper')
const blogs = require('./blogs')

describe('most likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.mostLikes(blogs.emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals to author of that blog', () => {
    const result = listHelper.mostLikes(blogs.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(blogs.blogs)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })

})