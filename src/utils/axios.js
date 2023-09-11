import axios from 'axios'

export default axios.create({
  baseURL: 'https://apisiakad.binaries.id',
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('token')}`
  },
})
