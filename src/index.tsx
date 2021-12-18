import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import  axios from 'axios'

import logger from 'redux-logger'




function counterReducer(state = { value: 0 }, action :any) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 }
    case 'counter/decremented':
      return { value: state.value - 1 }
    default:
      return state
  }
}

const store = createStore(
  counterReducer,
  applyMiddleware(logger,thunk)
)


ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>

,
  document.getElementById('root')
);


