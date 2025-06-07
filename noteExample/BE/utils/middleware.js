const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  return res.status(404).end()
}

const errorHandler = (error, req, res, next) => {
  logger.info(error.message)

  if(error.name === 'CastError'){
    return res.status(400).json({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError'){
    const messages = Object.values(error.errors).map(e => e.message)
    return res.status(400).json({ error: messages.join(',') })
  } else if(error.name === 'MongoServerError'
      && error.message.includes('E11000 duplicate key error')){
    return res.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name ===  'JsonWebTokenError') {
    return res.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }

  next(error)
}

module.exports = { unknownEndpoint, errorHandler }