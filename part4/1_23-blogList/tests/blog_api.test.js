const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('fetching blogs', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blog posts are returned with id property instead of _id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

describe('creating blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Scaling Microservices with Kubernetes',
      author: 'Alice Johnson',
      url: 'https://techinsights.dev/k8s-microservices-guide',
      likes: 5
    }

    const token = await helper.loginAndGetToken()

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.url)
    assert(contents.includes('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'))
  })

  test('fails with status code 401 if token is not provided', async () => {
    const newBlog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 7,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
  })

  test('missing likes property defaults to 0', async () => {
    const token = await helper.loginAndGetToken()

    const newBlog = {
      title: 'Understanding JavaScript Closures',
      author: 'Jane Doe',
      url: 'https://devblog.example.com/js-closures',
    }

    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  const testInvalidBlog = async (newBlog) => {
    const token = await helper.loginAndGetToken()

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  }

  test('fails with status 400 if title is missing', async () => {
    const newBlog = {
      author: 'Jane Doe',
      url: 'https://devblog.example.com/js-closures',
    }

    await testInvalidBlog(newBlog)
  })

  test('fails with status 400 if url is missing', async () => {
    const newBlog = {
      title: 'Understanding JavaScript Closures',
      author: 'Jane Doe',
    }

    await testInvalidBlog(newBlog)
  })
})

describe('deleting a blog', () => {
  test('deletes a blog successfully with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const token = await helper.loginAndGetToken()

    const newBlog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 7,
    }

    const savedBlog = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    await api
        .delete(`/api/blogs/${savedBlog.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})

describe('updating a blog', () => {
  test('successfully updates the likes of a blog post', async () => {
    const token = await helper.loginAndGetToken()

    const newBlog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 7,
    }

    const savedBlog = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const updatedBlog = await api
        .put(`/api/blogs/${savedBlog.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ likes: 9 })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(updatedBlog.body.likes, 9)
  })
})

after(async () => {
  await mongoose.connection.close()
})
