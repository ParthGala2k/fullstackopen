import { useState, useEffect } from 'react'
import contactService from './services/contacts'


const PersonForm = ({ name, number, addContact, handleNameAdd, handleNumberAdd }) => {
  return (
    <form onSubmit={addContact}>
      <div id='name'>
        name: <input value={name} onChange={handleNameAdd}/>
      </div>
      <div id='number'>
        number: <input value={number} onChange={handleNumberAdd}/>
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

const PersonEntry = ({ handlePersonDelete, person }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => handlePersonDelete(person.id)}>Delete</button>
    </div>
  )
}

const PersonsList = ({ allPersons, searchName, handlePersonDelete }) => {
  return (
    <div>
      {allPersons
      .filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
      .map(person => <PersonEntry key={person.id} handlePersonDelete={handlePersonDelete} person={person} />)}
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
    const contactExists = persons.find(value => value.name.toLowerCase() === newContact.name.toLowerCase())
    if (!contactExists) {
      contactService
        .addContact(newContact)
        .then(output => {
          setPersons(persons.concat(output))
        })
    }
    else {
      const contactId = contactExists.id
      if (window.confirm(`${newContact.name} is already added to phonebook. Replace with new number ?`)) {
        contactService
          .updateContact(contactId, newContact)
          .then(output => setPersons(
            persons
              .filter(person => person.id !== contactId)
              .concat(output)
            ))
      }
    }
    setNewName('')
    setNewNumber('')

    // This is the other method using the lodash operator but you'd have to import
    // the lodash library for it
    // if (persons.find(value => _.isEqual(value, newContact)) === undefined) {
    //   setPersons(persons.concat(newContact))
    // }
  }

  const handleNameSearch = event => setSearchName(event.target.value)

  const handleNameAdd = event => setNewName(event.target.value)
  const handleNumberAdd = event => setNewNumber(event.target.value)

  const handlePersonDelete = (id) => {
    const contactToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${contactToDelete.name} ?`)) {
      contactService
        .deleteContact(id)
        .then(response => {
          if (response.status === 200) {
            setPersons(persons.filter(person => person.id !== id))
          }
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleNameSearch={handleNameSearch}/>
      <h3>Add New</h3>
      <PersonForm name={newName} number={newNumber} addContact={addContact} handleNameAdd={handleNameAdd} handleNumberAdd={handleNumberAdd} />
      <h3>Numbers</h3>
      <PersonsList allPersons={persons} searchName={searchName} handlePersonDelete={handlePersonDelete} />
    </div>
  )
}

export default App