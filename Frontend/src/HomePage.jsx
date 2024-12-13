import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link,NavLink } from 'react-router-dom';
import './css/HomePage.css'
import Overview from './assets/overview.webp'
import Librian from './assets/librian.webp'
import image1 from './assets/image1.webp'
import image2 from './assets/img2.webp'
import image4 from './assets/img4.webp'
import image5 from './assets/img5.webp'
import image6 from './assets/img6.webp'
import image7 from './assets/img7.webp'
import image8 from './assets/img8.webp'
import image9 from './assets/img9.webp'
import image10 from './assets/img10.webp'
import image11 from './assets/img11.webp'



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
        <div className='w-full h-full overflow-x-hidden  '>
            <Link to='/'></Link>

            {/* Inital View */}
            <div className="w-full h-fit bg-center bg-no-repeat bg-cover homepage-bg">

                {/* News Row */}
                <div className="flex flex-nowrap items-center bg-yellow-100 text-base sm:text-lg md:text-xl">
                    <p className="w-fit pl-2 text-lg sm:text-xl md:text-2xl font-bold text-red-600 bg-yellow-100 p-2 z-10">
                    News </p>
                    <div className="flex flex-nowrap justify-center sm:justify-around w-full sm:w-11/12 p-2 bg-news-back">
                    {newsItems.map((newsItem, index) => (
                        <p key={index} className="bg-news text-sm sm:text-base p-2">
                        {newsItem}
                        </p>
                    ))}
                    </div>
                </div>

                {/* Center Section */}
                <div className="flex flex-col items-center py-10 sm:py-20 md:py-44">
                    
                    {/* Typing Logo */}
                    <div className="mx-4 sm:mx-20 lg:mx-40 bg-typing font-serif font-bold text-white text-center typing-demo text-4xl sm:text-6xl lg:text-9xl">
                    SIES GST LIBRARY
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-wrap justify-center md:justify-around w-full md:w-3/4 lg:w-1/2 mt-10 sm:mt-20 gap-5">
                    <div className="bg-s_orange px-4 sm:px-5 py-2 text-lg sm:text-2xl md:text-3xl cursor-pointer rounded-xl active:scale-95 active:text-white text-center">
                        <NavLink to="quicklinks#pyq">Question Papers</NavLink>
                        <FontAwesomeIcon className="py-1 px-3" icon="fa-solid fa-arrow-up-right-from-square" />
                    </div>
                    <div className="bg-s_orange px-4 sm:px-5 text-lg sm:text-2xl md:text-3xl py-2 cursor-pointer rounded-xl active:scale-95 active:text-white text-center">
                        <NavLink to="about">FAQs</NavLink>
                        <FontAwesomeIcon className="py-1 px-3" icon="fa-solid fa-arrow-up-right-from-square" />
                    </div>
                    </div>
                </div>
            </div>


            {/* Overview */}
            <div className='p-10 mx-40 flex-col content-center'>
                <div > 
                    <div className='flex justify-center text-4xl font-bold'>
                    <p>Overview</p>
                    </div>
                    <div className=" border-b-4 mx-auto w-36 mt-2 border-blue-700 mb-10"></div>
                </div>
                <div className='flex justify-between items-center text-xl bg-header-color w-full rounded-xl my-10 hover:scale-105 duration-700 h-5/6'>
                    <div className='m-20 w-5/12'>
                        <img className='h-60 rounded-xl' src={Overview} alt="" />
                    </div>
                    <div className='w-7/12 mr-10'>
                        <p>SIES Graduate School of Technology (GST) is a premier engineering institution located in Navi Mumbai. 
                            Established with a vision to impart quality education, SIES GST offers undergraduate and postgraduate 
                            programs in various engineering disciplines. The college is known for its strong academic curriculum, 
                            experienced faculty, and state-of-the-art facilities. With a focus on innovation, research, and holistic 
                            development, SIES GST prepares students to excel in their careers and contribute to the industry and society. 
                            The college emphasizes ethical values and community service, aligning with the SIES tradition of education for life.</p>
                    </div>
                </div>
            </div>

            {/*Photos section */}
            <div className=' mb-10 image-animation'>
                <div>
                    <div className='flex justify-center text-4xl font-bold'>
                        <p>Images</p>
                    </div>
                    <div className="border-b-4 mx-auto w-28 mt-2 border-blue-700 "></div>
                </div>
                <div className='slider h-[200px] overflow-visible'>
                    <div className="slide-track mb-0">
                        <div className="slide hover:scale-110 duration-700">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image1} alt="" />
                        </div>
                        <div className="slide">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image2} alt="" />
                        </div>
                        {/* <div className="slide">
                            <img src={image3} alt="" />
                        </div> */}
                        <div className="slide">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image4} alt="" />
                        </div>
                        <div className="slide">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image5} alt="" />
                        </div>
                        <div className="slide">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image6} alt="" />
                        </div>
                        <div className="slide">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image7} alt="" />
                        </div>
                        <div className="slide">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image8} alt="" />
                        </div>
                        <div className="slide">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image9} alt="" />
                        </div>
                        <div className="slide">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image10} alt="" />
                        </div>
                        <div className="slide">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image11} alt="" />
                        </div>
                        
                        {/* same 11 slides doubled */}

                        <div className="slide">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image1} alt="" />
                        </div>
                        <div className="slide">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image2} alt="" />
                        </div>
                        {/* <div className="slide">
                            <img src={image3} alt="" />
                        </div> */}
                        <div className="slide ">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image4} alt="" />
                        </div>
                        <div className="slide ">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image5} alt="" />
                        </div>
                        <div className="slide">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image6} alt="" />
                        </div>
                        <div className="slide">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image7} alt="" />
                        </div>
                        <div className="slide">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image8} alt="" />
                        </div>
                        <div className="slide">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image9} alt="" />
                        </div>
                        <div className="slide">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image10} alt="" />
                        </div>
                        <div className="slide">
                            <img className="hover:scale-110 duration-700 h-96 w-auto" src={image11} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Librarian */}
            <div className='text-xl  h-screen'>
                <div className='z-0'>
                    <div >
                        <div className='flex justify-center text-4xl font-bold'>
                        <p>Librarian</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-36 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
                <div className='flex justify-between bg-blue-500 opacity-0.1 mx-40 rounded-xl p-16 hover:scale-105 duration-700'>
                    <div className='flex-col '>
                        <img className='rounded-full h-72 mb-5' src={Librian} alt="" />
                        <p className="text-center text-white">Librarian - Mrs.Arunadevi Lingam</p>
                        <p className="text-center text-white">B.Sc(Phy), MLISc, NET</p>
                        {/* <p>email</p> */}
                    </div>
                    <div className='flex items-center w-6/12 text-white'>
                        <p className='text-xl'>Welcome to the SIES GST Library, your gateway to knowledge and learning. Our library is more than just a collection of books; it’s a vibrant space where ideas come to life and innovation begins. We are here to support your academic journey with a vast array of resources, from physical books to digital content. Make the most of this treasure trove of information, and remember, the library is a place where your curiosity is encouraged and your questions are valued.

                            <p className='mt-5'>Best wishes for your academic success!</p>
                        </p>
                    </div>
                    <div className=' text-xl flex-col content-center'>
                        <Link to='/about#library-staffs'><p className='bg-yellow-400 my-10  h-10 flex items-center justify-center rounded-xl hover:bg-yellow-300 active:text-red-500 cursor-pointer'>Staffs</p></Link>
                        <p className='bg-yellow-400 my-10  h-10 flex items-center justify-center rounded-xl hover:bg-yellow-300 active:text-red-500 cursor-pointer '>Rules & Regulations</p>
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
                <div className='w-full '>
                    <div className="relative group">
                        <div className="bg-header-color text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                            <p>Borrowing Privileges</p>
                            <FontAwesomeIcon className="text-2xl text-s_orange"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                            <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                                <p className="py-2">1) Members can borrow a specified number of books for a predetermined duration.</p>
                                <p className="py-2">2) Renewals and reservations can be made online, subject to availability.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="bg-header-color text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                            <p>Reference Services</p>
                            <FontAwesomeIcon className="text-2xl text-s_orange"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                            <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                                <p className="py-2">1) Personalized assistance in locating information and resources.</p>
                                <p className="py-2">2) Guidance on research methodologies and using library tools.</p>
                            </div>
                        </div>
                        
                    </div>
                    <div className="relative group">
                        <div className="bg-header-color text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                            <p>E-Resources Access</p>
                            <FontAwesomeIcon className="text-2xl text-s_orange"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                            <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                                <p className="py-2">1) Remote access to e-journals, databases, and plagiarism detection tools.</p>
                                <p className="py-2">2) Resources include IEEE, DELNET, and various e-books.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="bg-header-color text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                            <p>Code of Conduct</p>
                            <FontAwesomeIcon className="text-2xl text-s_orange"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                            <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                                <p className="py-2">1)Users are expected to maintain a quiet environment conducive to study.</p>
                                <p className="py-2">2) Misuse of library resources or breach of rules may result in suspension of privileges.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="bg-header-color text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                            <p>Reprography Services</p>
                            <FontAwesomeIcon className="text-2xl text-s_orange"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                            <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                                <p className="py-2">1) Available for photocopying and printing documents.</p>
                                <p className="py-2">2) Charges apply per page as per the library's pricing policy.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="bg-header-color text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                            <p>Book Bank Facility</p>
                            <FontAwesomeIcon className="text-2xl text-s_orange"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                            <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                                <p className="py-2">1) Provides textbooks on loan to economically disadvantaged students.</p>
                                <p className="py-2">2) Books must be returned at the end of the semester or academic year.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="bg-header-color text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700">
                            <p> Interlibrary Loan (ILL)</p>
                            <FontAwesomeIcon className="text-2xl text-s_orange"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="h-0 group-hover:h-28  shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                            <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                                <p className="py-2">1) Borrowing books and journals from other libraries through DELNET.</p>
                                <p className="py-2">2) ILL requests can be made online, with delivery times varying based on availability.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
  )
}

