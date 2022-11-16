import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const descriptionInputs = 'description-input';
const valueInputs = 'value-input';

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
    const valueInput = screen.getByTestId(valueInputs);
    expect(valueInput).toBeInTheDocument();
    expect(valueInput.type).toBe('number');
  });
  test('Input de descrição', () => {
    renderWithRedux(<Wallet />);
    const descriptionInput = screen.getByTestId(descriptionInputs);
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
    const valueInput = screen.getByTestId(valueInputs);
    const descriptionInput = screen.getByTestId(descriptionInputs);
    const buttonAdd = screen.getByRole('button');

    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, 'Um');
    userEvent.click(buttonAdd);
    expect(valueInput.textContent).toBe('');
    expect(descriptionInput.textContent).toBe('');
  });
});

describe('Testa tabela', () => {
  test('Dados aparecem na tabela e edita', async () => {
    renderWithRedux(<Wallet />);
    const valueInput = screen.getByTestId(valueInputs);
    const descriptionInput = screen.getByTestId(descriptionInputs);
    const buttonAdd = screen.getAllByRole('button');

    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, 'Um');
    userEvent.click(buttonAdd[0]);

    const descOne = await screen.findByText(/Um/i);
    expect(descOne).toBeInTheDocument();

    userEvent.type(valueInput, '5');
    userEvent.type(descriptionInput, 'Five');
    userEvent.click(buttonAdd[0]);

    const descFive = await screen.findByText(/Five/i);
    expect(descFive).toBeInTheDocument();

    const buttonEdit = await screen.findAllByText('Editar');
    userEvent.click(buttonEdit[0]);

    userEvent.type(valueInput, '2');
    userEvent.type(descriptionInput, 'Two');
    userEvent.click(buttonAdd[0]);

    const descTwo = await screen.findByText(/Two/i);
    expect(descTwo).toBeInTheDocument();
    expect(descFive).toBeInTheDocument();
  });
});

test('Exclui dados da tabela', async () => {
  renderWithRedux(<Wallet />);
  const valueInput = screen.getByTestId(valueInputs);
  userEvent.type(valueInput, '1');
  const descriptionInput = screen.getByTestId(descriptionInputs);
  userEvent.type(descriptionInput, 'One');
  const buttonAdd = screen.getAllByRole('button');
  userEvent.click(buttonAdd[0]);
  jest.spyOn(global, 'fetch');
  global.fetch = fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
  const descOne = await screen.findByText(/One/i);
  expect(descOne).toBeInTheDocument();
  const buttonRemove = screen.getByTestId('delete-btn');
  userEvent.click(buttonRemove);
  expect(descOne).not.toBeInTheDocument();
});
