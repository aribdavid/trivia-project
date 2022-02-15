import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultAction, { fetchToken } from '../store/actions';

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

   startGame = async () => {
     const { setGlobalUser } = this.props;
     const { name, email } = this.state;
     setGlobalUser({ name, email });
   }

   render() {
     const { disableButton, name, email } = this.state;

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
         <Link to="/play">
           <button
             data-testid="btn-play"
             disabled={ disableButton }
             type="button"
             onClick={ this.startGame }
           >
             Play
           </button>
         </Link>
         <Link to="/settings">
           <button data-testid="btn-settings" type="button">
             Configurações
           </button>
         </Link>
       </main>
     );
   }
}

Login.propTypes = {
  setGlobalUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setGlobalUser: (state) => dispatch(defaultAction(state, 'PLAY_GAME')),
  getToken: () => dispatch(fetchToken()),
});

export default connect(null, mapDispatchToProps)(Login);
