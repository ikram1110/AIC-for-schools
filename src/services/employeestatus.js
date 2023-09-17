import axios from 'src/utils/axios'

const getAllEmployeeStatus = async () => {
  try {
    const response = await axios.get(`/master/employee-status`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

const storeEmployeeStatus = async (data) => {
  try {
    const response = await axios.post(`/master/employee-status`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateEmployeeStatus = async (id, data) => {
  try {
    const response = await axios.put(`/master/employee-status/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteEmployeeStatus = async (id) => {
  try {
    const response = await axios.delete(`/master/employee-status/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export {
  getAllEmployeeStatus,
  storeEmployeeStatus,
  deleteEmployeeStatus,
  updateEmployeeStatus,
}
