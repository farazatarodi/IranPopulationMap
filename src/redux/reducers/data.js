const initialState = {};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_DATA':
      return action.data;

    case 'SET_LIMIT':
      return { ...state, limit: action.limit };

    default:
      return state;
  }
};

export default dataReducer;
