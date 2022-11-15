import { ERROR_COINS, REMOVE_EXPENSE, REQUEST_COINS,
  SAVE_EXPENSE, SUCCESS_COINS } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0,
};

const filterUSDT = (currencies) => {
  const coins = Object.keys(currencies);
  const filtered = coins.filter((element) => element !== 'USDT');
  return filtered;
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_COINS:
    return { ...state };

  case SUCCESS_COINS:
    return {
      ...state,
      currencies: filterUSDT(action.currencies),
    };

  case ERROR_COINS:
    return {
      ...state,
      error: action.error,
    };

  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };

  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };

  default:
    return state;
  }
};

export default wallet;
