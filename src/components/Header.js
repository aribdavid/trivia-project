import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <header>
        <img alt="profile" src={ gravatarEmail } data-testid="header-profile-picture" />
        <h1 data-testid="header-player-name">{name}</h1>
        <h1 data-testid="header-player-score">{score}</h1>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  score: state.playerReducer.score,
  gravatarEmail: state.playerReducer.gravatarEmail,
});

export default connect(mapStateToProps, null)(Header);
