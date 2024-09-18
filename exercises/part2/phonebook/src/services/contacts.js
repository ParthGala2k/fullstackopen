import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAllContacts = () => {
  return axios
          .get(baseUrl)
          .then(response => response.data)
}

const addContact = (contact) => {
  return axios
          .post(baseUrl, contact)
          .then(response => response.data)
}

const deleteContact = (id) => {
  return axios
          .delete(`${baseUrl}/${id}`)
}

const updateContact = (id, contact) => {
  return axios
          .put(`${baseUrl}/${id}`, contact)
          .then(response => response.data)
}

export default {getAllContacts, addContact, deleteContact, updateContact}