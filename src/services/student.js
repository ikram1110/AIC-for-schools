import axios from 'src/utils/axios'

const getAllStudent = async () => {
  try {
    const results = await axios.get(`/users/student`)
    const response = results.data.map((result) => {
      const { unit, classroom, department, ...rest } = result
      return {
        ...rest,
        nameUnit: unit.name,
        nameClassroom: classroom.name,
        nameDepartment: department.name,
      }
    })
    return response
  } catch (e) {
    return e.response.data
  }
}

const storeStudent = async (data) => {
  try {
    const response = await axios.post(`/users/student`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateStudent = async (id, data) => {
  try {
    const response = await axios.put(`/users/student/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`/users/student/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export { getAllStudent, storeStudent, deleteStudent, updateStudent }
