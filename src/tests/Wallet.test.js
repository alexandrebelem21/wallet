import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testa se os componentes são renderizados na tela inicial', () => {
  test('Valor total esta na tela', () => {
    renderWithRedux(<Wallet />);
    const totalField = screen.getByTestId('total-field');
    expect(totalField).toBeInTheDocument();
    expect(totalField.textContent).toBe('0.00');
  });
  test('Se e-mail esta na tela', () => {
    renderWithRedux(<Wallet />);
    const emailField = screen.getByTestId('email-field');
    expect(emailField).toBeInTheDocument();
  });
  test('moeda BRL', () => {
    renderWithRedux(<Wallet />);
    const headerCurrencyField = screen.getByTestId('header-currency-field');
    expect(headerCurrencyField).toBeInTheDocument();
    expect(headerCurrencyField.textContent).toBe('BRL');
  });
  test('Input de valor', () => {
    renderWithRedux(<Wallet />);
    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();
    expect(valueInput.type).toBe('number');
  });
  test('Input de descrição', () => {
    renderWithRedux(<Wallet />);
    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput.type).toBe('text');
  });
  test('Selection moeda', () => {
    renderWithRedux(<Wallet />);
    const currencyInput = screen.getByTestId('currency-input');
    expect(currencyInput).toBeInTheDocument();
  });
  test('Selection metodo de pagamento', () => {
    renderWithRedux(<Wallet />);
    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();
  });
  test('Selection tag', () => {
    renderWithRedux(<Wallet />);
    const tagInput = screen.getByTestId('tag-input');
    expect(tagInput).toBeInTheDocument();
  });
});

describe('Testa add nova despesa', () => {
  test('Despesa', async () => {
    renderWithRedux(<Wallet />);
    const valueInput = screen.getByTestId('value-input');
    userEvent.type(valueInput, '100');
    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'Mercado');
    const buttonAdd = screen.getByRole('button');
    userEvent.click(buttonAdd);
    expect(valueInput.textContent).toBe('');
    expect(descriptionInput.textContent).toBe('');
  });
});
