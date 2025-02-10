import { faChevronDown, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useScrollToHash, useSmoothScroll} from './Navigation'
import Overview from './assets/HomePage/overview.webp'
import Librian from './assets/HomePage/librian.webp'
import React, { useState, useEffect } from "react";
import image1 from './assets/HomePage/image1.webp'
import image11 from './assets/HomePage/img11.webp'
import image10 from './assets/HomePage/img10.webp'
import useAuthStore from './Store/userAuth.store'
import image2 from './assets/HomePage/img2.webp'
import image4 from './assets/HomePage/img4.webp'
import image5 from './assets/HomePage/img5.webp'
import image6 from './assets/HomePage/img6.webp'
import image7 from './assets/HomePage/img7.webp'
import image8 from './assets/HomePage/img8.webp'
import image9 from './assets/HomePage/img9.webp'
import { Link,NavLink } from 'react-router-dom';
import NewsComponent from './NewsComponent';
import { Helmet } from 'react-helmet';
import './css/HomePage.css'
import './css/admin.css'


function generateSlides(images) {
    return images.map((image, index) => (
        <div key={index} className="slide">
            <img 
                className="hover:scale-110 duration-700 h-auto w-auto" 
                src={image} 
                alt={`Slide ${index + 1}`} 
            />
        </div>
    ));
}

const policies = [
    {
        title: "Borrowing Privileges",
        details: [
            "Members can borrow a specified number of books for a predetermined duration.",
            "Renewals and reservations can be made online, subject to availability."
        ]
    },
    {
        title: "Reference Services",
        details: [
            "Personalized assistance in locating information and resources.",
            "Guidance on research methodologies and using library tools."
        ]
    },
    {
        title: "E-Resources Access",
        details: [
            "Remote access to e-journals, databases, and plagiarism detection tools.",
            "Resources include IEEE, DELNET, and various e-books."
        ]
    },
    {
        title: "Code of Conduct",
        details: [
            "Users are expected to maintain a quiet environment conducive to study.",
            "Misuse of library resources or breach of rules may result in suspension of privileges."
        ]
    },
    {
        title: "Reprography Services",
        details: [
            "Available for photocopying and printing documents.",
            "Charges apply per page as per the library's pricing policy."
        ]
    },
    {
        title: "Book Bank Facility",
        details: [
            "Provides textbooks on loan to economically disadvantaged students.",
            "Books must be returned at the end of the semester or academic year."
        ]
    },
    {
        title: "Interlibrary Loan (ILL)",
        details: [
            "Borrowing books and journals from other libraries through DELNET.",
            "ILL requests can be made online, with delivery times varying based on availability."
        ]
    }
];

const PolicyItem = ({ title, details }) => (
    <div className="relative group">
        <div className="bg-header-color text-xl sm:text-2xl py-5 px-6 sm:px-10 flex justify-between my-5 shadow-xl rounded-xl duration-1000">
            <p>{title}</p>
            <FontAwesomeIcon
                className="text-2xl text-s_orange transition-transform group-hover:rotate-180 duration-700"
                icon={faChevronDown}
            />
        </div>
        <div className="max-h-0 group-hover:max-h-[500px] shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
            <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-sm sm:text-xl flex-col content-center mx-10 my-3">
                {details.map((detail, index) => (
                    <p key={index} className="py-2">{detail}</p>
                ))}
            </div>
        </div>
    </div>
);

const images = [image1, image2, image4, image5, image6, image7, image8, image9, image10, image11];

