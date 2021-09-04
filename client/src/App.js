import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import './App.css';

import Home from './compoment/Pages/Home/Home';
import Navigation from './compoment/Common/Navigation/Navigation';
import Authenticate from './compoment/Pages/Authenticate/Authenticate';
import Activate from './compoment/Pages/Activate/Activate';
import Rooms from './compoment/Pages/Rooms/Rooms';

import { useSelector } from 'react-redux';

function App() {
  return (
    <BrowserRouter>
      <Navigation/>
       <Switch>
         <GuestRoute path='/' exact>
           <Home />
         </GuestRoute>
        
         <GuestRoute path='/authenticate'>
           <Authenticate />
         </GuestRoute>

         <SemiProtectedRoute path='/activate'>
              <Activate />
         </SemiProtectedRoute>

         <ProtectedRoute path='/rooms'>
             <Rooms />
         </ProtectedRoute>

       </Switch>
    </BrowserRouter>
  );
}


const GuestRoute = ({children, ...rest})=>{
  const { isAuth} = useSelector((state)=> state.auth);
  return (
    <Route
      {...rest}
      render={({location})=> {
        return isAuth ? ( <Redirect to={{ pathname: '/rooms', state: { from : location} }} /> ): ( children )
      }}
    ></Route>
  )
};

const SemiProtectedRoute = ({children, ...rest})=>{
  const { user, isAuth} = useSelector((state)=> state.auth);
  return (
    <Route
      {...rest}
      render={({location})=>{
        return (
          !isAuth ? ( <Redirect to={{ pathname: '/', state: { from: location} }} /> )
                : isAuth && !user.activated ? ( children ) 
                : ( <Redirect to= {{ pathname: '/rooms', state: { from : location} }} /> )
        )
      }}
    ></Route>
  )
};

const ProtectedRoute = ({children, ...rest})=>{
  const { user, isAuth} = useSelector((state)=> state.auth);
    return (
      <Route
        {...rest}
        render={ ({location})=>{
          return !isAuth ? ( <Redirect to={{ pathname: '/', state: { from : location} }} /> ) 
                 : isAuth && !user.activated ? ( <Redirect to= {{ pathname: '/activate', state: { from: location} }} /> )
                 : ( children)
        }}
      >
      </Route>
    )
}

export default App;
