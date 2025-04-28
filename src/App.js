import React, { Component } from 'react'
import { createBrowserRouter, RouterProvider, Route, Routes } from 'react-router-dom';
import login from './components/Login'
import signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Signup from './components/Signup'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/profile';
import MySyllabus from './components/Mysyllabus';
import ExamFee from './components/ExamFees'
import CollegeFee from './components/CollegeFees'
import Receipt from './components/Receipt';
import Certificate from './components/certificate';
import Attendance from './components/Attendance';

const App = () => {
  const myRouter = createBrowserRouter([
    { path: '', Component: Signup },
    { path: 'login', Component: login },
    { path: 'signup', Component: signup },
    { path: 'dashboard', Component: Dashboard },
    { path: 'profile', Component: Profile },
    { path: 'Mysyllabus', Component: MySyllabus },
    { path: 'ExamFee', Component: ExamFee },
    { path: 'CollegeFee', Component: CollegeFee },
    {path: 'Receipt', Component: Receipt},
    {path: 'Certificate', Component: Certificate},
    {path: 'Attendance', Component: Attendance},
    {path: 'alert', Component: alert},
  ])
  return (
    <>
      <RouterProvider router={myRouter} />
      {/* <ToastContainer/> */}
      <ToastContainer
        position="top-right" // Still needed for initial positioning
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
    </>
  )
}

export default App
