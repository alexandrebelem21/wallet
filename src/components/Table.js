import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <>
        <div>Table</div>
        <table border={ 4 }>
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
          <tbody>
            { (expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td>
                  { (Number(expense
                    .exchangeRates[expense.currency].ask) * Number(expense
                    .value)).toFixed(2) }
                </td>
                <td>Real</td>
                <td>Editar/Excluir</td>
              </tr>
            )))}
          </tbody>
        </table>
      </>
    );
  }
}
Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});
export default connect(mapStateToProps)(Table);
