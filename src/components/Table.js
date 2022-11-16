import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense, removeExpense } from '../redux/actions';

class Table extends Component {
  removeExpenses = ({ target: { name } }) => {
    const { expenses, dispatch } = this.props;
    const rmvExpense = expenses.filter((expense) => expense.id !== Number(name));
    dispatch(removeExpense(rmvExpense));
  };

  editExpenses = ({ target: { id } }) => {
    const { dispatch } = this.props;
    const idForEdit = Number(id);
    dispatch(editExpense(idForEdit));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        {expenses.map((
          { description, tag, method, currency, value, exchangeRates, id },
        ) => (
          <tbody key={ id }>
            <tr>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{Number(value).toFixed(2)}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{Number(exchangeRates[currency].ask).toFixed(2) }</td>
              <td>{Number(exchangeRates[currency].ask * value).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  name={ id }
                  onClick={ this.editExpenses }
                >
                  Editar
                </button>
                <button
                  data-testid="delete-btn"
                  type="button"
                  name={ id }
                  onClick={ this.removeExpenses }
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape),
  dispatch: PropTypes.func,
}.isRequired;
const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});
export default connect(mapStateToProps)(Table);
