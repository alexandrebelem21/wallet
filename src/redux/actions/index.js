// Coloque aqui suas actions

import getCoinApi from '../../services/getCoinApi';

// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const REQUEST_COINS = 'REQUEST_COINS';

export const SUCCESS_COINS = 'SUCCESS_COINS';

export const ERROR_COINS = 'ERROR_COINS';

export const requestCoins = () => ({
  type: REQUEST_COINS,
});

export const successCoins = (currencies) => ({
  type: SUCCESS_COINS,
  currencies,
});

export const errorCoins = (error) => ({
  type: ERROR_COINS,
  error,
});

export function fetchCoinApi() {
  return async (dispatch) => {
    dispatch(requestCoins());
    try {
      const response = await getCoinApi();
      dispatch(successCoins(response));
    } catch (error) {
      dispatch(errorCoins(error));
    }
  };
}
