import React from 'react';

import { Homepage } from './pages/Homepage/Homepage';
import { SoloPage } from './pages/SoloPage/SoloPage';

import {Route, Switch,Redirect} from "react-router-dom";
import './App.css';

function App() {


  return  (
    <Switch>
    <Route  exact  path="/" component={Homepage}/>
    <Route  path="/solo/" component={SoloPage}/> 
 
</Switch>
  ) 
}

export default App;
