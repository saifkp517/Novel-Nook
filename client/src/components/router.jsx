import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home'
import Dash from '../pages/Blog'
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile'

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route path='/' element={<Login/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/main' element={<Dash/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/profile' element={<Profile/>} />
    </Routes>
  );
}

export default Main;