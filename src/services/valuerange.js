import axios from 'src/utils/axios'

const getAllValueRange = async () => {
  try {
    const results = await axios.get(`/academic/value-range`)
    const response = results.data.map((result) => {
      const { unit, classroom, ...rest } = result
      return {
        ...rest,
        nameUnit: unit.name,
        nameClassroom: classroom.name,
      }
    })
    return response
  } catch (e) {
    return e.response.data
  }
}

const getAllValueRangeByUnit = async (idUnit) => {
  try {
    const results = await axios.get(`/academic/value-range`)
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

const storeValueRange = async (data) => {
  try {
    const response = await axios.post(`/academic/value-range`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateValueRange = async (id, data) => {
  try {
    const response = await axios.put(`/academic/value-range/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteValueRange = async (id) => {
  try {
    const response = await axios.delete(`/academic/value-range/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export {
  getAllValueRange,
  getAllValueRangeByUnit,
  storeValueRange,
  deleteValueRange,
  updateValueRange,
}
