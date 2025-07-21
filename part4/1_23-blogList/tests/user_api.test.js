const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const users = []
  for(const user of helper.initialUsers){
    const passwordHash = await bcrypt.hash(user.password, 10)
    users.push({
      username: user.username,
      name: user.name,
      passwordHash: passwordHash
    })
  }

  await User.insertMany(users)
})

describe('User creation fails with invalid data', () => {
  test('fails with 400 if username or password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send({ name: 'Missing fields' })
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('fails with 400 if username is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ab',
      name: 'name',
      password: 'haha'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('fails with 400 if password is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'alphabet',
      name: 'nugget',
      password: 'ab'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('fails with 400 if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'SayMyName',
      name: 'Heisenberg',
      password: 'goddamnright'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

})

after(async () => {
  await mongoose.connection.close()
})
