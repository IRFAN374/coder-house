import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import './App.css';

import Home from './compoment/Pages/Home/Home';
import Navigation from './compoment/Common/Navigation/Navigation';
import Register from './compoment/Pages/Register/Register';
import Login from './compoment/Pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Navigation/>
       <Switch>
         <Route path='/' exact>
           <Home />
         </Route>
         <Route path='/register'> <Register/>  </Route>
         <Route path='/login'> <Login/>  </Route>
       </Switch>
    </BrowserRouter>
  );
}

export default App;
