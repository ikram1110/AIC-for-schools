import axios from 'src/utils/axios'

const getAllAcademicYear = async () => {
  try {
    const response = await axios.get(`/master/academic-year`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

const storeAcademicYear = async (data) => {
  try {
    const response = await axios.post(`/master/academic-year`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateAcademicYear = async (id, data) => {
  try {
    const response = await axios.put(`/master/academic-year/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteAcademicYear = async (id) => {
  try {
    const response = await axios.delete(`/master/academic-year/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export {
  getAllAcademicYear,
  storeAcademicYear,
  deleteAcademicYear,
  updateAcademicYear,
}
