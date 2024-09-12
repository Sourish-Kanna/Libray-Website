// import React from 'react'
// import { Link } from 'react-router-dom'
export default function EResources() {
return (
    <div className='font-serif mt-28'>
        {/* <Link to='/academics'></Link> */}
        
        {/* Donate Books */}
        <div className='mx-40' id='Donate-books'>
            <div className='flex items-center justify-center w-full h-40'>
                <div>
                    <div className='flex justify-center text-4xl font-bold'>
                        <p>Donate Books</p>
                    </div>
                    <div className="mx-auto mt-2 mb-10 border-b-4 border-blue-700 w-44"></div>
                </div>
            </div>
            <form id="donate-book-form" className="p-4 flex-col border bg-[#f3f2ed] rounded-2xl shadow-2xl w-3/4 h-auto mx-40 ">
                <div className="px-10 mb-4">
                    <label htmlFor="exam" className="block mb-2 text-lg font-bold text-gray-700 ">Select Branch:</label>
                    <select id="exam" name="exam" className="w-full  p-3.5 border border-gray-400 rounded-md focus:border-blue-600 focus:ring-blue-600 ">
                        <option value="">Select Branch</option>
                        <option value="c1">1</option>
                        <option value="c2">2</option>
                    </select>
                </div>
                <div className="px-10 mb-4">
                    <label htmlFor="subject" className="block mb-2 text-lg font-bold text-gray-700">Select Semester:</label>
                    <select id="subject" name="subject" className="w-full p-3.5 border border-gray-400 rounded-md focus:border-[#f26d21] focus:ring-[#f26d21]">
                        <option value="">Select Semester</option>
                        <option value="b1">1</option>
                        <option value="b2">2</option>
                    </select>
                </div>
                <div className='flex justify-center'>
                <button id="download-btn" className="px-4 py-2 mt-2 text-white rounded-md bg-[#f26d21] w-50 active:bg-[#fe8641] hover:bg-[#fe8641] ">Submit form</button>
                </div>
            </form>
        </div>

            <div className='flex items-center justify-center w-full h-32'>
            </div>
    </div>
  )
}