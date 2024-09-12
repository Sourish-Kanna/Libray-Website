import React from 'react'
import { Link } from 'react-router-dom'
import {useScrollToHash} from '../../../CustomHooks/Navigation'
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function EResources() {

const refs=useScrollToHash(['university-syllabus','academic-calender','competitive-exam']);

return (
    <div className='font-serif mt-28'>
        <Link to='/academics'></Link>

        <div className='w-full h-48 bg-[#efefef] flex items-center justify-center'>
            <div >
                <div className='flex justify-center text-6xl font-bold text-[#014da1]'>
                    <p>Academics</p>
                </div>
                <div className="mx-auto mt-2 mb-10 border-b-4 border-red-600 w-44"></div>
            </div>
        </div>

                            {/* University Syllabus */}

        <div className='mx-40' ref={refs['university-syllabus']} id='university-syllabus'>
            <div className='flex items-center justify-center w-full h-40'>
                <div >
                    <div className='flex justify-center text-4xl font-bold '>
                        <p>University Syllabus</p>
                    </div>
                <div className="mx-auto mt-2 mb-10 border-b-4 border-blue-700 w-44"></div>
            </div>
            </div>
            <form id="question-paper-form" className="p-4 flex-col border bg-[#f3f2ed] rounded-2xl shadow-2xl w-3/4 h-auto mx-40 ">
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
            <button id="download-btn" className="px-4 py-2 mt-2 text-white rounded-md bg-[#f26d21] w-50 active:bg-[#fe8641] ">Download Syllabus</button>
            </div>
            </form>
        </div>
                                        {/* Academic Calender */}
            <div className='mx-40' ref={refs['academic-calender']} id='academic-calender'>
                <div className='flex items-center justify-center h-40 mx-40 mt-3'>
                    <div >
                        <div className='flex justify-center text-4xl font-bold '>
                            <p>Academic Calender</p>
                        </div>
                        <div className="mx-auto mt-2 mb-10 border-b-4 border-blue-700 w-44"></div>
                    </div>
                </div>
                <form id="question-paper-form" className="p-4 flex-col border bg-[#f3f2ed] rounded-2xl shadow-2xl w-3/4 h-auto mx-40 ">
            <div className="px-10 mb-4">
                <label htmlFor="exam" className="block mb-2 text-lg font-bold text-gray-700 ">Select Year:</label>
                <select id="exam" name="exam" className="w-full  p-3.5 border border-gray-400 rounded-md focus:border-blue-600 focus:ring-blue-600 ">
                    <option value="">Select Year</option>
                    <option value="c1">1</option>
                    <option value="c2">2</option>
                </select>
            </div>
            <div className="px-10 mb-4">
                <label htmlFor="subject" className="block mb-2 text-lg font-bold text-gray-700">Select Half:</label>
                <select id="subject" name="subject" className="w-full p-3.5 border border-gray-400 rounded-md focus:border-[#f26d21] focus:ring-[#f26d21]">
                    <option value="">Select Half</option>
                    <option value="b1">1</option>
                    <option value="b2">2</option>
                </select>
             </div>
            <div className='flex justify-center'>
            <button id="download-btn" className="px-4 py-2 mt-2 text-white rounded-md bg-[#f26d21] w-50 active:bg-[#fe8641] ">Download </button>
            </div>
            </form>
            </div>
                                        {/*Competitive Exam*/}
            <div ref={refs['competitive-exams']} id='competitive-exams'>
                <div className='flex items-center justify-center w-full h-40'>
                    <div >
                        <div className='flex justify-center text-4xl font-bold '>
                            <p>Competitive Exams</p>
                        </div>
                        <div className="mx-auto mt-2 mb-10 border-b-4 border-blue-700 w-44"></div>
                    </div>
                </div>
                <div className='mx-40 '>
                    <div className="relative group">
                        <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-700 shadow-xl rounded-xl">
                            <p className='text-white'>UPSE</p>
                            <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="h-0 mb-5 overflow-hidden duration-700 shadow-xl group-hover:h-28 rounded-xl">
                            <div className="flex-col content-center mx-10 my-3 text-xl transition-all duration-700 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                                <p className="py-2 text-lg">1) UPSC conducts the Civil Services Examination for recruitment to various Indian Administrative Service (IAS) and other top civil services.</p>
                                <p className="py-2 text-lg"><a href="https://upsc.gov.in/" target="_blank" rel="noopener noreferrer" className='text-[#f26d21] underline '> Click here for more information</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-700 shadow-xl rounded-xl">
                            <p className='text-white'>GRE</p>
                            <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="h-0 mb-5 overflow-hidden duration-700 shadow-xl group-hover:h-28 rounded-xl">
                            <div className="flex-col content-center mx-10 my-3 text-xl transition-all duration-700 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                                <p className="py-2 text-lg">1) The GRE assesses readiness for graduate programs through verbal, quantitative, and analytical writing tests.</p>
                                <p className="py-2 text-lg"><a href="https://www.ets.org/gre.html" target="_blank" rel="noopener noreferrer" className='underline text-[#f26d21]'> Click here for more information</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-700 shadow-xl rounded-xl">
                            <p className='text-white'>GATE</p>
                            <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="h-0 mb-5 overflow-hidden duration-700 shadow-xl group-hover:h-28 rounded-xl">
                            <div className="flex-col content-center mx-10 my-3 text-xl transition-all duration-700 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                                <p className="py-2 text-lg">1) GATE evaluates knowledge in engineering and science subjects for admissions to postgraduate programs and for various public sector job roles in India.</p>
                                <p className="py-2 text-lg"><a href="http://gate.iitd.ac.in/" target="_blank" rel="noopener noreferrer" className='underline text-[#f26d21]'> Click here for more information</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-700 shadow-xl rounded-xl">
                            <p className='text-white'>SAT</p>
                            <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="h-0 mb-5 overflow-hidden duration-700 shadow-xl group-hover:h-28 rounded-xl">
                            <div className="flex-col content-center mx-10 my-3 text-xl transition-all duration-700 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                                <p className="py-2 text-lg">1) The SAT is a college admission test that assesses a student's readiness for higher education through math, reading, and writing sections.</p>
                                <p className="py-2 text-lg"><a href="https://satsuite.collegeboard.org/sat" target="_blank" rel="noopener noreferrer" className='underline text-[#f26d21]'> Click here for more information</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-700 shadow-xl rounded-xl">
                            <p className='text-white'>TOFEL</p>
                            <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="h-0 mb-5 overflow-hidden duration-700 shadow-xl group-hover:h-28 rounded-xl">
                            <div className="flex-col content-center mx-10 my-3 text-xl transition-all duration-700 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                                <p className="py-2 text-lg">1) TOEFL measures English language proficiency for non-native speakers, assessing reading, writing, listening, and speaking skills for academic purposes.</p>
                                <p className="py-2 text-lg"><a href="https://www.ets.org/toefl.html" target="_blank" rel="noopener noreferrer" className='underline text-[#f26d21]'>Click here for more information</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <header className="mb-4 text-center h-14">
                <h1 className="mt-10 mb-8 text-4xl font-bold border-b-4 border-orange-400 h-14">E-Resources</h1>
            </header>
            <div className='flex justify-center h-24 align-center '>
              <p className='m-auto text-4xl font-bold text-orange-500 size-4/4'>List of E-resources subscribed by the Library for the year 2022</p>
            </div>
            <div className='grid grid-cols-4 gap-8 mx-10 text-2xl'>

              <div className='flex flex-col justify-between p-5 bg-yellow-100 rounded-xl'>
                  <p className='mb-3'>IEEE-ASPP:</p>
                  <p>The IEEE All Society Periodical Package provides access to IEEE journals, transactions, letters, magazines and conference proceedings, IET journals and conference proceedings, IEEE Standards and IEEE educational courses.  </p>
                  <a className='my-10' href="">Read more</a>
              </div>
              <div className='flex flex-col justify-between p-5 bg-yellow-100 rounded-xl'>
                  <p className='mb-3'>Science Direct:</p>
                  <p>Science Direct is Elsevier’s leading information solution forresearchers. Science Direct combines authoritative, full-text scientific, technical and health publications with smart,intuitive functionality so that users can stay informed in their fields and can work more effectively and efficiently.</p>
                  <a className='my-10' href="">Read more</a>
              </div>
              <div className='flex flex-col justify-between p-5 bg-yellow-100 rounded-xl'>
                  <p className='mb-3'>ASME:</p>
                  <p>THE AMERICAN SOCIETY OF MECHANICAL ENGINEERS promotes the art, science & practice of multidisciplinary engineering and allied sciences around the globe.Founded in 1880 by a small group of leading industrialists, ASME has grown through the decades to include more than 130,000 members in 151 countries. </p>
                  <a className='my-10' href="">Read more</a>
              </div>
              <div className='flex flex-col justify-between p-5 bg-yellow-100 rounded-xl'>
                  <p className='mb-3'>J-Gate Plus:</p>
                  <p>It is an electronic gateway to global e-journal literature. Launched in 2001 by Informatics India Limited. It provides seamless access to  millions of journal articles available online offered by 13,243 Publishers.It presently has a massive database of journal literature, indexed from 48,025 e-journals with links to full text at publisher sites.</p>
                  <a className='my-10' href="">Read more</a>
              </div>

              <div>

              </div>
            </div> */}
      
    </div>
  )
}