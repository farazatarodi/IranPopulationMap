export const selectData = (data) => {
  return {
    type: 'SELECT_DATA',
    data,
  };
};

export const setLimit = (limit) => {
  return {
    type: 'SET_LIMIT',
    limit,
  };
};
