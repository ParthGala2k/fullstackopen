const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('-----')

  next()
}

const unknownRoute = (request, response) => {
  logger.info('Unknown route')
  return response.status(400).send({ error: 'Unknown route' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.message === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownRoute,
  errorHandler
}