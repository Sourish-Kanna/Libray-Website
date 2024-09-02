// import React from 'react'
// import Library_office_photo from './assets/library_office_photo.png'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import booksof_library from './assets/library-view.png'
import { Link } from 'react-router-dom';
import './HomePage.css'
import Overview from './assets/overview.webp'
import Librian from './assets/librian.webp'
library.add(fas);

const newsItems = [
    'news 1',
    'news 2',
    'news 3',
    'news 4',
    'news 5',
    'news 6',
    'news 7',
    'news 8',
  ];

export default function HomePage() {
  return (
        <div className='w-full h-full mt-20 overflow-x-hidden font-serif '>
            <Link to='/'></Link>

            {/* Inital View */}
            <div className='w-full h-screen bg-center bg-no-repeat bg-cover bg-homepage-bg'>

                {/* News Row */}
                <div className='flex pt-9 bg-yellow-100 text-xl'>
                    <p className="w-fit pl-2 text-2xl font-bold text-red-600 bg-yellow-100 p-2">News</p>
                    <div className="flex justify-around w-11/12 p-2 bg-news-back">
                        {newsItems.map((newsItem, index) => (
                        <p key={index} className="bg-news">
                            {newsItem}</p>
                        ))}
                    </div>
                </div>
                
                {/* Typing Logo */}
                <div className='mx-40 mt-44 bg-typing font-bold text-white typing-demo text-9xl'>
                     SIES GST LIBRARY
                </div>
                
                {/*Quick Links */}
                <div className='flex justify-around w-3/6 pl-20 pr-32 mt-20 mr-40 text-3xl ml-96'>
                    <div className='bg-red-500 rounded-xl '>PYQs <FontAwesomeIcon className='py-1 text-3xl' icon="fa-solid fa-arrow-up-right-from-square" /></div>
                    <div className='bg-red-500 rounded-xl'>Learn more <FontAwesomeIcon className='py-1 text-3xl' icon="fa-solid fa-arrow-up-right-from-square" /></div>
                </div>
            </div>

            {/* Overview */}
            <div className='p-10 mx-40 mb-10 flex-col content-center'>
                <div > 
                    <div className='flex justify-center text-4xl font-bold'>
                    <p>Overview</p>
                    </div>
                    <div className=" border-b-4 mx-auto w-36 mt-2 border-blue-700 mb-10"></div>
                </div>
                <div className='flex justify-between items-center text-xl bg-[#f3f2ed] w-full rounded-xl my-10 hover:scale-105 duration-700 h-5/6'>
                    <div className='m-20 w-5/12'>
                        <img className='h-60 rounded-xl' src={Overview} alt="" />
                    </div>
                    <div className='w-7/12 mr-10'>
                        <p>SIES Graduate School of Technology (GST) is a premier engineering institution located in Navi Mumbai. Established with a vision to impart quality education, SIES GST offers undergraduate and postgraduate programs in various engineering disciplines. The college is known for its strong academic curriculum, experienced faculty, and state-of-the-art facilities. With a focus on innovation, research, and holistic development, SIES GST prepares students to excel in their careers and contribute to the industry and society. The college emphasizes ethical values and community service, aligning with the SIES tradition of education for life.</p>
                    </div>
                </div>
            </div>

            {/*Photos section */}
            <div className='mx-40 mb-10'>
                <div >
                    <div className='flex justify-center text-4xl font-bold'>
                    <p>Images</p>
                    </div>
                    <div className=" border-b-4 mx-auto w-28 mt-2 border-blue-700 mb-10"></div>
                </div>
                <div className='flex justify-between '>
                <img className="h-32 ml-4" src={booksof_library} alt="" />
                <img className="h-32 ml-4" src={booksof_library} alt="" />
                <img className="h-32 ml-4" src={booksof_library} alt="" />
                <img className="h-32 ml-4" src={booksof_library} alt="" />
                </div>
            </div>

            {/* Librarian */}
            <div className='text-xl'>
                <div>
                    <div >
                        <div className='flex justify-center text-4xl font-bold'>
                        <p>Librarian</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-36 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
                <div className='flex justify-between bg-blue-500 mx-40 rounded-xl'>
                    <div className='flex-col '>
                        <img className='rounded-full h-44' src={Librian} alt="" />
                        <p>Librarian-Mrs.Arunadevi Lingam</p>
                        <p>B.Sc(Phy),MLISc,NET</p>
                        <p>email</p>
                    </div>
                    <div className='flex items-center w-6/12 '>
                        <p className='text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, non? Similique, fuga? Asperiores provident voluptate minima assumenda et temporibus illo nam laudantium. Sequi eius modi asperiores ipsam consequatur autem excepturi laudantium incidunt magnam! Nostrum maxime ipsa ab necessitatibus, dolorum quod incidunt magnam harum qui provident?</p>
                    </div>
                    <div className=' text-xl'>
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
                    <div className=" border-b-4 mx-auto w-28 mt-2 border-blue-700 mb-10"></div>
                </div>

                
            </div>

        </div>
  )
}

