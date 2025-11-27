import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../ScrollToTop';

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <div className='mx-4 sm:mx-[8%]'>
        <Footer />
      </div>
    </>

  );
};

export default MainLayout;
