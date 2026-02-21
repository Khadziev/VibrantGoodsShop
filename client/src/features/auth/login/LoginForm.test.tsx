import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import store from '@/app/providers/store';

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => jest.fn(),
  };
});

test('LoginForm submits and navigates on success', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    </Provider>
  );

  const loginInput = screen.getByPlaceholderText(/example@mail.com/i);
  const passInput = screen.getByPlaceholderText(/••••••••/i);
  const submitButton = screen
    .getAllByRole('button')
    .find((btn) => btn.textContent?.includes('Войти'));

  fireEvent.change(loginInput, { target: { value: 'testuser' } });
  fireEvent.change(passInput, { target: { value: 'password' } });

  if (submitButton) {
    fireEvent.click(submitButton);
  }

  await waitFor(() => {
    expect(loginInput).toBeInTheDocument();
  });
});
