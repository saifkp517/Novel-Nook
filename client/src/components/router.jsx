import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Dash from '../pages/Blog';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import ConfirmPurchase from '../pages/ConfirmPurchase';
import Transactions from '../pages/Transactions';
import Delivery from '../pages/Delivery';

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route path='/' element={<Login/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/main' element={<Dash/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/dashboard/users' element={<Dashboard/>} />
      <Route path='/dashboard/orders' element={<Transactions/>} />
      <Route path='/confirmpurchase/:bookid' element={<ConfirmPurchase/>} />
      <Route path='/delivery/:userid' element={<Delivery/>} />
    </Routes>
  );
}

export default Main;