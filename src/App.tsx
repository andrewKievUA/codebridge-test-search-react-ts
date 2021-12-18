import React from 'react';

import { Homepage } from './pages/Homepage/Homepage';
import { SoloPage } from './pages/SoloPage/SoloPage';

import {Route, Routes} from "react-router-dom";
import './App.css';

function App() {


  return  (
    <Routes>
    <Route    path="/" element={<Homepage/>}/>
    <Route  path="/solo/:id" element={<SoloPage/>}/> 
 
</Routes>
  ) 
}

export default App;
