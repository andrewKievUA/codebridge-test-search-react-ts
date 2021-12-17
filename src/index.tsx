import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

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
  applyMiddleware(logger)
)

store.subscribe(() => console.log(store.getState()))
store.dispatch({ type: 'counter/incremented' })
store.dispatch({ type: 'counter/incremented' })
store.dispatch({ type: 'counter/decremented' })

console.log("HELLO");



ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>

,
  document.getElementById('root')
);


