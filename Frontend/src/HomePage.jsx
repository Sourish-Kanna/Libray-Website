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


function generateSlides(images) {
    return images.map((image, index) => (
        <div key={index} className="slide">
            <img 
                className="hover:scale-110 duration-700 h-96 w-auto" 
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
        <div className="bg-header-color text-xl sm:text-2xl py-5 px-6 sm:px-10 flex justify-between my-5 shadow-xl rounded-xl duration-700">
            <p>{title}</p>
            <FontAwesomeIcon className="text-2xl text-s_orange" icon="fa-solid fa-chevron-down" />
        </div>
        <div className="h-0 group-hover:h-28 shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
            <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-sm sm:text-xl flex-col content-center mx-10 my-3">
                {details.map((detail, index) => (
                    <p key={index} className="py-2">{detail}</p>
                ))}
            </div>
        </div>
    </div>
);

const images = [image1, image2, image4, image5, image6, image7, image8, image9, image10, image11];
const newsItems = ['news 1', 'news 2', 'news 3', 'news 4', 'news 5', 'news 6', 'news 7', 'news 8'];


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
                    <div className="flex flex-nowrap overflow-hidden justify-center sm:justify-around w-full sm:w-11/12 p-2 bg-news-back">
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
            <div className="p-5 sm:p-10 mx-4 sm:mx-10 md:mx-20 lg:mx-40 flex flex-col items-center">
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
            <div className='mb-10 image-animation'>
                <div>
                    {/* Heading */}
                    <div className="flex justify-center text-2xl sm:text-3xl md:text-4xl font-bold">
                        <p>Images</p>
                    </div>
                    <div className="border-b-4 mx-auto w-24 sm:w-28 md:w-36 mt-2 border-blue-700 mb-5 sm:mb-10"/>
                </div>
                <div className='slider h-[200px] py-4'>
                    <div className="slide-track mb-0">
                        {/* Render the slides twice */}
                        {generateSlides(images)}
                        {/* {generateSlides(images)} */}
                    </div>
                </div>
            </div>

            {/* Librarian */}
            <div className="text-xl h-auto sm:h-screen bg-gray-100 py-10">
                {/* Section Header */}
                <div>
                    <div className="flex justify-center text-3xl sm:text-4xl font-bold">
                    <p>Librarian</p>
                    </div>
                    <div className="border-b-4 mx-auto w-24 sm:w-36 mt-2 border-blue-700 mb-10"></div>
                </div>

                {/* Content Container */}
                <div className="flex flex-col lg:flex-row justify-between bg-blue-500 bg-opacity-10 mx-5 lg:mx-40 rounded-xl p-10 sm:p-16 hover:scale-105 duration-700">
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
                    <p className="p-3 bg-yellow-400 h-10 flex items-center justify-center rounded-xl hover:bg-yellow-300 active:text-red-500 cursor-pointer text-sm sm:text-base">
                        Rules & Regulations
                    </p>
                    </div>
                </div>
            </div>

            {/* Explore Policies */}
            <div className='mx-5 sm:mx-10 md:mx-40'>
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

