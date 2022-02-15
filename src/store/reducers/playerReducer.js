const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  questions: [],
  loading: true,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RECEIVE_QUESTIONS':
    return { ...state, questions: action.payload, loading: false };
  default:
    return state;
  }
};

export default playerReducer;
