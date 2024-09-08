import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAllContacts = () => {
  return axios
          .get(baseUrl)
          .then(response => response.data)
}

const addContact = (contact) => {
  console.log(contact)
  return axios
          .post(baseUrl, contact)
          .then(response => response.data)
}

export default {getAllContacts, addContact}