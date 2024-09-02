import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from './Pages/NavBar/NavBar'
import Footer from './Pages/Footer/Footer'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
