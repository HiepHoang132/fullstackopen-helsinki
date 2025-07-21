const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  return res.status(404).end()
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if(error.name === 'CastError'){
    return res.status(400).json({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError'){
    const messages = Object.values(error.errors).map(e => e.message)
    return res.status(400).json({ error: messages.join(',') })
  } else if(error.name === 'MongoServerError' && error.code === 11000){
    return res.status(400).json({ error: 'username must be unique' })
  }

  next(error)
}

const userExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    req.token = authorization.substring(7)
  }

  next()
}

module.exports = { unknownEndpoint, errorHandler, userExtractor }