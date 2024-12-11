const mongoose =  require('mongoose')

if (process.argv.length === 4 || process.argv.length > 5) {
  console.log('Provide the correct number of arguments')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://parth:${password}@cluster0.cqnsi.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// The person model uses the contactSchema to store contacts
const Person = mongoose.model('Person', contactSchema)

if (process.argv.length === 5) {
  const contact = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  contact.save().then(response => {
    console.log(`Added ${response.name}, Number ${response.number} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log(result)
    mongoose.connection.close()
  })
}