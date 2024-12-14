const mongoose = require('mongoose')

require('dotenv').config()

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(() => console.log('Connected to Database'))
  .catch(error => console.log('Error connecting to mongoDB', error.message))

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (num) => {
        return /^\d{2,3}-\d{6,}$/.test(num)
      },
      message: props => `${props.value} is not a valid number`
    },
    required: [true, 'Phone number required']
  }
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', contactSchema)