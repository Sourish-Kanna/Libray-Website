import Images from '../assets/HomePage/img5.webp'
import sand from '../assets/AboutUs/sandip.webp'
import indra from '../assets/AboutUs/indrabahadur.webp'
import sac from '../assets/AboutUs/sachin.webp'
import ref from '../assets/HomePage/img4.webp'
import ret from '../assets/AboutUs/bookret.webp'
import fac from '../assets/HomePage/img9.webp'
import repo from '../assets/HomePage/img3.webp'
import opa from '../assets/HomePage/img11.webp'
import idi from '../assets/HomePage/img6.webp'
import comp from '../assets/HomePage/img12.webp'
import dig from '../assets/HomePage/image1.webp'
import opac from '../assets/HomePage/OPAC.jpg'
import news from '../assets/HomePage/News.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useScrollToHash, useSmoothScroll} from '../Navigation'
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Helmet } from 'react-helmet';

const facilities = [
  { image: ref, title: "Circulation Counter" },
  { image: ret, title: "Home Issue/Book Return" },
  { image: fac, title: "Book Bank Facility" },
  { image: repo, title: "Reprography Service" },
  { image: opa, title: "Reference Service" },
  { image: news, title: "Newspaper Clipping" },
  { image: opac, title: "Library OPAC" },
];

const FacilityCard = ({ image, title }) => (
    <div className="overflow-hidden duration-700 bg-white rounded-xl hover:scale-105">
        <img src={image} className="object-cover w-full h-60" alt={title} />
        <div className="p-6">
            <h3 className="text-xl font-extrabold text-s_orange">{title}</h3>
        </div>
    </div>
);

const staffMembers = [
    {
        name: "Mr. Sandip Patil",
        position: "Library Clerk",
        qualifications: "M.A, B.Ed., M.L.I.Sc",
        image: sand,
        alt: "Library Clerk"
    },
    {
        name: "Mr. Sachin Gurav",
        position: "Library Attendant",
        qualifications: "M.L.I.c",
        image: sac,
        alt: "Library Attendant"
    },
    {
        name: "Mr. Indrabahadur Singh",
        position: "Library Attendant",
        qualifications: "10TH",
        image: indra,
        alt: "Library Attendant"
    }
];

const StaffCard = ({ name, position, qualifications, image, alt }) => (
    <div className="bg-white rounded-xl overflow-hidden hover:scale-105 duration-700 w-full sm:w-[300px] lg:w-[320px]">
        <img src={image} className="w-full h-[340px] object-cover" alt={alt} />
        <div className="p-6">
            <h3 className="text-2xl font-extrabold text-s_orange">{position}</h3>
            <p className="mt-2 font-bold text-s_orange">{name}</p>
            <p className="font-semibold text-s_orange">{qualifications}</p>
        </div>
    </div>
);

const infrastructureData = [
    {
        image: idi,
        title: "Network Infrastructure",
        points: [
            "High-Speed Internet", 
            "Secure Wi-Fi for students and staff"
        ],
    },
    {
        image: comp,
        title: "Hardware Infrastructure",
        points: [
            "Computing devices for catalog browsing",
            "ID card scanning attendance system",
        ],
    },
    {
        image: dig,
        title: "Digital Library",
        points: [
            "E-book and digital resource management",
            "Integration with external repositories",
            "Remote access to resources",
        ],
    },
];

