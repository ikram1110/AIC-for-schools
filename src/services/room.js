import axios from 'src/utils/axios'

const getAllRoom = async () => {
  try {
    const results = await axios.get(`/master/room`)
    const response = results.data.map((result) => {
      const { building, ...rest } = result
      return {
        ...rest,
        nameBuilding: building.name,
      }
    })
    return response
  } catch (e) {
    return e.response.data
  }
}

const getAllRoomByBuilding = async (idBuilding) => {
  try {
    const results = await axios.get(`/master/room`)
    const response = results.data.map((result) => {
      const { building, ...rest } = result
      return {
        ...rest,
        nameBuilding: building.name,
      }
    })
    const newResponse = response.filter((x) =>
      x.idBuilding.includes(idBuilding)
    )
    return newResponse
  } catch (e) {
    return e.response.data
  }
}

const storeRoom = async (data) => {
  try {
    const response = await axios.post(`/master/room`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateRoom = async (id, data) => {
  try {
    const response = await axios.put(`/master/room/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteRoom = async (id) => {
  try {
    const response = await axios.delete(`/master/room/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export { getAllRoom, getAllRoomByBuilding, storeRoom, deleteRoom, updateRoom }
