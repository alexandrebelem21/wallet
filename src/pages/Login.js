import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.type]: target.value,
    }, () => this.handleButton());
  };

  handleButton = () => {
    const { email, password } = this.state;
    const SIX = 6;
    const regex = /\S+@\S+\.\S+/;
    const pass = password.length >= SIX;
    if (regex.test(email) && email && pass) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  render() {
    const { email, password, isDisabled } = this.state;
    const { dispatch } = this.props;
    return (
      <div>
        <input
          data-testid="email-input"
          type="email"
          placeholder="email@email.com"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Senha"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />

        <Link to="/carteira">
          <button
            type="button"
            onClick={ () => dispatch(addEmail(email)) }
            disabled={ isDisabled }
          >
            Entrar

          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Login);
