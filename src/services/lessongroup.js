import axios from 'src/utils/axios'

const getAllLessonGroup = async () => {
  try {
    const results = await axios.get(`/academic/lesson-group`)
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

const getAllLessonGroupByUnit = async (idUnit) => {
  try {
    const results = await axios.get(`/academic/lesson-group`)
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

const storeLessonGroup = async (data) => {
  try {
    const response = await axios.post(`/academic/lesson-group`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateLessonGroup = async (id, data) => {
  try {
    const response = await axios.put(`/academic/lesson-group/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteLessonGroup = async (id) => {
  try {
    const response = await axios.delete(`/academic/lesson-group/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export {
  getAllLessonGroup,
  getAllLessonGroupByUnit,
  storeLessonGroup,
  deleteLessonGroup,
  updateLessonGroup,
}
