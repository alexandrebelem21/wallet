import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, editedExpense, fetchCoinApi } from '../redux/actions';
import getCoinApi from '../services/getCoinApi';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoinApi());
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  expense = async () => {
    const { expenses, dispatch } = this.props;
    const api = await getCoinApi();
    const data = this.state;
    data.exchangeRates = api;
    data.id = expenses.length;
    dispatch(addExpense(data));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  edit = async () => {
    const { value, currency, method, tag, description } = this.state;
    const { dispatch, expenses, idToEdit } = this.props;

    const data = await getCoinApi();
    const expenseObj = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };

    const editedArr = expenses.map((exps) => (exps.id !== idToEdit ? exps : expenseObj));
    dispatch(editedExpense(editedArr));

    this.setState({
      description: '',
      value: '',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency,
      method, tag } = this.state;
    return (
      <div>
        <input
          type="number"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />

        <select
          id="currency"
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {
            currencies.map((el) => <option key={ el } value={ el }>{ el }</option>)
          }
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        {
          editor
            ? (
              <button
                type="button"
                onClick={ this.edit }
              >
                Editar despesa
              </button>
            ) : (
              <button
                type="button"
                onClick={ this.expense }
              >
                Adicionar despesa
              </button>
            )
        }
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf,
  dispatch: PropTypes.func,
  editor: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
