import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Import to create redux store
import reducers from './reducers';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas";
import 'bootstrap/dist/css/bootstrap.min.css';

// Axios
import axios from 'axios';

// Set axios defaults
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'https://rem-rest-api.herokuapp.com/api';
axios.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/https://rem.dbwebb.se/api';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create redux store
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
    <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
