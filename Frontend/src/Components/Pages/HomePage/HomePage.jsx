import React from 'react'
import principal_mam_photo from './assets/principal_mam.png'
import Library_office_photo from './assets/library_office_photo.png'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import booksof_library from './assets/library-view.png'
import { Link } from 'react-router-dom';
import './HomePage.css'
library.add(fas);

export default function HomePage() {
  return (
    //image section
        <div className='w-full h-full mt-20 overflow-x-hidden font-serif '>
            <Link to='/'></Link>
            <div className='w-full h-screen bg-center bg-no-repeat bg-cover bg-homepage-bg'>

                {/* accouncement */}

                <div className='flex w-full mx-40 pt-9'>
                    <p className='w-20 h-10 pl-2 text-2xl font-bold text-red-600 bg-yellow-300 rounded-l-xl'>News</p>
                    <div className='flex justify-around w-9/12 text-xl bg-yellow-100 rounded-r-xl'>
                        <p>news 10</p>
                        <p>news 2</p>
                        <p>news 1</p>
                        <p>news 2</p>
                        <p>news 1</p>
                        <p>news 2</p>
                        <p>news 1</p>
                        <p>news 2</p>
                    </div>
                </div>

                    {/* college name */}
                  
                <div className='mx-40 mt-44'>
                     <p className='font-bold text-white typing-demo text-9xl'>
                            SIES GST LIBRARY
                    </p>
                </div>
                {/* Typing Animation Styles */}
                

                
                     {/*links */}

                <div className='flex justify-around w-3/6 pl-20 pr-32 mt-20 mr-40 text-3xl ml-96'>
                    <div className='bg-red-500 rounded-xl '>PYQs <FontAwesomeIcon className='py-1 text-3xl' icon="fa-solid fa-arrow-up-right-from-square" /></div>
                    <div className='bg-red-500 rounded-xl'>Learn more <FontAwesomeIcon className='py-1 text-3xl' icon="fa-solid fa-arrow-up-right-from-square" /></div>
                </div>
            </div>

                                            {/*Overview */}
            <div className='p-10 mx-40 mb-10'>
                <div >
                    <div className='flex justify-center text-4xl font-bold'>
                    <p>Overview</p>
                    </div>
                    <div class=" border-b-4 mx-auto w-36 mt-2 border-blue-700 mb-10"></div>
                </div>
                <div className='flex justify-between text-xl'>
                    <img className='h-64 mr-10' src={Library_office_photo} alt="" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem sint consequatur molestias, non omnis eaque. Tempora inventore, molestiae quae harum aperiam exercitationem veritatis illo, dignissimos molestias magnam, dolor quas libero dolores dicta vero veniam. Sed obcaecati commodi dolores odit vel accusantium delectus iusto officiis aut.</p>
                </div>
            </div>

                                        {/*Photos section */}

            <div className='mx-40 mb-10'>
                <div >
                    <div className='flex justify-center text-4xl font-bold'>
                    <p>Images</p>
                    </div>
                    <div class=" border-b-4 mx-auto w-28 mt-2 border-blue-700 mb-10"></div>
                </div>
                <div className='flex justify-between '>
                <img className="h-32 ml-4" src={booksof_library} alt="" />
                <img className="h-32 ml-4" src={booksof_library} alt="" />
                <img className="h-32 ml-4" src={booksof_library} alt="" />
                <img className="h-32 ml-4" src={booksof_library} alt="" />
                </div>
            </div>

                                                {/* Librarian */}

            <div className='mb-10 text-xl '>
                <div>
                    <div >
                        <div className='flex justify-center text-4xl font-bold'>
                        <p>Librarian</p>
                        </div>
                        <div class=" border-b-4 mx-auto w-36 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
                <div className='flex justify-between w-full bg-blue-500'>
                    <div className='flex-col ml-40'>
                        <img className='rounded-full h-44' src={Library_office_photo} alt="" />
                        <p>SIES GST Librarian</p>
                        <p>Phone no</p>
                        <p>email</p>
                    </div>
                    <div className='flex items-center w-6/12'>
                        <p className='text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, non? Similique, fuga? Asperiores provident voluptate minima assumenda et temporibus illo nam laudantium. Sequi eius modi asperiores ipsam consequatur autem excepturi laudantium incidunt magnam! Nostrum maxime ipsa ab necessitatibus, dolorum quod incidunt magnam harum qui provident?</p>
                    </div>
                    <div className='mt-20 mr-40 text-xl'>
                        <p>Staffs</p>
                        <p>Rules & Regulations</p>
                    </div>
                </div>
            </div>

                                {/* Explore Policies */}

            
            <div className='mx-40'>
                <div >
                    <div className='flex justify-center text-4xl font-bold'>
                    <p>Explore Policies</p>
                    </div>
                    <div class=" border-b-4 mx-auto w-28 mt-2 border-blue-700 mb-10"></div>
                </div>

                
            </div>
        </div>
  )
}

