import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Sies_logo from './assets/sies_logo.png'
function Footer() {
  return (
    <div className="py-12 text-white bg-[#014da1] overflow-x-hidden">
    <div className="container px-4 mx-40">
      <div className="flex justify-between">
        <div>
          <div>

            {/* social media */}

          </div>
        </div>
        <div className="w-full p-6 md:w-1/3 xl:w-1/3">
          <h4 className="mb-4 font-serif font-bold">About</h4>
          <ul className='font-serif'>
            <li><a href="#" className="text-white hover:text-gray-300">Facilities</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Library Staffs</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Library Hours</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Infrastructure</a></li>
          </ul>
        </div>
        <div className="w-full p-6 md:w-1/3 xl:w-1/3">
          <h4 className="mb-4 font-serif font-bold">Academics</h4>
          <ul className='font-serif'>
            <li><a href="#" className="text-white hover:text-gray-300">Scholarship</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Rule&Guidelines</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Academic Calender</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Achievements</a></li>
          </ul>
        </div>
        <div className="w-full p-6 md:w-1/3 xl:w-1/3">
          <h4 className="mb-4 font-serif font-bold">Quick Links</h4>
          <ul className='font-serif'>
            <li><a href="#" className="text-white hover:text-gray-300">Question Banks</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Library Brochure</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">University Syllabus</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Scholarships</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Research Funds</a></li>
          </ul>
        </div>
        <div className="w-full p-6 md:w-1/3 xl:w-1/3">
          <h4 className="mb-4 font-serif font-bold">Others</h4>
          <ul className='font-serif'>
            <li><a href="#" className="text-white hover:text-gray-300">FAQs</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Contact Us</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Feedback</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">More</a></li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <p className="text-sm text-gray-400">© SIES Graduate School Of Technology.All Rights Reserved</p>
      </div>
    </div>
  </div>
  )
}

export default Footer
