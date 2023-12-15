import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../loginpage/loginPage'; 
import Header from '../Header/header';

const RouterPage: React.FC = () => {
    const [userData,setUserData]=useState("");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage  setUserData={setUserData} />}></Route>
          <Route path='/landingPage' element={<Header/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterPage;
