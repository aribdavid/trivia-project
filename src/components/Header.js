import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
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

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(Header);
