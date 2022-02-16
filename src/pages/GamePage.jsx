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
    this.setState({
      results: questions,
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
    if (counter < CONST_4) {
      this.setState((prevState) => ({ counter: prevState.counter + 1, timer: 0 }));
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
    this.setState({ selected: true, renderNext: true }, () => {
      if (target.name === 'correct_answer') {
        setScore(CONST_10 + (left * difficulty()));
      }
    });
  }

  render() {
    const { counter, selected,
      disabled, timer, results, isLoading, renderNext } = this.state;

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
                { [results[counter].correct_answer, ...results[counter].incorrect_answers]
                  .sort(() => Math.random() - zeroPointFive) // solution to shuffle arrays on link https://flaviocopes.com/how-to-shuffle-array-javascript/
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
              ) }
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
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
