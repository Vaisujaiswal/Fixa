import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return <Outlet />; // just render page directly, no margin wrapper
};

export default AuthLayout;
