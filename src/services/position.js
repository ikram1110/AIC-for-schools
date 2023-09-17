import axios from 'src/utils/axios'

const getAllPosition = async () => {
  try {
    const response = await axios.get(`/master/position`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

const storePosition = async (data) => {
  try {
    const response = await axios.post(`/master/position`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updatePosition = async (id, data) => {
  try {
    const response = await axios.put(`/master/position/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deletePosition = async (id) => {
  try {
    const response = await axios.delete(`/master/position/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export { getAllPosition, storePosition, deletePosition, updatePosition }
