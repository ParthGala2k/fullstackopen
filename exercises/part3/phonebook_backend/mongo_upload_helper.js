// const mongoose = require('mongoose')
const Person = require('./models/contact')

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

const tp_contact = {
  "id": "5",
  "name": "Babloo",
  "number": "38881212"
}

// Person.deleteMany({}).then(result => {
//     console.log('Deleted all contacts')
//     mongoose.disconnect()
//   })

// Person.insertMany(contacts).then(result => {
//     console.log('Contacts successfully uploaded')
//     mongoose.disconnect()
//   })

// Person.create(tp_contact).then(result => console.log(result))

Person.deleteMany({ name: {
  $regex: 'Bab*'
}}).then(result => console.log(result))