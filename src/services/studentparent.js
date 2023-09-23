import axios from 'src/utils/axios'

const getAllStudentParent = async () => {
  try {
    const results = await axios.get(`/users/student-parent`)
    const response = results.data.map((result) => {
      const { student, ...rest } = result
      return {
        ...rest,
        nameStudent: student.name,
      }
    })
    return response
  } catch (e) {
    return e.response.data
  }
}

const storeStudentParent = async (data) => {
  try {
    const response = await axios.post(`/users/student-parent`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateStudentParent = async (id, data) => {
  try {
    const response = await axios.put(`/users/student-parent/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteStudentParent = async (id) => {
  try {
    const response = await axios.delete(`/users/student-parent/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export {
  getAllStudentParent,
  storeStudentParent,
  deleteStudentParent,
  updateStudentParent,
}
