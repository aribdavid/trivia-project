import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions, fetchToken } from '../store/actions';
import './GamePage.css';

const zeroPointFive = 0.5;
const ONE_THOUSAND = 1000;
const THIRTY_THOUSAND = 30000;

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
    this.setState((prevState) => ({ counter: prevState.counter + 1 }));
  }

  checkCorrectAnswer = () => {
    this.setState({ selected: true });
  }

  render() {
    const { counter, selected, disabled, timer, results, isLoading } = this.state;
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
              <button type="button" onClick={ this.handleCounter }>Proxima</button>
            </div>
          )
        }
      </div>
    );
  }
}
GamePage.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf.isRequired,
  getToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

const mapStateToProps = (state) => ({
  questions: state.playerReducer.questions.results,
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
