import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/app/providers/store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('App renders without crashing', () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  expect(container).toBeTruthy();
});
