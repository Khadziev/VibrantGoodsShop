import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/providers/store.ts';
import App from './app/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './shared/ui/ErrorBoundary/ErrorBoundary.tsx';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
