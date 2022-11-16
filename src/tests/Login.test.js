import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Componentes renderizados', () => {
  const email = 'email-input';
  const password = 'password-input';
  test('Renderiza', () => {
    renderWithRouterAndRedux(<App />, {
    });

    expect(screen.getByTestId(email));
    expect(screen.getByTestId(password));
    expect(screen.getByText('Entrar'));
  });

  test('Btn disable', () => {
    renderWithRouterAndRedux(<App />, {
    });
    userEvent.type(screen.getByTestId(email), 'alexandre@gmail.com');
    expect(screen.getByTestId(email).value).toBe('alexandre@gmail.com');
    expect(screen.getByText('Entrar')).toHaveAttribute('disabled');
  });

  test('Btn not disable', () => {
    renderWithRouterAndRedux(<App />, {
    });
    userEvent.type(screen.getByTestId(email), 'alexandres@gmail.com');
    userEvent.type(screen.getByTestId(password), '123456');
    expect(screen.getByTestId(email).value).toBe('alexandres@gmail.com');
    expect(screen.getByTestId(password).value).toBe('123456');
    expect(screen.getByText('Entrar')).not.toHaveAttribute('disabled');
  });

  test('click Btn', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByTestId(email), 'alexs@gmail.com');
    userEvent.type(screen.getByTestId(password), '123456');
    act(() => {
      userEvent.click(screen.getByText('Entrar'));
    });
    expect(history.location.pathname).toBe('/carteira');
  });
});
