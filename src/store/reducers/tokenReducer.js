const INITIAL_STATE = '';

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_TOKEN':
    return { ...state };
  case 'RECEIVE_TOKEN':
    localStorage.setItem('token', action.payload.token);
    return action.payload.token;

  default:
    return state;
  }
};

export default tokenReducer;
