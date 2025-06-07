const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('notes', { content: 1, important: 1 })
  res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body
  const saltsRound = 10
  const passwordHash = await bcrypt.hash(password, saltsRound)

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter

