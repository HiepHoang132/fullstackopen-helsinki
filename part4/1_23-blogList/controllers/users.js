const bcrypt = require('bcrypt')
const User = require('../models/user')
const userRouter = require('express').Router()

userRouter.get('/', async (req, res, next) => {
  const users = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  res.json(users)
})

userRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  if(!username || !password){
    return res.status(400).json({ error: 'username or password is missing' })
  }

  if(password.length < 3){
    return res.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})
module.exports = userRouter