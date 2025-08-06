const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })

  res.json(blogs)
})

blogRouter.get('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
  if(!blog) return res.status(404).end()
  res.json(blog)
})

blogRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body

  if(!req.token){
    return res.status(401).json({ error: 'token missing' })
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if(!decodedToken.id){
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if(!user){
    return res.status(401).json({ error: 'user invalid' })
  }

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user
  })

  user.blogs = user.blogs.concat(blog)
  await user.save()

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (req, res, next) => {
  const { likes } = req.body
  const blogId = req.params.id

  const blog = await Blog.findById(blogId)
  if(!blog){
    return res.status(404).json({ error: 'invalid blog id' })
  }

  if(!req.token){
    return res.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if(!decodedToken){
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if(!user){
    return res.status(403).json({ error: 'permission denied: not the blog owner' })
  }

  if(blog.user.toString() !== user.id){
    return res.status(403).json({ error: 'permission denied: not the blog owner' })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes },
    { new: true, runValidators: true, context:'query' }
  ).populate('user')

  if(!updatedBlog) return res.status(404).end()
  res.json(updatedBlog)
})

blogRouter.delete('/:id', async (req, res, next) => {
  const blogId = req.params.id
  const blog = await Blog.findById(blogId)

  if(!blog){
    return res.status(404).json({ error: 'invalid blog id' })
  }

  if(!req.token){
    return res.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if(!decodedToken){
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if(!user){
    return res.status(403).json({ error: 'permission denied: not the blog owner' })
  }

  if(blog.user.toString() !== user.id){
    return res.status(403).json({ error: 'permission denied: not the blog owner' })
  }

  await Blog.findByIdAndDelete(blogId)
  await User.updateMany(
    { blogs: blogId }, { $pull: { blogs: blogId } }
  )
  res.status(204).end()
})

module.exports = blogRouter