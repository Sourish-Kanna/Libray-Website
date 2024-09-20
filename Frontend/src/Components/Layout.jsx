// import React from 'react'
// import { Link } from 'react-router-dom'
import NavBar from './Pages/NavBar/NavBar'
import Footer from './Pages/Footer/Footer'
import { Outlet,ScrollRestoration } from 'react-router-dom'
import Register from './Pages/Registration/Register'

function Layout() {
  return (
    <div className='scroll-smooth'>
      <ScrollRestoration />
      
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
