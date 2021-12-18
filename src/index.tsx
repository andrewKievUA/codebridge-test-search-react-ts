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


// store.dispatch({ type: 'counter/incremented' })
// store.dispatch({ type: 'counter/incremented' })
// store.dispatch({ type: 'counter/decremented' })



// const fetchUsers=()=>{
//   return function (dispatch:any) {
//     axios.get('https://api.spaceflightnewsapi.net/v3/articles?_limit=100')
//          .then(function (response:any) {
//              // handle success
//              c(response.data,"// handle success")
//              return response.data
//          })
//          .catch(function (error:any) {
//              // handle error
//              console.log(error);
//          })
//          .then(function () {
//              // always executed
//          });
    
//   }
// }

// console.log(fetchUsers());


ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>

,
  document.getElementById('root')
);


