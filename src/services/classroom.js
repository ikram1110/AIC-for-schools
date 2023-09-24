import axios from 'src/utils/axios'

const getAllClassroom = async () => {
  try {
    const results = await axios.get(`/master/classroom`)
    const response = results.data.map((result) => {
      const { unit, employee, department, building, room, ...rest } = result
      return {
        ...rest,
        nameUnit: unit.name,
        nameEmployee: employee.name,
        nameDepartment: department.name,
        nameBuilding: building.name,
        nameRoom: room.name,
      }
    })
    return response
  } catch (e) {
    return e.response.data
  }
}

const getAllClassroomByUnit = async (idUnit) => {
  try {
    const results = await axios.get(`/master/classroom`)
    const response = results.data.map((result) => {
      const { unit, employee, department, building, room, ...rest } = result
      return {
        ...rest,
        nameUnit: unit.name,
        nameEmployee: employee.name,
        nameDepartment: department.name,
        nameBuilding: building.name,
        nameRoom: room.name,
      }
    })
    const newResponse = response.filter((x) => x.idUnit.includes(idUnit))
    return newResponse
  } catch (e) {
    return e.response.data
  }
}

const getAllClassroomByDepartment = async (idDepartment) => {
  try {
    const results = await axios.get(`/master/classroom`)
    const response = results.data.map((result) => {
      const { unit, employee, department, building, room, ...rest } = result
      return {
        ...rest,
        nameUnit: unit.name,
        nameEmployee: employee.name,
        nameDepartment: department.name,
        nameBuilding: building.name,
        nameRoom: room.name,
      }
    })
    const newResponse = response.filter((x) =>
      x.idDepartment.includes(idDepartment)
    )
    return newResponse
  } catch (e) {
    return e.response.data
  }
}

const storeClassroom = async (data) => {
  try {
    const response = await axios.post(`/master/classroom`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateClassroom = async (id, data) => {
  try {
    const response = await axios.put(`/master/classroom/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteClassroom = async (id) => {
  try {
    const response = await axios.delete(`/master/classroom/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export {
  getAllClassroom,
  getAllClassroomByUnit,
  getAllClassroomByDepartment,
  storeClassroom,
  deleteClassroom,
  updateClassroom,
}
