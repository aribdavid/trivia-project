import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions, fetchToken } from '../store/actions';

const zeroPointFive = 0.5;

class GamePage extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }

  async componentDidMount() {
    const { getQuestions, getToken } = this.props;
    await getToken();
    await getQuestions(localStorage.getItem('token'));
  }

  handleCounter = () => {
    this.setState((prevState) => ({ counter: prevState.counter + 1 }));
  }

  checkCorrectAnswer = ({ target }) => {
    if (target.name === 'correct_answer') {
      return ('Acertou');
    }
  }

  render() {
    const { questions, loading } = this.props;
    const { counter } = this.state;
    return (
      <div>
        <Header />
        {
          !loading && (
            <div>
              <h1 data-testid="question-category">{questions[counter].category}</h1>
              <p data-testid="question-text">
                {questions[counter].question}
              </p>
              <div data-testid="answer-options">
                {[questions[counter].correct_answer,
                  ...questions[counter].incorrect_answers]
                  .sort(() => Math.random() - zeroPointFive) // solution to shuffle arrays on link https://flaviocopes.com/how-to-shuffle-array-javascript/
                  .map((question, index) => (
                    (questions[counter]
                      .incorrect_answers.some((elem) => elem === question))
                      ? (
                        <button
                          type="button"
                          data-testid={ `wrong-answer-${index}` }
                          key={ index }
                          onClick={ this.checkCorrectAnswer }
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
  loading: PropTypes.bool.isRequired,
  getToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

const mapStateToProps = (state) => ({
  questions: state.playerReducer.questions.results,
  loading: state.playerReducer.loading,
  response: state.playerReducer.questions.response_code,
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
