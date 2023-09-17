const initialState = {
  key: 'global',
  employeeByUnit: [],
}

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      }
  }
}
