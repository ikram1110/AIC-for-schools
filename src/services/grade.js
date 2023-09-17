import axios from 'src/utils/axios'

const getAllGrade = async () => {
  try {
    const response = await axios.get(`/master/grade`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

const storeGrade = async (data) => {
  try {
    const response = await axios.post(`/master/grade`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateGrade = async (id, data) => {
  try {
    const response = await axios.put(`/master/grade/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteGrade = async (id) => {
  try {
    const response = await axios.delete(`/master/grade/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export { getAllGrade, storeGrade, deleteGrade, updateGrade }
