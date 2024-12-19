const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('-----')

  next()
}

const unknownRoute = (request, response) => {
  console.log('Unknown route')
  return response.status(400).send({ error: 'Unknown route' })
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

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