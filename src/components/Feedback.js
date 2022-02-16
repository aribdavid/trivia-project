import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Feedback extends React.Component {
  render() {
    const { name, score, email } = this.props;
    const hashEmail = md5(email).toString();

    return (
      <header>
        <img alt="profile" src={ `https://www.gravatar.com/avatar/${hashEmail}` } data-testid="header-profile-picture" />
        <h1 data-testid="header-player-name">{name}</h1>
        <h1 data-testid="header-score">
          {score}
        </h1>
      </header>
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  score: state.player.score,
  email: state.loginReducer.email,
});

export default connect(mapStateToProps, null)(Feedback);
