import axios from '../utils/axios'

const getAllCurriculum = async () => {
  try {
    const response = await axios.get(`/master/curriculum`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

const storeCurriculum = async (data) => {
  try {
    const response = await axios.post(`/master/curriculum`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateCurriculum = async (id, data) => {
  try {
    const response = await axios.put(`/master/curriculum/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteCurriculum = async (id) => {
  try {
    const response = await axios.delete(`/master/curriculum/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export { getAllCurriculum, storeCurriculum, deleteCurriculum, updateCurriculum }
