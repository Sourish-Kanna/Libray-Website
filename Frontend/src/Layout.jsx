import NavBar from './Header'
import Footer from './Footer'
import { Outlet,ScrollRestoration } from 'react-router-dom'
// import Register from './Pages/Register'

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react";

function Layout() {
  return (
    <div className='scroll-smooth cursor-default'>
      <ScrollRestoration />
      <NavBar/>
      <Outlet/>
      <Footer/>
      <Analytics />
      <SpeedInsights />
    </div>
  )
}

export default Layout
