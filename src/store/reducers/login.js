const INITIAL_STATE = {
  email: '',
  name: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'PLAY_GAME':
    return { email: action.payload.email, name: action.payload.name };
  default:
    return state;
  }
}

export default loginReducer;
