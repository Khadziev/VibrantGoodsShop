import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import store from '@/app/providers/store';

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => jest.fn(),
    useLocation: () => ({ pathname: '/' }),
  };
});

test('Header renders login button when no token present', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
  // Компонент показывает кнопку входа, когда нет токена
  expect(screen.getByText(/Войти/i)).toBeInTheDocument();
});
