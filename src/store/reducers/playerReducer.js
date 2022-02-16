const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  questions: [],
  loading: true,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'PLAY_GAME':
    return { ...state,
      gravatarEmail: action.payload.gravatarEmail,
      name: action.payload.name,
      score: 0 };
  case 'REQUEST_QUESTIONS':
    return { ...state, loading: true };
  case 'RECEIVE_QUESTIONS':
    return { ...state, questions: action.payload, loading: false };
  case 'UPDATE_SCORE':
    return { ...state,
      score: state.score + action.payload.score,
      assertions: state.assertions + action.payload.assertions,
    };
  default:
    return state;
  }
};

export default playerReducer;
