import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import defaultAction, { fetchQuestions, fetchToken } from '../store/actions';
import './GamePage.css';

const CONST_1 = 1;
const CONST_2 = 2;
const CONST_3 = 3;
const CONST_4 = 4;
const CONST_10 = 10;
const zeroPointFive = 0.5;
const ONE_THOUSAND = 1000;
const THIRTY_THOUSAND = 30000;
const THIRTY = 30;

class GamePage extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      selected: false,
      timer: 0,
      disabled: false,
      results: [],
      isLoading: true,
      renderNext: false,
      options: [],
    };
  }

  async componentDidMount() {
    const { getQuestions, getToken } = this.props;
    await getToken();
    await getQuestions(localStorage.getItem('token'));
    this.saveQuestions();
    this.handleTimer();
  }

  saveQuestions = () => {
    const { questions } = this.props;
    const options = questions
      .map((elem) => [elem.correct_answer, ...elem.incorrect_answers]
        .sort(() => Math.random() - zeroPointFive)); // solution to shuffle arrays on link https://flaviocopes.com/how-to-shuffle-array-javascript/
    this.setState({
      results: questions,
      options,
      isLoading: false,
    });
  }

  handleTimer = () => {
    const timer = setInterval(() => {
      this.setState((prevState) => (
        {
          timer: prevState.timer + 1,
        }
      ));
    }, ONE_THOUSAND);
    setTimeout(() => {
      this.setState({ disabled: true }, () => clearInterval(timer));
    }, THIRTY_THOUSAND);
  }

  handleCounter = () => {
    const { counter } = this.state;
    const { history } = this.props;
    if (counter < CONST_4) {
      this.setState((prevState) => ({ counter: prevState.counter + 1,
        timer: 0,
        renderNext: false,
        selected: false,
        disabled: false }));
    } else {
      history.push('/feedback');
    }
  }

  checkCorrectAnswer = ({ target }) => {
    const { timer, results, counter } = this.state;
    const { setScore } = this.props;
    const difficulty = () => {
      switch (results[counter].difficulty) {
      case 'hard':
        return CONST_3;
      case 'medium':
        return CONST_2;
      case 'easy':
        return CONST_1;
      default:
        return 0;
      }
    };
    const left = THIRTY - timer;
    this.setState({ selected: true, renderNext: true, disabled: true }, () => {
      if (target.name === 'correct_answer') {
        const obj = { score: CONST_10 + (left * difficulty()), assertions: 1 };
        setScore(obj);
      }
    });
  }

  render() {
    const { counter, selected,
      disabled, timer, results, isLoading, renderNext, options } = this.state;

    return (
      <div>
        <Header />
        {
          !isLoading && (
            <div>
              <h3>
                Timer:
                {' '}
                {timer}
              </h3>
              <h1 data-testid="question-category">{results[counter].category}</h1>
              <p data-testid="question-text">
                {results[counter].question}
              </p>
              <div data-testid="answer-options">
                { options[counter]
                  .map((question, index) => (
                    (results[counter]
                      .incorrect_answers.some((elem) => elem === question))
                      ? (
                        <button
                          type="button"
                          name="incorrect_answer"
                          data-testid={ `wrong-answer-${index}` }
                          key={ index }
                          onClick={ this.checkCorrectAnswer }
                          className={ `choice-incorrect${selected ? '--escolhido' : ''}` }
                          disabled={ disabled }
                        >
                          {question}
                        </button>)
                      : (
                        <button
                          type="button"
                          name="correct_answer"
                          data-testid="correct-answer"
                          key={ index }
                          onClick={ this.checkCorrectAnswer }
                          className={ `choice-correct${selected ? '--escolhido' : ''}` }
                          disabled={ disabled }
                        >
                          {question}

                        </button>)
                  ))}
              </div>
              <br />
              {renderNext
              && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.handleCounter }
                >
                  Next
                </button>
              )}
            </div>
          )
        }
      </div>
    );
  }
}
GamePage.propTypes = {
  getQuestions: PropTypes.func,
  questions: PropTypes.arrayOf,
  getToken: PropTypes.func,
  setScore: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  getQuestions: (token) => dispatch(fetchQuestions(token)),
  setScore: (state) => dispatch(defaultAction(state, 'UPDATE_SCORE')),
});

const mapStateToProps = (state) => ({
  questions: state.player.questions.results,
  token: state.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
