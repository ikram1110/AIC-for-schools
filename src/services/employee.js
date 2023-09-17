import axios from 'src/utils/axios'

const getAllEmployee = async () => {
  try {
    const results = await axios.get(`/users/employee`)
    const response = results.data.map((result) => {
      const { unit, ptkType, grade, employeeStatus, ...rest } = result
      return {
        ...rest,
        nameUnit: unit.name,
        namePtkType: ptkType.name,
        nameEmployeeStatus: employeeStatus.name,
        nameGrade: grade.name,
      }
    })
    return response
  } catch (e) {
    return e.response.data
  }
}

const getAllEmployeeByUnit = async (idUnit) => {
  try {
    const results = await axios.get(`/users/employee`)
    const response = results.data.map((result) => {
      const { unit, ptkType, grade, employeeStatus, ...rest } = result
      return {
        ...rest,
        nameUnit: unit.name,
        namePtkType: ptkType.name,
        nameEmployeeStatus: employeeStatus.name,
        nameGrade: grade.name,
      }
    })
    const newResponse = response.filter((x) => x.idUnit.includes(idUnit))
    return newResponse
  } catch (e) {
    return e.response.data
  }
}

const storeEmployee = async (data) => {
  try {
    const response = await axios.post(`/users/employee`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateEmployee = async (id, data) => {
  try {
    const response = await axios.put(`/users/employee/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`/users/employee/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export {
  getAllEmployee,
  getAllEmployeeByUnit,
  storeEmployee,
  deleteEmployee,
  updateEmployee,
}
