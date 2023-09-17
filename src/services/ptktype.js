import axios from 'src/utils/axios'

const getAllPtkType = async () => {
  try {
    const response = await axios.get(`/master/ptk-type`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

const storePtkType = async (data) => {
  try {
    const response = await axios.post(`/master/ptk-type`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updatePtkType = async (id, data) => {
  try {
    const response = await axios.put(`/master/ptk-type/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deletePtkType = async (id) => {
  try {
    const response = await axios.delete(`/master/ptk-type/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export { getAllPtkType, storePtkType, deletePtkType, updatePtkType }
