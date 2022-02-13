import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals'
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import rootReducer from './reducers'
import ThemeContextWrapper from './components/tools/theme/ThemeContextWrapper';

// Outils uniquement en dev, à retirer en prod
import { composeWithDevTools } from "redux-devtools-extension"
import logger from "redux-logger"

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeContextWrapper>
        <App />
      </ThemeContextWrapper>
    </Provider>
  </React.StrictMode>,
  document.getElementById('main')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
