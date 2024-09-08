import { useState, useEffect } from 'react'
import contactService from './services/contacts'


const PersonForm = ({ addContact, handleNameAdd, handleNumberAdd }) => {
  return (
    <form onSubmit={addContact}>
      <div id='name'>
        name: <input onChange={handleNameAdd}/>
      </div>
      <div id='number'>
        number: <input onChange={handleNumberAdd}/>
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

const Filter = ({ handleNameSearch }) =>  {
  return (
    <div id='search'>
      Search for name: <input onChange={handleNameSearch}/>
    </div>
  )
}

const PersonsList = ({ allPersons, searchName }) => {
  return (
    <div>
      {allPersons
      .filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
      .map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    contactService
      .getAllContacts()
      .then(output => setPersons(output))
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    const newContact = {'name': newName, 'number': newNumber}

    // One solution to finding matches for same name in an array of name objects
    if (persons.find(value => value.name.toLowerCase() === newContact.name.toLowerCase()) === undefined) {
      contactService
        .addContact(newContact)
        .then(output => setPersons(persons.concat(output)))
    }
    else {
      alert(`${newContact.name} is already added to phonebook`)
    }

    // This is the other method using the lodash operator but you'd have to import
    // the lodash library for it
    // if (persons.find(value => _.isEqual(value, newContact)) === undefined) {
    //   setPersons(persons.concat(newContact))
    // }
  }

  const handleNameSearch = event => setSearchName(event.target.value)

  const handleNameAdd = event => setNewName(event.target.value)
  const handleNumberAdd = event => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleNameSearch={handleNameSearch}/>
      <h3>Add New</h3>
      <PersonForm addContact={addContact} handleNameAdd={handleNameAdd} handleNumberAdd={handleNumberAdd} />
      <h3>Numbers</h3>
      <PersonsList allPersons={persons} searchName={searchName} />
    </div>
  )
}

export default App