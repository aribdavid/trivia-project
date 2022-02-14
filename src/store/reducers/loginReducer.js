const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'PLAY_GAME':
    return { email: action.payload.email, name: action.payload.name };
  case 'RECEIVE_TOKEN':
    localStorage.setItem('token', action.payload.token);
    return { ...state, token: action.payload.token };
  default:
    return state;
  }
}

export default loginReducer;
