// import React from 'react'
import { Link } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Journals() {
  return (
    <div className='font-serif mt-28'>
        <Link to='/others'></Link>
        <div className='w-full h-48 bg-[#efefef] flex items-center justify-center'>
            <div >
                <div className='flex justify-center text-6xl font-bold text-[#014da1]'>
                    <p>Others</p>
                </div>
                <div className=" border-b-4 mx-auto w-44 mt-2 border-red-600 mb-10"></div>
            </div>
        </div>

                                                    {/* FAQs */}

        <div>
            <div className='w-full h-20 mt-10  flex items-center justify-center'>
                <div >
                    <div className='flex justify-center text-4xl font-bold '>
                        <p>FAQs</p>
                    </div>
                    <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-2'>
            <div className='mx-40'>
                <div className="relative group">
                    <div className="bg-[#efefef] text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                        <p>Who can access the library?</p>
                        <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                    </div>
                    <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                        <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                            <p className="py-2">All SIES GST students, faculty, and staff can access the library with a valid ID.</p>
                        </div>
                    </div>
                </div>
            </div>















{/*             
            
            <div className='mx-40'>
                <div className="relative group">
                    <div className="bg-[#efefef] text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                        <p>What are the library timings?</p>
                        <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                    </div>
                    <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                        <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                            <p className="py-2">Monday to Friday: 9 AM to 5 PM, Saturday: 9 AM to 1 PM.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-40'>
                <div className="relative group">
                    <div className="bg-[#efefef] text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                        <p>How many books can I borrow?</p>
                        <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                    </div>
                    <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                        <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                            <p className="py-2">Students can borrow up to 3 books for 15 days. Faculty can borrow up to 5 books.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-40'>
                <div className="relative group">
                    <div className="bg-[#efefef] text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                        <p>How can I renew a book?</p>
                        <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                    </div>
                    <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                        <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                            <p className="py-2">Books can be renewed online or in-person before the due date, subject to availability.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-40'>
                <div className="relative group">
                    <div className="bg-[#efefef] text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                        <p>Who can access the library?</p>
                        <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                    </div>
                    <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                        <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                            <p className="py-2">All SIES GST students, faculty, and staff can access the library with a valid ID.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-40'>
                <div className="relative group">
                    <div className="bg-[#efefef] text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                        <p>Does the library offer digital resources?</p>
                        <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                    </div>
                    <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                        <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                            <p className="py-2">Yes, access to e-journals, databases (IEEE, DELNET), and e-books is available.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-40'>
                <div className="relative group">
                    <div className="bg-[#efefef] text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                        <p>What is the fine for late returns?</p>
                        <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                    </div>
                    <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                        <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                            <p className="py-2">A nominal fine is charged per day for overdue books.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-40'>
                <div className="relative group">
                    <div className="bg-[#efefef] text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                        <p>How can I suggest a book for the library?</p>
                        <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                    </div>
                    <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                        <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                            <p className="py-2">Use the "Suggest Books" form available on the website.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-40'>
                <div className="relative group">
                    <div className="bg-[#efefef] text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                        <p>Can I donate books?</p>
                        <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                    </div>
                    <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                        <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                            <p className="py-2">Yes, donations are accepted through the "Donate Books" section.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-40'>
                <div className="relative group">
                    <div className="bg-[#efefef] text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                        <p>Does the library provide internet access?</p>
                        <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                    </div>
                    <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                        <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                            <p className="py-2">Yes, free Wi-Fi is available within the library premises.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-40'>
                <div className="relative group">
                    <div className="bg-[#efefef] text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                        <p>How do I access the plagiarism detection tool?</p>
                        <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                    </div>
                    <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                        <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                            <p className="py-2">The tool can be accessed through the "Plagiarism Tool" section of the website.</p>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
                                        {/*More*/}
        <div>
            <div className='w-full h-60  flex items-center justify-center'>
                <div >
                    <div className='flex justify-center text-4xl font-bold '>
                        <p>Feedback</p>
                    </div>
                    <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                </div>
            </div>
        </div>

                                        {/* Contact Us
        <div>
            <div className='w-full h-60  flex items-center justify-center'>
                <div >
                    <div className='flex justify-center text-4xl font-bold '>
                        <p>Contact Us</p>
                    </div>
                    <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                </div>
            </div>
        </div>                           */}
            
</div>
)
}
