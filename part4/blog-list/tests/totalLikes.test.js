const listHelper = require('../utils/list_helper')
const blogs = require('./blogs')

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(blogs.emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs.blogs)
    expect(result).toBe(36)
  })

})