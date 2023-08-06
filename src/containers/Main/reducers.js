const initialState = {
  key: "global",
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
};
