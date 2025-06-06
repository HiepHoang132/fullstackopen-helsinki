const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.get('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
  if(!blog) return res.status(404).end()
  res.json(blog)
})

blogRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes
  })

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (req, res, next) => {
  const { likes } = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes },
    { new: true, runValidators: true, context:'query' }
  )
  if(!updatedBlog) return res.status(404).end()
  res.json(updatedBlog)
})

blogRouter.delete('/:id', async (req, res, next) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = blogRouter