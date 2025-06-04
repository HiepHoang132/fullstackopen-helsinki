const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  return res.status(404).end()
}

const errorHandler = (error, req, res, next) => {
  logger.info(error.message)

  if(error.name === 'CastError'){
    return res.status(400).json({ error: 'malformatted id' })
  }

  if(error.name === 'ValidationError'){
    const messages = Object.values(error.errors).map(e => e.message)
    return res.status(400).json({ error: messages.join(',') })
  }

  next(error)
}

module.exports = { unknownEndpoint, errorHandler }