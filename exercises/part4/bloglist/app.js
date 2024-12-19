const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const Blog = require('./models/blog')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

// const mongoUrl = 'mongodb://localhost/bloglist'
const mongoUrl = config.MONGODB_URI
console.log('Connecting to database...: ', mongoUrl)
mongoose.connect(mongoUrl)
  .then(() => console.log('Successfully connected to database'))
  .catch(error => console.log('Error connecting to database:', error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.get('/', (request, response) => {
  console.log('request received')
  return response.send('<h1>Hello world</h1>')
})
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownRoute)
app.use(middleware.errorHandler)

module.exports = app