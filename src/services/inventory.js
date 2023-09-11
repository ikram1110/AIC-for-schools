import axios from '../utils/axios'

const getAllInventory = async () => {
  try {
    const results = await axios.get(`/inventory`)
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

const storeInventory = async (data) => {
  try {
    const response = await axios.post(`/inventory`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const updateInventory = async (id, data) => {
  try {
    const response = await axios.put(`/inventory/${id}`, data)
    return response
  } catch (e) {
    return e.response
  }
}

const deleteInventory = async (id) => {
  try {
    const response = await axios.delete(`/inventory/${id}`)
    return response.data
  } catch (e) {
    return e.response.data
  }
}

export { getAllInventory, storeInventory, deleteInventory, updateInventory }
