import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import Login from '../pages/Login';

describe('Testa se os componentes são renderizados na tela inicial', () => {
  test('Input de e-mail', () => {
    renderWithRedux(<Login />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.type).toBe('text');
  });
  test('Input de senha', () => {
    renderWithRedux(<Login />);
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.type).toBe('text');
    expect(passwordInput.min).toBe('6');
  });
  test('Botao entrar', () => {
    renderWithRedux(<Login />);
    const buttonInput = screen.getByRole('button');
    expect(buttonInput).toBeInTheDocument();
    expect(buttonInput.disabled).toBe(true);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(emailInput, 'ale@teste.com');
    userEvent.type(passwordInput, '87654321');
    expect(buttonInput.disabled).toBe(false);
  });
});
