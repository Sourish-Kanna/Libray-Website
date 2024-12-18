import { Link } from 'react-router-dom'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import event1 from '../assets/event_1.jpg'
import event2 from '../assets/event_2.jpg'
import event3 from '../assets/event_3.png'
import event4 from '../assets/event_4.jpg'
import { useSmoothScroll } from '../Navigation'



export default function Journals(){
useSmoothScroll();
    const faqs={
        1:["Who can access the library?","All SIES GST students, faculty, and staff can access the library with a valid ID."],
    
        2:["What are the library timings?","Monday to Friday: 9 AM to 5 PM, Saturday: 9 AM to 1 PM."],
    
        3:["How many books can I borrow?","Students can borrow up to 3 books for 15 days. Faculty can borrow up to 5 books."],
    
        4:["How can I renew a book?","Books can be renewed online or in-person before the due date, subject to availability"],
    
        5:["Does the library offer digital resources?","Yes, access to e-journals, databases (IEEE, DELNET), and e-books is available."],
    
        6:["What is the fine for late returns?","A nominal fine is charged per day for overdue books."],
    
        7:[`How can I suggest a book for the library?`,"Use the Suggest Books form available on the website."],
    
        8:["Can I donate books?","Yes, donations are accepted through the Donate Books section."],
    
        9:["Does the library provide internet access?","Yes, free Wi-Fi is available within the library premises."],
    
        10:["How do I access the plagiarism detection tool?","The tool can be accessed through the Plagiarism Tool section of the website."],
    }
    
    const moreLinks = [
        { name: "National Digital Library", url: "https://ndl.iitkgp.ac.in" },
        { name: "SWAYAM Online Courses", url: "https://storage.googleapis.com/uniquecourses/online.html" },
        { name: "National Knowledge Network", url: "http://nkn.gov.in/en" },
        { name: "NPTEL", url: "https://nptel.ac.in" },
        { name: "AICTE: NEAT", url: "https://neat.aicte-india.org/" },
        { name: "AICTE: ELIS portal", url: "http://free.aicte-india.org/" },
        { name: "InfoPort", url: "https://infoport.inflibnet.ac.in" },
        { name: "Talks to Teacher", url: "https://www.ted.com/playlists/182/talks_from_inspiring_teachers" },
        { name: "A-VIEW", url: "http://aview.in" },
        { name: "Virtual Labs", url: "http://www.vlab.co.in/" },
        { name: "FOSSEE", url: "https://fossee.in" },
        { name: "Spoken Tutorial", url: "https://spoken-tutorial.org/" },
        { name: "e-Yantra", url: "https://www.e-yantra.org/" },
        { name: "Oscar++", url: "https://www.it.iitb.ac.in/oscar/" },
        { name: "E-Kalpa", url: "https://icar.org.in/content/e-kalpa" },
        { name: "NCERT Text Books", url: "http://ncert.nic.in/textbook/textbook.htm" },
        { name: "UG/PG MOOCs", url: "http://ugcmoocs.inflibnet.ac.in/ugcmoocs/" },
        { name: "e-PG Pathshala", url: "https://epgp.inflibnet.ac.in" },
        { name: "e-Content courseware in UG subjects", url: "http://eec.nic.in/eec/" },
        { name: "SWAYAMPRABHA", url: "https://www.swayamprabha.gov.in" },
        { name: "e-Shodh Sindhu", url: "https://ess.inflibnet.ac.in" },
        { name: "Vidwan", url: "https://saksht.ac.in/?project=vidwan" },
        { name: "SNLTR", url: "https://nltr.org/" },
        { name: "National Educational Alliance for Technology", url: "https://neat.aicte-india.org/" },
        { name: "Coursera for Campus", url: "https://www.coursera.org/coronavirus" },
        { name: "TCS iON Digital Glass Room", url: "https://learning.tcsionhub.in/hub/glass-room/" },
        { name: "ELIS portal", url: "http://free.aicte-india.org/" },
        { name: "MTUTOR Digital eLearning", url: "https://www.m-tutor.com/" },
        { name: "Design your Solar Systems for Homes", url: "https://www.aicte-india.org/sites/default/files/Design%20your%20Solar%20Systems%20for%20Homes.pdf" },
        { name: "SOS", url: "http://sos-tools.org/" },
        { name: "National Mission on Education", url: "https://www.it.iitb.ac.in/nmeict/home.html" },
        { name: "QUANTUM & NANO COMPUTING", url: "https://www.dei.ac.in/dei/quantumNano/" },
        { name: "DIGITAL LIBRARY INFLIBNET", url: "https://ess.inflibnet.ac.in" },
        { name: "Smart India Hackathon", url: "https://www.sih.gov.in/" },
        { name: "YOUTH4WORK", url: "https://www.youth4work.com/onlinetalenttest" },
        { name: "IEEE RESOURCES - DIGITAL LIBRARY", url: "https://ieeexplore.ieee.org/courses/details/EDP333" },
        { name: "National Apprenticeship Training Scheme", url: "http://mhrdnats.gov.in" },
        { name: "AAKASH EDUCATIONAL PORTAL", url: "https://www.it.iitb.ac.in/nmeict/home.html" },
        { name: "SAKSHAT", url: "https://saksht.ac.in/" },
        { name: "AICTE Training And Learning (ATAL) Academy", url: "https://www.aicte-india.org/atal" },
        { name: "AICTE Collaborations (MoU)", url: "https://www.aicte-india.org/education/collaborations" },
    ];
    
    const events=[
        {img:event1,content:"This event is organized to familiarize new students with the library’s resources, services, and policies. It includes a guided tour of the library, an introduction to the digital resources (e-journals, databases), and how to use the OPAC system for book searches."},
        {img:event2,content:"The library periodically hosts book exhibitions showcasing new arrivals, important academic texts, and rare collections. This event is aimed at promoting reading habits and awareness of the latest publications."},
        {img:event3,content:"Celebrated annually to honor the contributions of libraries in education, this event features guest lectures, workshops, and interactive sessions highlighting the role of libraries in fostering knowledge."},
        {img:event4,content:"Organized in collaboration with IEEE, this event includes workshops, seminars, and presentations on recent developments in technology and engineering. Students and faculty are encouraged to explore the IEEE digital library for research and academic purposes"}
    ]
    
    const [activeIndex, setActiveIndex] = useState(0);
    
    const handleClick = (index) => {
    setActiveIndex(index);
    };


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

        {/* Events */}

        <div>
            <div className='w-full h-40  flex items-center justify-center'>
                <div >
                    <div className='flex justify-center text-4xl font-bold '>
                        <p>Events</p>
                    </div>
                    <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                </div>
            </div>
        </div>
        <div className='carousel-container  flex overflow-visible px-40'>
            {/* Event Names (on the left side) */}
            <div className='flex-col content-center my-10'>
                {['User Orientation', 'Book Exhibition', 'National Library Day', 'IEEE Day'].map((text, index) => (
                    <div key={index} className="mb-5">
                        <p
                            className={`w-96 bg-[#014da1] py-5 px-10 text-3xl rounded-r-full mb-2 transition-transform duration-300 cursor-pointer text-white h-fit ${
                                activeIndex === index ? 'scale-110 text-orange-600 bg-[#3090ff] w-96 shadow-lg shadow-black/50' : ''
                            }`}
                            onClick={() => handleClick(index)}
                        >
                            {text}
                        </p>
                    </div>
                ))}
            </div>

            {/* Event Details (on the right side) */}
            <div className='flex-grow ml-10 mt-12'>
                {activeIndex !== null && (
                    <div className="flex bg-gray-100 p-5 py-12 rounded-md shadow-md w-full hover:scale-105 duration-700">
                        <img src={events[activeIndex].img} alt={events[activeIndex].text} className="w-60 h-60 object-cover mr-5" />
                        <p className="text-gray-700 text-2xl">{events[activeIndex].content}</p>
                    </div>
                )}
            </div>
        </div>


        {/* More */}

        <div className=' rounded-2xl'> {/*bg-[#f3f2ed]*/} 
            <div className='w-full h-20 mt-10  flex items-center justify-center'>
                <div >
                    <div className='flex justify-center text-4xl font-bold mt-8'>
                        <p>More</p>
                    </div>
                    <div className=" border-b-4 mx-auto w-44  border-blue-700 mb-10"></div>
                </div>
            </div>
            <div className='mx-40'>
                <div className="relative group">
                        <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-700 shadow-xl rounded-xl">
                            <p className='text-white'>MORE LINKS</p>
                            <FontAwesomeIcon className="text-2xl text-[#f26d21]"icon="fa-solid fa-chevron-down"/>
                        </div>
                        <div className="more-links h-0 mb-5 overflow-hidden duration-700 shadow-xl group-hover:h-[37rem] rounded-xl">
                            <div className="grid grid-cols-3 gap-0 auto-rows-min content-center mx-10 my-3 text-base transition-all  transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                                {moreLinks.map((link, index) => (
                                    <div key={index} className='grid my-2'>
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#f26d21] "> 
                                            {link.name}
                                        </a>
                                    </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-700 shadow-xl rounded-xl">
                            <p className='text-white'>IEEE</p>
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
                        <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-700 shadow-xl rounded-xl">
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
                        <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-700 shadow-xl rounded-xl">
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
                        <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-700 shadow-xl rounded-xl">
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
        <div className=''>
            <div className='mx-40 mb-20'>
                <div className="relative ">
                    {
                        Object.keys(faqs).map((key)=>(
                            <div key={key} className='group'>
                                <div className='bg-[#efefef] text-2xl py-5 px-10 flex justify-between my-5 shadow-xl duration-700 '>
                                    <p>{faqs[key][0]}</p>
                                    <FontAwesomeIcon className="text-2xl text-[#f26d21]" icon="fa-solid fa-chevron-down" />
                                </div>
                                <div className="h-0 group-hover:h-28 shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
                                    <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 duration-700 transition-all text-xl flex-col content-center mx-10 my-3">
                                        <p className="py-2">{faqs[key][1]}</p>
                                    </div>
                                </div>
                            </div>
                            
                        ))
                    }
                </div>
            </div>
        </div>
        
            
</div>
)
}
