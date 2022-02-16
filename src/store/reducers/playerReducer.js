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
  case 'REQUEST_QUESTIONS':
    return { ...state, loading: true };
  case 'RECEIVE_QUESTIONS':
    return { ...state, questions: action.payload, loading: false };
  case 'UPDATE_SCORE':
    localStorage.setItem('ranking',
      JSON.stringify({ name: state.name,
        score: action.payload,
        picture: state.gravatarEmail }));
    return { ...state, score: action.payload };
  default:
    return state;
  }
};

export default playerReducer;
