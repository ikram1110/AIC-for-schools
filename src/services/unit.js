import axios from '../utils/axios'

const getAllUnit = async () => {
  try {
    const response = await axios.get(`/master/unit`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

const storeUnit = async (data) => {
  try {
    const response = await axios.post(`/master/unit`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateUnit = async (id, data) => {
  try {
    const response = await axios.put(`/master/unit/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteUnit = async (id) => {
  try {
    const response = await axios.delete(`/master/unit/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export { getAllUnit, storeUnit, deleteUnit, updateUnit }
