import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Import to create redux store
import reducers from './reducers';
import {Provider} from 'react-redux';
import {createStore} from "redux";

// Axios
import axios from 'axios';

// Set axios defaults
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://rem-rest-api.herokuapp.com/api';

// Create redux store
const store = createStore(reducers);

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
