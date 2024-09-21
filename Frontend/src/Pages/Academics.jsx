import { Link } from 'react-router-dom'
import {useScrollToHash} from './Navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSmoothScroll } from './Navigation'

export default function EResources() {
useSmoothScroll();
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
                    <option value="c1">MECHANICAL</option>
                    <option value="c2">AIDS</option>
                    <option value="c3">AIML</option>
                    <option value="c4">IT</option>
                    <option value="c5">EXTC</option>
                    <option value="c6">ECS</option>
                    <option value="c7">IOT</option>


                </select>
            </div>
            <div className="px-10 mb-4">
                <label htmlFor="subject" className="block mb-2 text-lg font-bold text-gray-700">Select Semester:</label>
                <select id="subject" name="subject" className="w-full p-3.5 border border-gray-400 rounded-md focus:border-[#f26d21] focus:ring-[#f26d21]">
                    <option value="">Select Semester</option>
                    <option value="b1">SEM 1</option>
                    <option value="b2">SEM 2</option>
                    <option value="b3">SEM 3</option>
                    <option value="b4">SEM 4</option>
                    <option value="b5">SEM 5</option>
                    <option value="b6">SEM 6</option>
                    <option value="b7">SEM 7</option>
                    <option value="b8">SEM 8</option>
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
                    <option value="c1">1st Year</option>
                    <option value="c2">2nd Year</option>
                    <option value="c3">3rd Year</option>
                    <option value="c4">4th Year</option>
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
                    </div>
                </div>
                <div className='mx-40 '>
                    <div className="relative group">
                        <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-500 shadow-xl rounded-xl">
                            <p className='text-white'>UPSE</p>
                            <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="h-0 mb-5 overflow-hidden duration-700 shadow-xl group-hover:h-28 rounded-xl">
                            <div className="flex-col content-center mx-10 my-3 text-xl transition-all duration-700 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                                <p className="py-2 text-lg">UPSC conducts the Civil Services Examination for recruitment to various Indian Administrative Service (IAS) and other top civil services.</p>
                                <p className="py-2 text-lg"><a href="https://upsc.gov.in/" target="_blank" rel="noopener noreferrer" className='text-[#f26d21] underline '> Click here for more information</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-500 shadow-xl rounded-xl">
                            <p className='text-white'>GRE</p>
                            <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="h-0 mb-5 overflow-hidden duration-700 shadow-xl group-hover:h-28 rounded-xl">
                            <div className="flex-col content-center mx-10 my-3 text-xl transition-all duration-700 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                                <p className="py-2 text-lg">The GRE assesses readiness for graduate programs through verbal, quantitative, and analytical writing tests.</p>
                                <p className="py-2 text-lg"><a href="https://www.ets.org/gre.html" target="_blank" rel="noopener noreferrer" className='underline text-[#f26d21]'> Click here for more information</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-500 shadow-xl rounded-xl">
                            <p className='text-white'>GATE</p>
                            <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="h-0 mb-5 overflow-hidden duration-700 shadow-xl group-hover:h-28 rounded-xl">
                            <div className="flex-col content-center mx-10 my-3 text-xl transition-all duration-700 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                                <p className="py-2 text-lg">GATE evaluates knowledge in engineering and science subjects for admissions to postgraduate programs and for various public sector job roles in India.</p>
                                <p className="py-2 text-lg"><a href="http://gate.iitd.ac.in/" target="_blank" rel="noopener noreferrer" className='underline text-[#f26d21]'> Click here for more information</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-500 shadow-xl rounded-xl">
                            <p className='text-white'>SAT</p>
                            <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="h-0 mb-5 overflow-hidden duration-700 shadow-xl group-hover:h-28 rounded-xl">
                            <div className="flex-col content-center mx-10 my-3 text-xl transition-all duration-700 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                                <p className="py-2 text-lg">The SAT is a college admission test that assesses a student's readiness for higher education through math, reading, and writing sections.</p>
                                <p className="py-2 text-lg"><a href="https://satsuite.collegeboard.org/sat" target="_blank" rel="noopener noreferrer" className='underline text-[#f26d21]'> Click here for more information</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-500 shadow-xl rounded-xl">
                            <p className='text-white'>TOFEL</p>
                            <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="h-0 mb-5 overflow-hidden duration-700 shadow-xl group-hover:h-28 rounded-xl">
                            <div className="flex-col content-center mx-10 my-3 text-xl transition-all duration-700 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                                <p className="py-2 text-lg">TOEFL measures English language proficiency for non-native speakers, assessing reading, writing, listening, and speaking skills for academic purposes.</p>
                                <p className="py-2 text-lg"><a href="https://www.ets.org/toefl.html" target="_blank" rel="noopener noreferrer" className='underline text-[#f26d21]'>Click here for more information</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      
    </div>
  )
}