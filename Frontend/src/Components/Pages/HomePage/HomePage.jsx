import React from 'react'
import principal_mam_photo from './assets/principal_mam.png'
import Library_office_photo from './assets/library_office_photo.png'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import booksof_library from './assets/library-view.png'
import { Link } from 'react-router-dom';
library.add(fas);

export default function HomePage() {
  return (
    //image section
        <div className='mt-20 h-full w-full overflow-x-hidden font-serif '>
            <Link to='/'></Link>
            <div className='bg-homepage-bg h-screen bg-no-repeat w-full bg-center bg-cover'>

                {/* accouncement */}

                <div className='mx-40 pt-9 flex w-full'>
                    <p className='bg-yellow-300 h-10 rounded-l-xl w-20 pl-2 font-bold text-red-600 text-2xl'>News</p>
                    <div className='flex text-xl w-9/12  bg-yellow-100 rounded-r-xl justify-around'>
                        <p>news 1</p>
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

                <div className='text-9xl flex align-center h-8/12 justify-center mt-44 font-bold mx-40'>
                        <p>SIES GST LIBRARY</p>
                </div>

                     {/*links */}

                <div className='text-3xl mr-40 flex mt-20 w-3/6  justify-around ml-96 pl-20 pr-32'>
                    <div className='bg-red-500 rounded-xl '>PYQs <FontAwesomeIcon className='text-3xl py-1' icon="fa-solid fa-arrow-up-right-from-square" /></div>
                    <div className='bg-red-500 rounded-xl'>Learn more <FontAwesomeIcon className='text-3xl py-1' icon="fa-solid fa-arrow-up-right-from-square" /></div>
                </div>
            </div>

                                            {/*Overview */}
            <div className='mx-40 p-10 mb-10'>
                <div >
                    <div className='flex justify-center font-bold text-4xl'>
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
                    <div className='flex justify-center font-bold text-4xl'>
                    <p>Images</p>
                    </div>
                    <div class=" border-b-4 mx-auto w-28 mt-2 border-blue-700 mb-10"></div>
                </div>
                <div className=' flex justify-between '>
                <img className="h-32 ml-4" src={booksof_library} alt="" />
                <img className="h-32 ml-4" src={booksof_library} alt="" />
                <img className="h-32 ml-4" src={booksof_library} alt="" />
                <img className="h-32 ml-4" src={booksof_library} alt="" />
                </div>
            </div>

                                                {/* Librarian */}

            <div className=' mb-10 text-xl'>
                <div>
                    <div >
                        <div className='flex justify-center font-bold text-4xl'>
                        <p>Librarian</p>
                        </div>
                        <div class=" border-b-4 mx-auto w-36 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
                <div className='flex justify-between bg-blue-500 w-full'>
                    <div className='flex-col  ml-40'>
                        <img className='rounded-full h-44' src={Library_office_photo} alt="" />
                        <p>SIES GST Librarian</p>
                        <p>Phone no</p>
                        <p>email</p>
                    </div>
                    <div className='w-6/12 flex items-center'>
                        <p className='text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, non? Similique, fuga? Asperiores provident voluptate minima assumenda et temporibus illo nam laudantium. Sequi eius modi asperiores ipsam consequatur autem excepturi laudantium incidunt magnam! Nostrum maxime ipsa ab necessitatibus, dolorum quod incidunt magnam harum qui provident?</p>
                    </div>
                    <div className='mr-40 mt-20 text-xl'>
                        <p>Staffs</p>
                        <p>Rules & Regulations</p>
                    </div>
                </div>
            </div>

                                {/* Explore Policies */}

            
            <div className='mx-40'>
                <div >
                    <div className='flex justify-center font-bold text-4xl'>
                    <p>Explore Policies</p>
                    </div>
                    <div class=" border-b-4 mx-auto w-28 mt-2 border-blue-700 mb-10"></div>
                </div>

                
            </div>
        </div>
  )
}

