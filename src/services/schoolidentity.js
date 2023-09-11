import axios from '../utils/axios'

const getSchoolIdentity = async () => {
  try {
    const response = await axios.get(`/master/school-identity`)
    return response
  } catch (e) {
    return e.response
  }
}

const storeSchoolIdentity = async (data) => {
  try {
    const response = await axios.post(`/master/school-identity`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateSchoolIdentity = async (id, data) => {
  try {
    const response = await axios.put(`/master/school-identity/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

export { getSchoolIdentity, storeSchoolIdentity, updateSchoolIdentity }
