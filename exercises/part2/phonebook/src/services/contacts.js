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
  // const contactName = axios.get(`${baseUrl}/${id}`).then(response => console.log(response.data.name))
  // if (window.confirm(`Delete ${contactName} ?`)) {
  return axios
          .delete(`${baseUrl}/${id}`)
  // }
}

const updateContact = (id, contact) => {
  return axios
          .put(`${baseUrl}/${id}`, contact)
          .then(response => response.data)
}

export default {getAllContacts, addContact, deleteContact, updateContact}