// import { useState } from 'react'
import './App.css'
import './index.css'
import React from 'react'
// import NavBar from './Components/Pages/NavBar/NavBar'
// import Footer from './Components/Pages/Footer/Footer'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Layout from './Components/Layout'
import HomePage from './Components/Pages/HomePage/HomePage'
import AboutUs from './Components/Pages/AboutUs/AboutUs'
import ContactUs from './Components/Pages/ContactUs/ContactUs'
import Academics from './Components/Pages/Academics/Academics'
import Others from './Components/Pages/Others/Others'
import Services from './Components/Pages/QuickLinks/QuickLinks'
import FAQs from './Components/Pages/FAQs/FAQs'
  const router = createBrowserRouter(
    createRoutesFromElements(
     
      <Route path='/' element={<Layout/>}>
        <Route path='' element={<HomePage/>}/>
        <Route path='about' element={<AboutUs/>}/>
        <Route path='contactus' element={<ContactUs/>}/>
        <Route path='academics' element={<Academics/>}/>
        <Route path='others' element={<Others/>}/>
        <Route path='quicklinks' element={<Services/>}/>
        <Route path='faqs' element={<FAQs/>}/>
      </Route>
    )
  )

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider  router={router}/>
    </React.StrictMode>,
  )