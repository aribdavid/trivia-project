const defaultAction = (payload, actionType) => ({
  type: actionType,
  payload,
});

export default defaultAction;

function requestToken() {
  return { type: 'REQUEST_TOKEN' };
}

function receiveToken(payload) {
  return { type: 'RECEIVE_TOKEN',
    payload };
}

export function fetchToken() {
  return (dispatch) => {
    dispatch(requestToken());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => dispatch(receiveToken(data)));
  };
}

function requestQuestions() {
  return { type: 'REQUEST_QUESTIONS' };
}

function receiveQuestions(payload) {
  return { type: 'RECEIVE_QUESTIONS',
    payload };
}

export function fetchQuestions() {
  return (dispatch) => {
    dispatch(requestQuestions());
    return fetch(`https://opentdb.com/api.php?amount=5&token=${localStorage.getItem('token')}`)
      .then((response) => response.json())
      .then((data) => dispatch(receiveQuestions(data)));
  };
}
