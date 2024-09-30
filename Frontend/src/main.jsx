import './css/index.css'
import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Layout from './Layout'
import HomePage from './HomePage'
import AboutUs from './Pages/AboutUs'
import ContactUs from './Pages/ContactUs'
import Academics from './Pages/Academics'
import Others from './Pages/Others'
import Services from './Pages/QuickLinks'
import DonateBooks from './Pages/DonateBooks'
import SuggestBooks from './Pages/SuggestBooks'
import Register from './Pages/Register'

  const router = createBrowserRouter(
    createRoutesFromElements(
    <>
      <Route path='/' element={<Layout/>}>
        <Route path='' element={<HomePage/>}/>
        <Route path='home' element={<HomePage/>}/>
        <Route path='about' element={<AboutUs/>}/>
        <Route path='contactus' element={<ContactUs/>}/>
        <Route path='academics' element={<Academics/>}/>
        <Route path='others' element={<Others/>}/>
        <Route path='quicklinks' element={<Services/>}/>
        <Route path='donate-books' element={<DonateBooks/>}/>
        <Route path='suggest-books' element={<SuggestBooks/>}/>
      </Route>
      <Route path='register' element={<Register/>} />
    </>
    )
  )

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider  router={router}/>
    </React.StrictMode>,
  )