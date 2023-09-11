import axios from '../utils/axios'

const getAllBuilding = async () => {
  try {
    const response = await axios.get(`/master/building`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

const storeBuilding = async (data) => {
  try {
    const response = await axios.post(`/master/building`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateBuilding = async (id, data) => {
  try {
    const response = await axios.put(`/master/building/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteBuilding = async (id) => {
  try {
    const response = await axios.delete(`/master/building/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export { getAllBuilding, storeBuilding, deleteBuilding, updateBuilding }
