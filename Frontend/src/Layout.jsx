import NavBar from './Pages/Header'
import Footer from './Pages/Footer'
import { Outlet,ScrollRestoration } from 'react-router-dom'
// import Register from './Pages/Register'

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
