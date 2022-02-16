import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';

const THREE = 3;

class Feedback extends React.Component {
  componentDidMount() {
    const { name, score, email } = this.props;
    const currentRank = JSON.parse(localStorage.getItem('ranking'));
    if (currentRank) {
      localStorage.setItem('ranking',
        JSON.stringify([...currentRank, {
          name,
          picture: email,
          score,
        }]));
    } else {
      localStorage.setItem('ranking',
        JSON.stringify([{
          name,
          picture: email,
          score,
        }]));
    }
  }

  feedbackText = () => {
    const { assertions } = this.props;
    if (assertions < THREE) {
      return 'Could be better...';
    }
    return 'Well Done!';
  };

  render() {
    const { name, score, email, loading, assertions } = this.props;
    const hashEmail = md5(email).toString();

    return (
      !loading && (
        <header>
          <img alt="profile" src={ `https://www.gravatar.com/avatar/${hashEmail}` } data-testid="header-profile-picture" />
          <h1 data-testid="header-player-name">{name}</h1>
          <h1 data-testid="header-score">
            {score}
          </h1>
          <h2 data-testid="feedback-text">{this.feedbackText()}</h2>
          <div>
            <h2>Placar</h2>
            <h3 data-testid="feedback-total-score">{score}</h3>
            <h3 data-testid="feedback-total-question">{assertions}</h3>
          </div>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">Play Again</button>
          </Link>
          <Link to="/ranking">
            <button type="button" data-testid="btn-ranking">Ranking</button>
          </Link>
        </header>
      )
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
  assertions: state.player.assertions,
  ranking: state.player.ranking,
});

export default connect(mapStateToProps, null)(Feedback);
