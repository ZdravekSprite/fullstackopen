const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

const token = jwt.sign({ username: 'root', id: "5f8838eb62bc3e13209c60a6" }, process.env.SECRET)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({
    _id: "5f8838eb62bc3e13209c60a6",
    username: 'root',
    name: 'Superuser',
    passwordHash
  })

  await user.save()

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('step1', () => {
  test('blog are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('step2', () => {
  test('the unique identifier property of the blog posts is named id', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body[0].id).toBeDefined();
  });
})

describe('step3', () => {
  test('a blog can be added', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer '+token)
      .send(helper.oneBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })
  
  test('the content of the blog post is saved correctly to the database', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer '+token)
      .send(helper.oneBlog)
  
    const blogsAtEnd = await helper.blogsInDb()
    const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]
    expect(lastBlog.title).toBe(helper.oneBlog.title)
    expect(lastBlog.author).toBe(helper.oneBlog.author)
    expect(lastBlog.url).toBe(helper.oneBlog.url)
    expect(lastBlog.likes).toBe(helper.oneBlog.likes)
  })
})

describe('step4', () => {
  test('default likes property to the value 0', async () => {
    const testBlog = helper.oneBlog
    delete testBlog.likes
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer '+token)
      .send(testBlog)
      .expect(201)
  
    const blogsAtEnd = await helper.blogsInDb()
    const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]
    expect(lastBlog.likes).toBeDefined()
    expect(lastBlog.likes).toBe(0)
  })
})

describe('step5', () => {
  test('title properties are missing', async () => {
    const testBlog = helper.oneBlog
    delete testBlog.title
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer '+token)
      .send(testBlog)
      .expect(400)
  })

  test('url properties are missing', async () => {
    const testBlog = helper.oneBlog
    delete testBlog.url
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer '+token)
      .send(testBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'bearer '+token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const urls = blogsAtEnd.map(b => b.url)

    expect(urls).not.toContain(blogToDelete.url)
  })
})

describe('updating the information of an individual blog post', () => {
  test('put', async () => {
    const blogsAtStart = await helper.blogsInDb()
    let blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = blogToUpdate.likes + 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', 'bearer '+token)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const blogs = blogsAtEnd.find(b => b.id === blogToUpdate.id)

    expect(blogs).toBeDefined()
  })
})

describe('Unauthorized', () => {
  test('adding a blog fails if a token is not provided', async () => {
    await api
      .post('/api/blogs')
      .send(helper.oneBlog)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})