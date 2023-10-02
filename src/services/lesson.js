import axios from 'src/utils/axios'

const getAllLesson = async () => {
  try {
    const results = await axios.get(`/academic/lesson`)
    const response = results.data.map((result) => {
      const { unit, curriculum, department, employee, lessonGroup, ...rest } =
        result
      return {
        ...rest,
        nameUnit: unit.name ?? '',
        nameCurriculum: curriculum.name ?? '',
        nameDepartment: department?.name ?? '',
        nameEmployee: employee?.name ?? '',
        nameLessonGroup: lessonGroup?.name ?? '',
      }
    })
    return response
  } catch (e) {
    return e.response.data
  }
}

const getAllLessonByUnit = async (idUnit) => {
  try {
    const results = await axios.get(`/academic/lesson`)
    const response = results.data.map((result) => {
      const { unit, ...rest } = result
      return {
        ...rest,
        nameUnit: unit.name,
      }
    })
    const newResponse = response.filter((x) => x.idUnit.includes(idUnit))
    return newResponse
  } catch (e) {
    return e.response.data
  }
}

const storeLesson = async (data) => {
  try {
    const response = await axios.post(`/academic/lesson`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateLesson = async (id, data) => {
  try {
    const response = await axios.put(`/academic/lesson/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteLesson = async (id) => {
  try {
    const response = await axios.delete(`/academic/lesson/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export {
  getAllLesson,
  getAllLessonByUnit,
  storeLesson,
  deleteLesson,
  updateLesson,
}