const InfrastructureCard = ({ image, title, points }) => (
    <div className="bg-white rounded-xl overflow-hidden hover:scale-105 duration-700 w-[280px] sm:w-[300px]">
        <img src={image} className="object-cover w-full h-60" alt={title} />
        <div className="p-6">
            <h3 className="text-2xl font-extrabold text-s_orange">{title}</h3>
            <ul className="mt-2 list-disc list-inside text-s_orange">
                {points.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        </div>
    </div>
);

export default function AboutUs() {

    useSmoothScroll();
    const refs = useScrollToHash(['library-hours','library-staffs','facilities']);

    return (
        <div className='w-full h-full overflow-x-hidden'>

            <Helmet>
                <title>About Us | Library | SIESGST</title>
            </Helmet>

            {/* About us */}
            <div className='flex items-center justify-center py-8 bg-gray-100 sm:py-12 md:py-16'>
                <div>
                    <div className='flex justify-center text-4xl font-bold sm:text-5xl md:text-6xl text-s_blue'>
                        <p>About Us</p>
                    </div>
                    <div className="w-32 mx-auto mt-2 border-b-4 sm:w-44 border-s_orange"/>
                </div>
            </div>

            {/* Library Hours */}
            <div ref={refs['library-hours']} className="flex flex-col items-center p-5 mx-4 sm:p-10 sm:mx-10 md:mx-20 lg:mx-40">
                <div>
                    {/* Heading */}
                    <div className="flex justify-center text-2xl font-bold sm:text-3xl md:text-4xl">
                        <p>Library Hours</p>
                    </div>
                    <div className="w-24 mx-auto mt-2 mb-5 border-b-4 border-blue-700 sm:w-28 md:w-36 sm:mb-10"></div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col items-center justify-between w-full my-5 text-base duration-700 sm:flex-row sm:text-lg md:text-xl bg-header-color rounded-xl sm:my-10 hover:scale-105 hover:shadow-2xl">
                    {/* Image Section */}
                    <div className="flex justify-center w-full px-5 m-5 sm:m-10 sm:w-5/12">
                        <img className="w-full h-40 shadow-lg sm:w-auto sm:h-60 md:h-72 rounded-xl" src={Images} alt="Library Hours" />
                    </div>

                    {/* Text Section */}
                    <div className='w-full p-5 sm:w-7/12 md:mr-10'>
                        <div className="flex items-center pb-6 text-2xl font-bold text-s_orange">
                            <FontAwesomeIcon icon={faClock} className="pr-2 text-s_orange" />
                            Operating Hours
                        </div>
                        <div className="space-y-4 text-left ml-">
                            <div className="">
                                <p className="font-semibold">Monday To Saturday</p>
                                <p className="text-sm sm:text-base">8:00 AM To 6:00 PM</p>
                                <p className="text-sm sm:text-base">(Circulation Time 9:00 AM To 6:00 PM)</p>
                            </div>
                            {/* <div className="">
                                <p className="font-semibold">Saturdays</p>
                                <p className="text-sm sm:text-base">9:00 AM To 2:00 PM</p>
                            </div> */}
                            <div className="">
                                <p className="font-semibold">Closed On Sundays, Public Holidays</p>
                                <p className="font-semibold">2nd and 4th Saturdays Closed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Library Staffs */}
            <div ref={refs['library-staffs']} id="library-staffs" className="py-10 ">
                {/* Heading */}
                <div>
                    <div className="flex justify-center text-2xl font-bold sm:text-3xl md:text-4xl">
                        <p>Library Staffs</p>
                    </div>
                    <div className="w-24 mx-auto mt-2 mb-5 border-b-4 border-blue-700 sm:w-28 md:w-36 sm:mb-10"></div>
                </div>

                {/* Library Staffs Section */}
                <div className="flex flex-wrap items-center justify-center gap-6 p-5 shadow-2xl rounded-xl lg:gap-8 sm:p-10 sm:mx-10 md:mx-20 lg:mx-40 bg-s_blue_400">
                    {staffMembers.map((staff, index) => (
                        <StaffCard 
                            key={index} 
                            name={staff.name} 
                            position={staff.position} 
                            qualifications={staff.qualifications} 
                            image={staff.image} 
                            alt={staff.alt} 
                            className="p-3 text-sm"  // Reduced padding & font size for compact layout
                        />
                    ))}
                </div>
            </div>

            {/* Facilities Section */}
            <div ref={refs['facilities']} id="facilities" className="py-10">
                {/* Heading */}
                <div>
                    <div className="flex justify-center text-2xl font-bold sm:text-3xl md:text-4xl">
                        <p>Library Facilities</p>
                    </div>
                    <div className="w-24 mx-auto mt-2 mb-5 border-b-4 border-blue-700 sm:w-28 md:w-36 sm:mb-10"></div>
                </div>

                {/* Grid Layout for Facilities */}
                <div className="grid grid-cols-1 gap-6 p-5 shadow-2xl rounded-xl bg-s_blue_400 sm:p-10 sm:mx-10 md:mx-20 lg:mx-40 sm:grid-cols-2 md:grid-cols-3">
                    {facilities.map((facility, index) => (
                        <div key={index} className="flex flex-col items-center justify-center h-full p-4 bg-white rounded-lg shadow-lg">
                            <FacilityCard image={facility.image} title={facility.title} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Infrastructure Section */}
            <div ref={refs['infrastructure']} id="infrastructure" className="py-10">
                {/* Heading */}
                <div>
                    <div className="flex justify-center text-2xl font-bold sm:text-3xl md:text-4xl">
                        <p>Infrastructure</p>
                    </div>
                    <div className="w-24 mx-auto mt-2 mb-5 border-b-4 border-blue-700 sm:w-28 md:w-36 sm:mb-10"></div>
                </div>

                {/* Infrastructure Section - Matching Library Staffs */}
                <div className="flex flex-wrap items-center justify-center gap-6 p-5 shadow-2xl rounded-xl lg:gap-8 sm:p-10 sm:mx-10 md:mx-20 lg:mx-40 bg-s_blue_400">
                    {infrastructureData.map((infra, index) => (
                        <InfrastructureCard
                            key={index}
                            image={infra.image}
                            title={infra.title}
                            points={infra.points}
                            className="p-3 text-sm"
                        />
                    ))}
                </div>
            </div>


        </div>
    )
}

