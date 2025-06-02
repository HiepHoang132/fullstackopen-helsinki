const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
})

blogRouter.post('/', (req, res) => {
  const { title, author, url, likes } = req.body

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes
  })

  blog.save().then(newBlog => {
    res.json(newBlog)
  })
})

module.exports = blogRouter