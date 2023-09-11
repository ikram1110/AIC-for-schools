import axios from '../utils/axios'

const getAllDepartment = async () => {
  try {
    const results = await axios.get(`/master/department`)
    const response = results.data.map((result) => {
      const { unit, ...rest } = result
      return {
        ...rest,
        nameUnit: unit.name,
      }
    })
    return response
  } catch (e) {
    return e.response.data
  }
}

const storeDepartment = async (data) => {
  try {
    const response = await axios.post(`/master/department`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateDepartment = async (id, data) => {
  try {
    const response = await axios.put(`/master/department/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteDepartment = async (id) => {
  try {
    const response = await axios.delete(`/master/department/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export { getAllDepartment, storeDepartment, deleteDepartment, updateDepartment }