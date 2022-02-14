import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import defaultAction from '../store/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      disableButton: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, this.validateButton());
  }

  validateButton = () => {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      return this.setState({ disableButton: false });
    }
    return this.setState({ disableButton: true });
  };

  render() {
    const { disableButton, name, email } = this.state;
    const { setGlobalUser } = this.props;
    return (
      <main>
        <label htmlFor="name">
          Digite seu nome:
          <input
            onChange={ this.handleChange }
            value={ name }
            name="name"
            type="text"
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          Digite seu email:
          <input
            onChange={ this.handleChange }
            value={ email }
            name="email"
            type="email"
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          data-testid="btn-play"
          disabled={ disableButton }
          type="button"
          onClick={ setGlobalUser(this.state) }
        >
          Play
        </button>
      </main>
    );
  }
}

Login.propTypes = {
  setGlobalUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setGlobalUser: (state) => dispatch(defaultAction(state, 'PLAY_GAME')),
});

export default connect(null, mapDispatchToProps)(Login);
