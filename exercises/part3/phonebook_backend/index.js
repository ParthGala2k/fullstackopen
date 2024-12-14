const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/contact')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

morgan.token('contents', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :contents'))

app.get('/api/info', (request, response, next) => {
  return response.send('<h3>This is the phonebook application to store contacts</h3>')
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(result => {
      console.log('Successfully fetched all contacts')
      console.log(result)
      return response.status(200).json(result)
    })
    // .catch(error => next(error)) ---> is equivalent to below
    .catch(next)
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then(result => {
      console.log(result)
      return response.status(200).json(result)
    })
    .catch(next)
})

app.post('/api/persons', (request, response, next) => {
  const contactBody = request.body

  // This could be done much better using async-await and
  // try-catch rather than the below method
  Person.findOne({ name: contactBody.name })
    .then(existingContact => {
      // Also, kept both options to add as well as update in this route
      // despite handling it in the frontend so as to ensure that the
      // backend also works as expected
      if (existingContact) {
        Person.findOneAndUpdate(
          { name: contactBody.name },
          { number: contactBody.number },
          { new: true }
        )
        .then(updatedContact => {
          console.log('Updated the contact')
          console.log(updatedContact)
          return response.status(200).json(updatedContact)
        })
        .catch(next)
      }
      else {
        Person.create(contactBody)
          .then(newContact => {
            console.log('Created new contact')
            console.log(newContact)
            return response.status(200).json(newContact)
          })
          .catch(next)
      }
    })
    .catch(next)
})

app.put('/api/persons/:id', (request, response, next) => {
  const contactBody = request.body
  const id = request.params.id

  Person.findByIdAndUpdate(id, contactBody, { new: true, runValidators: true, context: 'query' })
    .then(updatedContact => {
      console.log('Updated the contact')
      console.log(updatedContact)
      return response.status(200).json(updatedContact)
    })
    .catch(next)
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      if (result) {
        console.log('Successfully deleted contact')
      }
      else {
        console.log('Contact does not exist')
      }
      console.log(result)
      return response.status(204).end()
    })
    .catch(next)
})

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log('Error name', error.name)
  console.log('Error message', error.message)

  if (error.name === 'ValidationError') {
    console.log('Error message:', error.message)
    return response.status(400).json({ error: error.message })
  }

  if (error.name === 'CastError') {
    console.error('Error message:', error.message)
    return response.status(400).json({ error: 'Malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`)
})