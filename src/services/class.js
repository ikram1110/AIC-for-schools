import axios from '../utils/axios'

const getAllClass = async () => {
  try {
    const response = await axios.get(`/master/class`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

const storeClass = async (data) => {
  try {
    const response = await axios.post(`/master/class`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateClass = async (id, data) => {
  try {
    const response = await axios.put(`/master/class/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteClass = async (id) => {
  try {
    const response = await axios.delete(`/master/class/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export { getAllClass, storeClass, deleteClass, updateClass }
