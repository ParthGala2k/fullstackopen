const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')
const Blog = require('./models/blog')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

// const mongoUrl = 'mongodb://localhost/bloglist'
const mongoUrl = config.MONGODB_URI
logger.info('Connecting to database...: ', mongoUrl)
mongoose.connect(mongoUrl)
  .then(() => logger.info('Successfully connected to database'))
  .catch(error => logger.error('Error connecting to database:', error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.get('/', (request, response) => {
  logger.info('request received')
  return response.send('<h1>Hello world</h1>')
})
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownRoute)
app.use(middleware.errorHandler)

module.exports = app