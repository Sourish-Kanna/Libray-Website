import React from 'react'
import principal_mam_photo from './assets/principal_mam.png'
import Library_office_photo from './assets/library_office_photo.png'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
library.add(fas);

export default function HomePage() {
  return (
    //image section
        <div className='mt-20 h-full w-full overflow-x-hidden  '>
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

                <div className='text-3xl mr-40 flex mt-20 w-3/6 bg-yellow-200 justify-around ml-96 pl-20 pr-32'>
                    <div className='bg-red-500 rounded-xl '>PYQs <FontAwesomeIcon className='text-3xl py-1' icon="fa-solid fa-arrow-up-right-from-square" /></div>
                    <div className='bg-red-500 rounded-xl'>Learn more <FontAwesomeIcon className='text-3xl py-1' icon="fa-solid fa-arrow-up-right-from-square" /></div>
                </div>
            </div>

        </div>
  )
}

