const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

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

let contacts = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  return response.json(contacts)
})

app.get('/api/info', (request, response) => {
  return response.send(`<p>Phonebook has info for ${contacts.length} people<br/>${new Date().toString()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const contact = contacts.find(contact => contact.id === request.params.id)
  if (!contact) {
    return response.status(404).end()
  }
  return response.json(contact)
})

app.post('/api/persons', (request, response) => {
  const contactBody = request.body
  
  if (!contactBody.name || !contactBody.number) {
    return response.status(404).json({
      error: 'Content Missing'
    })
  }

  if (contacts.find(contact => contact.name === contactBody.name)) {
    return response.status(409).json({
      error: 'Name already exists'
    })
  }

  const newContact = {
    id: String(Math.round(Math.random() * 1000000)),
    name: contactBody.name,
    number: contactBody.number
  }

  contacts = contacts.concat(newContact)
  return response.json(newContact)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  // console.log(request)
  console.log(id)
  contacts = contacts.filter(contact => contact.id !== id)
  console.log(contacts)
  return response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`)
})