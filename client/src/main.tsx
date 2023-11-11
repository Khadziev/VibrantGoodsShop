import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./app/providers/store.ts";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./pages/ErrorBoundary/ErrorBoundary.tsx";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
