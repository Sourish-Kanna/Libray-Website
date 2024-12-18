import Images from '../assets/HomePage/img5.webp'
import sand from '../assets/sandip.webp'
import indra from '../assets/indrabahadur.webp'
import sac from '../assets/sachin.webp'
import ref from '../assets/HomePage/img4.webp'
import ret from '../assets/bookret.webp'
import fac from '../assets/HomePage/img9.webp'
import repo from '../assets/HomePage/img3.webp'
import opa from '../assets/HomePage/img11.webp'
import idi from '../assets/HomePage/img6.webp'
import comp from '../assets/HomePage/img12.webp'
import dig from '../assets/HomePage/image1.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useScrollToHash, useSmoothScroll} from '../Navigation'




export default function AboutUs() {
useSmoothScroll();
    

const refs = useScrollToHash(['library-hours','library-staffs','facilities']);

    return (
        <div>

            {/* About us */}
            <div className='w-full h-48 bg-gray-100 flex items-center justify-center'>
                <div >
                    <div className='flex justify-center text-6xl font-bold text-s_blue'>
                    <p>About Us</p>
                    </div>
                    <div className=" border-b-4 mx-auto w-44 mt-2 border-s_orange mb-10"></div>
                </div>
            </div>

            {/* Library hours */}

            <div ref={refs['library-hours']} id="library-hours">
                <div className='h-28 mt-6 flex items-center justify-center'>
                    <div >
                    <div className='flex justify-center text-4xl font-bold mt-12 '>
                        <p>Library-Hours</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-s_blue mb-10"></div>
                    </div>
                </div>
        
                <div className="h-96 mx-40 my-0.5 bg-[#f3f2ed] shadow-2xl flex items-center rounded-xl hover:scale-105 duration-700">
                    <div className="m-20 w-5/12 rounded-2xl ">
                        <img src={Images} className="h-60 rounded-2xl "></img>
                    </div>
                    <div className='w-7/12 mr-10 p-6 '>
                    <ul className='list-none'>
                        
                        <li className="text-2xl font-bold text-s_orange">
                        <FontAwesomeIcon icon="fa-regular fa-clock" className="mr-2 text-blue-500" />
                            OPERATING HOURS</li>
                        <li className="ml-8 font-semibold">
                            8:00 AM to 7:00 PM</li>
                            <li className='ml-8 font-semibold'>Circulation time 9:00 AM to 5:00 PM</li>    
                        <li className='ml-8 font-semibold'>Monday to Saturday</li>
                        <li className='mt-4 text-2xl font-bold text-s_orange'>
                        <FontAwesomeIcon icon="fa-regular fa-clock" className="mr-2 text-blue-500" />
                            SATURDAYS</li>
                        <li className='ml-8 font-semibold'>
                            9:00 AM to 2:00 PM</li>
                            <li className='ml-8 font-semibold'>2ND and 4TH SATURDAYS CLOSED</li>    
                        <li className='mt-4 text-3xl font-bold text-s_orange'>Closed on Sundays and public holidays</li>
                        </ul>
                    </div>
                
            
                

                </div>
            </div>
                                        {/* Library Staffs */}
            <div ref={refs['library-staffs']} id="library-staffs">
                <div className='w-full h-36 flex items-center justify-center'>
                    <div>
                        <div className='flex justify-center text-4xl font-bold mt-12'>
                            <p>Library Staffs</p>
                            </div>
                            <div className="border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>

                <div className="bg-blue-500 shadow-2xl rounded-xl mx-40 my-0.5 p-12 min-h-[600px] flex items-center">
                    <div className="flex justify-center gap-12 w-full">
                        <div className="bg-white rounded-xl overflow-hidden hover:scale-105 duration-700 w-80">
                            <img src={sand} className="h-80 w-full object-cover"></img>
                            <div className="p-6">
                                <h3 className="text-2xl font-extrabold text-s_orange">Library Clerk</h3>
                                <p className="font-bold text-s_orange mt-2">Mr. Sandip Patil</p>
                                <p className="font-semibold text-s_orange">M.A, B.Ed., M.L.I.Sc</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl overflow-hidden hover:scale-105 duration-700 w-80">
                            <img src={sac} className="h-56w-full object-cover"></img>
                            <div className="p-6">
                                <h3 className="text-2xl font-extrabold text-s_orange">Library Attendant</h3>
                                <p className="font-bold text-s_orange mt-2">Mr. Sachin Gurav</p>
                                <p className="font-semibold text-s_orange"> M.L.I.c</p>
                            </div>
                        </div>

            
                        <div className="bg-white rounded-xl overflow-hidden hover:scale-105 duration-700 w-80">
                            <img src={indra} className="h-80 w-full object-cover"></img>
                            <div className="p-6">
                                <h3 className="text-2xl font-extrabold text-s_orange">Library Attendant</h3>
                                <p className="font-bold text-s_orange mt-2">Mr. Indrabahadur Singh</p>
                                <p className="font-semibold text-s_orange">10TH</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                                        {/* Facilities */}
            <div ref={refs['facilities']} id="facilities">
                <div className='w-full h-36 flex items-center justify-center'>
                <div>
                    <div className='flex justify-center text-4xl font-bold mt-12'>
                    <p>Facilities</p>
                </div>
                <div className="border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                </div>
                </div>
                <div className="bg-blue-500 shadow-2xl rounded-xl mx-40 my-0.5 p-12 min-h-[800px] flex items-center">
                    <div className="flex flex-wrap justify-center gap-12 w-full">
                        <div className="bg-white rounded-xl overflow-hidden mr-10 hover:scale-105 duration-700 w-64">
                            <img src={ref} className="h-60 w-full object-cover"></img>
                            <div className="p-6">
                                <h3 className="text-xl font-extrabold text-s_orange">Reference Service</h3>
                            </div>
                        </div>

            
                        <div className="bg-white rounded-xl overflow-hidden hover:scale-105 duration-700 w-64">
                            <img src={ret} className="h-60 w-full object-cover"></img>
                            <div className="p-6">
                                <h3 className="text-xl font-extrabold text-s_orange">HomeIssue/Book return</h3>
                            </div>
                        </div>

        
                        <div className="bg-white rounded-xl overflow-hidden ml-10 hover:scale-105 duration-700 w-64">
                            <img src={fac} className="h-60 w-full object-cover"></img>
                            <div className="p-6">
                                <h3 className="text-xl font-extrabold text-s_orange">Book Bank facility</h3>
                            </div>
                        </div>

            
                        <div className="bg-white rounded-xl overflow-hidden mr-10 hover:scale-105 duration-700 w-64">
                            <img src={repo} className="h-60 w-full object-cover"></img>
                            <div className="p-6">
                                <h3 className="text-xl font-extrabold text-s_orange">Repography service</h3>
                            </div>
                        </div>

        
                        <div className="bg-white rounded-xl overflow-hidden hover:scale-105 duration-700 w-64">
                            <img src={opa} className="h-60 w-full object-cover"></img>
                            <div className="p-6">
                                <h3 className="text-xl font-extrabold text-s_orange">Library OPAC</h3>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl overflow-hidden ml-10 hover:scale-105 duration-700 w-64">
                            <img src={fac} className="h-60 w-full object-cover"></img>
                            <div className="p-6">
                                <h3 className="text-xl font-extrabold text-s_orange">Newspaper clipping</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
                
               
    
                                        {/* Infratructure */}
            
            <div ref={refs['infrastructure']} id="infrastructure">
                <div className='w-full h-36 flex items-center justify-center'>
                    <div>
                        <div className='flex justify-center text-4xl font-bold mt-12'>
                            <p>Infrastructure</p>
                        </div>
                    <div className="border-b-4 mx-auto w-44 mt-2  border-blue-700 mb-10"></div>
                    </div>
                </div>
                <div className="bg-blue-500 shadow-2xl rounded-xl mx-40 my-0.5 p-12 mb-10 min-h-[600px] flex items-center">
                    <div className="flex justify-center gap-12 w-full">
                        <div className="bg-white rounded-xl overflow-hidden hover:scale-105 duration-700 w-80">
                            <div className=" w-full bg-gray-300 flex items-center justify-center">
                                <img src={idi} className="h-80 w-full object-cover"></img>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-extrabold text-s_orange">Network Infrastructure</h3>
                                    <ul className="list-disc list-inside mt-2 text-s_orange">
                                        <li>High-Speed Internet</li>
                                        <li>Secure Wi-Fi for students and staff</li>
                                    </ul>
                            </div>
                        </div>

            
                        <div className="bg-white rounded-xl overflow-hidden hover:scale-105 duration-700 w-80">
                            <div className=" w-full bg-gray-300 flex items-center justify-center">
                                <img src={comp} className="h-80 w-full object-cover"></img>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-extrabold text-s_orange">Hardware Infrastructure</h3>
                                    <ul className="list-disc list-inside mt-2 text-s_orange">
                                        <li>Computing devices for catalog browsing</li>
                                        <li>ID card scanning attendance system</li>
                                    </ul>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl overflow-hidden hover:scale-105 duration-700 w-80">
                            <div className=" w-full bg-gray-300 flex items-center justify-center">
                                <img src={dig} className="h-80 w-full object-cover"></img>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-extrabold text-s_orange">Digital Library</h3>
                                    <ul className="list-disc list-inside mt-2 text-s_orange">
                                        <li>E-book and digital resource management</li>
                                        <li>Integration with external repositories</li>
                                        <li>Remote access to resources</li>
                                    </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    )
}

