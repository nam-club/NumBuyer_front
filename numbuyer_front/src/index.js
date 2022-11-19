import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import createStore from './redux/store/store';

import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history';
import { theme } from "./templates/theme";
import { ThemeProvider } from '@mui/material/styles';

const history = History.createBrowserHistory();
export const store = createStore(history);

if (process.env.NODE_ENV !== "development") {
  console.log = () => {};
  console.info = () => {};
  console.debug = () => {};
  console.warn = () => {};
  console.error = () => {};
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Helmet bodyAttributes={{style: 'background: linear-gradient(25deg, #4682b4, #000000)'}}/>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
