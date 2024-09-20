import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons'; // for brand icons
import Sies_logo from './assets/sies white logo.png'
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { NavLink ,Link} from 'react-router-dom';

function Footer() {
  return (
    <div className="py-12 text-white bg-[#014da1] overflow-x-hidden ">
        <div className=" px-4 mx-40">
            <div className="flex justify-between w-11/12">
                <div>
          <div>
            <img className='w-56' src={Sies_logo} alt="" />
          </div>
          <div className=''>
            <FontAwesomeIcon className="text-4xl mr-7 my-10 text-white hover:text-[#f26d21] duration-700" icon={faInstagram} />
            <FontAwesomeIcon className='text-4xl mr-7 my-10 text-white hover:text-[#f26d21] duration-700' icon={faFacebook} />
            <FontAwesomeIcon className='text-4xl mr-7 my-10 text-white hover:text-[#f26d21] duration-700' icon={faLinkedin} />
            <FontAwesomeIcon className='text-4xl mr-7 my-10 text-white hover:text-[#f26d21] duration-700' icon={faYoutube} />
          </div>
        </div>
        <div className=" py-6 ">
          <NavLink to="/about" className={({ isActive }) =>`${isActive ? 'text-[#f26d21]' : 'text-white hover:text-gray-300'}` }>
            <h4 className="mb-4 font-serif font-bold cursor-pointer">About</h4>
          </NavLink>
          <ul className='font-serif'>
            <Link to='/about#library-hours'><li><p className="text-white hover:text-gray-300 cursor-pointer">Library Hours</p></li></Link>
            <Link to='/about#library-staffs'><li><p className="text-white hover:text-gray-300 cursor-pointer">Library Staffs</p></li></Link>
            <Link to='/about#facilities'><li><p className="text-white hover:text-gray-300 cursor-pointer">Facilities</p></li></Link>
            <Link to='/about#infrastructure'><li><p className="text-white hover:text-gray-300 cursor-pointer">Infrastructure</p></li></Link>
          </ul>
        </div>
        <div className=" py-6 ">
          <NavLink to="/academics" className={({ isActive }) =>`${isActive ? 'text-[#f26d21]' : 'text-white hover:text-gray-300'}` }>
            <h4 className="mb-4 font-serif font-bold cursor-pointer">Academics</h4>
          </NavLink>
          <ul className='font-serif'>
            <Link to='/academics#university-syllabus'><li><p className="text-white hover:text-gray-300 cursor-pointer">University Syllabus</p></li></Link>
            <Link to='/academics#academic-calender'><li><p className="text-white hover:text-gray-300 cursor-pointer">Acadimic Calender</p></li></Link>
            <Link to='/academics#competitive-exams'><li><p className="text-white hover:text-gray-300 cursor-pointer">Competitive Exams</p></li></Link>
            {/* <li><p className="text-white hover:text-gray-300 cursor-pointer">Achievements</p></li> */}
          </ul>
        </div>
        <div className=" p-y6 ">
          <NavLink to="/quicklinks" className={({ isActive }) =>`${isActive ? 'text-[#f26d21]' : 'text-white hover:text-gray-300'}` }>
            <h4 className="mb-4 font-serif font-bold cursor-pointer mt-6">Quick Links</h4>
          </NavLink>
          <ul className='font-serif'>
            <Link to=''><li><p className="text-white hover:text-gray-300 cursor-pointer">Question Banks</p></li></Link>
            <Link to=''><li><p className="text-white hover:text-gray-300 cursor-pointer">Plagiarism Tool</p></li></Link>
            <Link to='/donate-books'><li><p className="text-white hover:text-gray-300 cursor-pointer">Donate Books</p></li></Link>
            <Link to='/suggest-books'><li><p className="text-white hover:text-gray-300 cursor-pointer">Suggest Books</p></li></Link>
            <li><p className="text-white hover:text-gray-300 cursor-pointer">Scholarship</p></li>
            <Link to=''><li><p className="text-white hover:text-gray-300 cursor-pointer">Research Funds</p></li></Link>
            <Link to=''><li><p className="text-white hover:text-gray-300 cursor-pointer">Library Brochure</p></li></Link>
          </ul>
        </div>
        <div className=" p-y6 ">
          <NavLink to="/others" className={({ isActive }) =>`${isActive ? 'text-[#f26d21]' : 'text-white hover:text-gray-300'}` }>
            <h4 className="mb-4 font-serif font-bold cursor-pointer mt-6">Others</h4>
          </NavLink>
          <ul className='font-serif'>
            <Link to='/others#IEEE'><li><p className="text-white hover:text-gray-300 cursor-pointer">IEEE</p></li></Link>
            <Link to=''></Link><li><p className="text-white hover:text-gray-300 cursor-pointer">DELNET</p></li>
            <Link to=''></Link><li><p className="text-white hover:text-gray-300 cursor-pointer">E-Books</p></li>
            <Link to=''></Link><li><p className="text-white hover:text-gray-300 cursor-pointer">Events</p></li>
            <Link to=''></Link><li><p className="text-white hover:text-gray-300 cursor-pointer">Contact Us</p></li>
            <Link to=''></Link><li><p className="text-white hover:text-gray-300 cursor-pointer">Feedback</p></li>
            <Link to=''></Link><li><p className="text-white hover:text-gray-300 cursor-pointer">More</p></li>
          </ul>
        </div>
      </div>
      
    </div>
    <div className="flex justify-center mt-6">
        <p className="text-sm text-gray-400">© SIES Graduate School Of Technology.All Rights Reserved</p>
      </div>
  </div>
  )
}

export default Footer