export default function HomePage() {
    const{user,isAuthenticated} = useAuthStore();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
  
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useSmoothScroll();
    const refs = useScrollToHash(['Initial','overview','photos','librarian','policies']);

  return (
        <div className='w-full h-full overflow-x-hidden'>
            <Helmet>
                <title>Home | Library | SIESGST</title>
            </Helmet>

            {/* Initial View */}
            <div  ref={refs['Initial']} className='w-full h-screen bg-center bg-no-repeat bg-cover homepage-bg'>

                {/* News Row */}
                <NewsComponent/>
                {/* <div className='flex mt-5 bg-yellow-100 text-xl '>
                    <p className="w-fit pl-2 text-2xl font-bold text-red-600 bg-yellow-100 p-2 z-10">News</p>
                    <div className="flex justify-around w-11/12 p-2 bg-news-back">
                        {newsItems.map((newsItem, index) => (
                        <p key={index} className="bg-news">
                            {newsItem}</p>
                        ))}
                    </div>
                </div>
                {isAuthenticated && (
                    <div className="mt-2 relative">
                        <button className="absolute right-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Edit News
                        </button>
                    </div>
                )} */}
                
                {/* Typing Logo */}
                {/* <div className='mx-40 mt-44 bg-typing font-bold text-white typing-demo text-9xl'>
                    SIES GST LIBRARY
                </div> */}
                
                {/*Quick Links */}
            {/* <div className="flex justify-around w-3/6 px-16 mt-20 mx-auto text-3xl">
                <div className="bg-[#f26d21] flex items-center px-6 py-2 cursor-pointer rounded-xl active:scale-95 active:text-white">
                    <NavLink to="quicklinks#pyq" className="flex items-center space-x-3">
                    <span>Question Papers</span>
                    <FontAwesomeIcon className="text-xl" icon="fa-solid fa-arrow-up-right-from-square" />
                    </NavLink>
                </div>
                <div className="bg-[#f26d21] flex items-center px-6 py-2 cursor-pointer rounded-xl active:scale-95 active:text-white">
                    <NavLink to="about" className="flex items-center space-x-3">
                    <span>FAQs</span>
                    <FontAwesomeIcon className="text-xl" icon="fa-solid fa-arrow-up-right-from-square" />
                    </NavLink>
                </div>
            </div> */}

            {/* Center Section */}
            <div className="flex flex-col items-center justify-center  h-dvh text-center">
                    
                {/* Typing Logo */}
                <div className={`${isMobile ? "typing-demo-mobile" : "typing-demo"} 
                mx-4 sm:mx-20 lg:mx-40 bg-typing font-serif font-bold text-white text-6xl sm:text-7xl lg:text-9xl `}>
                    SIES GST LIBRARY
                </div>

                {/* Quick Links */}
                <div className="flex flex-wrap justify-center w-full md:w-3/4 lg:w-1/2 mt-10 sm:mt-20 gap-5">
                    <div className="bg-s_orange px-4 sm:px-5 py-2 text-2xl sm:text-3xl md:text-4xl cursor-pointer rounded-xl active:scale-95 hover:text-white">
                        <NavLink to="quicklinks#pyq" className="flex items-center justify-center">
                            Question Papers
                            <FontAwesomeIcon className="ml-2" icon={faArrowUpRightFromSquare} />
                        </NavLink>
                    </div>
                    <div className="bg-s_orange px-4 sm:px-5 py-2 text-2xl sm:text-3xl md:text-4xl cursor-pointer rounded-xl active:scale-95 hover:text-white">
                        <NavLink to="others#FAQs" className="flex items-center justify-center">
                            FAQs
                            <FontAwesomeIcon className="ml-2" icon={faArrowUpRightFromSquare} />
                        </NavLink>
                    </div>
                </div>
            </div>

            </div>

            {/* Overview */}
            <div  ref={refs['overview']} className="p-5 sm:p-10 mx-4 sm:mx-10 md:mx-20 lg:mx-40 flex flex-col items-center">
            <div>
                {/* Heading */}
                <div className="flex justify-center text-2xl sm:text-3xl md:text-4xl font-bold">
                <p>Overview</p>
                </div>
                <div className="border-b-4 mx-auto w-24 sm:w-28 md:w-36 mt-2 border-blue-700 mb-5 sm:mb-10"></div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col md:flex-row justify-between items-center text-base sm:text-lg md:text-xl bg-header-color w-full rounded-xl my-5 sm:my-10 hover:scale-105 duration-700">
                {/* Image Section */}
                <div className="m-5 md:m-10 px-5 w-full md:w-5/12 flex justify-center">
                <img className="w-full sm:w-auto h-40 sm:h-60 md:h-72 rounded-xl" src={Overview} alt="Overview" />
                </div>

                {/* Text Section */}
                <div className="w-full md:w-7/12 p-5 md:mr-10 text-justify">
                <p>
                    SIES Graduate School of Technology (GST) is a premier engineering institution located in Navi Mumbai. Established with a vision to impart quality education, SIES GST offers undergraduate and postgraduate programs in various engineering disciplines. The college is known for its strong academic curriculum, experienced faculty, and state-of-the-art facilities. With a focus on innovation, research, and holistic development, SIES GST prepares students to excel in their careers and contribute to the industry and society. The college emphasizes ethical values and community service, aligning with the SIES tradition of education for life.
                </p>
                </div>
            </div>
            </div>

            {/*Photos section */}            
            <div  ref={refs['photos']} className='mb-5 sm:mb-10 md:mb-40 image-animation'>
                <div>
                    <div className="flex justify-center text-2xl sm:text-3xl md:text-4xl font-bold">
                        <p>Images</p>
                    </div>
                    <div className="border-b-4 mx-auto w-24 sm:w-28 md:w-36 mt-2 border-blue-700 mb-5 sm:mb-10"/>
                </div>
                <div className='slider h-fit w-full'>
                    <div className="slide-track">
                        {generateSlides(images)}
                    </div>
                </div>
            </div>

            {/* Librarian */}
            <div  ref={refs['librarian']} className="text-xl py-10">
                {/* Section Header */}
                <div>
                    <div className="flex justify-center text-3xl sm:text-4xl font-bold">
                    <p>Librarian</p>
                    </div>
                    <div className="border-b-4 mx-auto w-24 sm:w-36 mt-2 border-blue-700 mb-10"></div>
                </div>

                {/* Content Container */}
                <div className="flex flex-col lg:flex-row justify-between bg-blue-500 bg-opacity-10 mx-5 lg:mx-40 rounded-xl 
                p-10 sm:p-16 hover:scale-105 duration-700">
                    {/* Librarian Image and Details */}
                    <div className="flex flex-col items-center text-center mb-8 lg:mb-0">
                    <img className="rounded-full h-48 sm:h-72 mb-5 object-cover" src={Librian} alt="Librarian" />
                    <p className="text-lg sm:text-xl text-blue-900 font-semibold">Librarian - Mrs. Arunadevi Lingam</p>
                    <p className="text-sm sm:text-base text-gray-700">B.Sc(Phy), MLISc, NET</p>
                    </div>

                    {/* Librarian Message */}
                    <div className="lg:w-6/12 text-blue-900 mb-8 lg:mb-0">
                    <p>
                        Welcome to the SIES GST Library, your gateway to knowledge and learning. Our library is more than just a collection of books; it’s a vibrant space where ideas come to life and innovation begins. We are here to support your academic journey with a vast array of resources, from physical books to digital content. Make the most of this treasure trove of information, and remember, the library is a place where your curiosity is encouraged and your questions are valued.
                    </p>
                    <p className="mt-5">Best wishes for your academic success!</p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col justify-center space-y-5">
                    <Link to="/about#library-staffs">
                        <p className="bg-yellow-400 h-10 flex items-center justify-center rounded-xl hover:bg-yellow-300 active:text-red-500 cursor-pointer text-sm sm:text-base">
                        Staffs
                        </p>
                    </Link>
                    <Link to="/#policies">
                        <p className="p-3 bg-yellow-400 h-10 flex items-center justify-center rounded-xl hover:bg-yellow-300 active:text-red-500 cursor-pointer text-sm sm:text-base">
                            Rules & Regulations
                        </p>
                    </Link>
                    </div>
                </div>
            </div>

            {/* Explore Policies */}
            <div  ref={refs['policies']} className='mx-5 sm:mx-10 md:mx-40'>
                <div className='pt-8'>
                    {/* Heading */}
                    <div className='flex justify-center text-2xl sm:text-3xl md:text-4xl font-bold'>
                        <p>Explore Policies</p>
                    </div>
                    <div className="border-b-4 mx-auto w-24 sm:w-28 md:w-36 mt-2 border-blue-700 mb-10"></div>
                </div>
                <div className='w-full'>
                    {/* Loop through policies */}
                    {policies.map((policy, index) => (
                        <PolicyItem key={index} title={policy.title} details={policy.details} />
                    ))}
                </div>
            </div>

        </div>
  )
}
