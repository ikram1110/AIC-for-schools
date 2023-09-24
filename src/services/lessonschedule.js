import axios from 'src/utils/axios'

const getAllLessonSchedule = async () => {
  try {
    const results = await axios.get(`/academic/lesson-schedule`)
    const response = results.data.map((result) => {
      const { unit, academicYear, classroom, lesson, room, employee, ...rest } =
        result
      return {
        ...rest,
        nameUnit: unit.name ?? '',
        nameAcademicYear: academicYear.name ?? '',
        nameClassroom: classroom.name ?? '',
        nameLesson: lesson.name ?? '',
        nameRoom: room.name ?? '',
        nameEmployee: employee.name ?? '',
      }
    })
    return response
  } catch (e) {
    return e.response.data
  }
}

const getAllLessonScheduleByUnit = async (idUnit) => {
  try {
    const results = await axios.get(`/academic/lesson-schedule`)
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

const storeLessonSchedule = async (data) => {
  try {
    const response = await axios.post(`/academic/lesson-schedule`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateLessonSchedule = async (id, data) => {
  try {
    const response = await axios.put(`/academic/lesson-schedule/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteLessonSchedule = async (id) => {
  try {
    const response = await axios.delete(`/academic/lesson-schedule/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export {
  getAllLessonSchedule,
  getAllLessonScheduleByUnit,
  storeLessonSchedule,
  deleteLessonSchedule,
  updateLessonSchedule,
}
