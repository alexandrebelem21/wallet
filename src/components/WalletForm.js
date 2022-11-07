import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoinApi } from '../redux/actions';

class WalletForm extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoinApi());
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <div>
        <input
          type="number"
          data-testid="value-input"
          name="value"
        />
        <input
          type="text"
          data-testid="description-input"
          name="description"
        />

        <select
          id="currency"
          data-testid="currency-input"
          name="currency"
        >
          {
            currencies.map((el) => <option key={ el } value={ el }>{ el }</option>)
          }
        </select>
        <select
          data-testid="method-input"
          name="method"
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="credito">Cartão de crédito</option>
          <option value="debito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
        >
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf,
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
