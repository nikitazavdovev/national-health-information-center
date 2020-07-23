import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {compose, createStore} from "redux";
import {Provider} from 'react-redux';
import {rootReducer} from "./store/rootReducer";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from "./components/AlertTemplate/AlertTemplate";
import {loadState, saveState} from "./utils/localStorage";

const persistedState = loadState();
const store = createStore(rootReducer, persistedState ,compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

store.subscribe(() => {
  //TODO: prevent saving every time
  saveState({
    user: store.getState().user
  })
});

const alertOptions = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 999
  }
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <App />
        </AlertProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
