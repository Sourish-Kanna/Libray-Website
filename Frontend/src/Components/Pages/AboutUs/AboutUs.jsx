import { Link } from 'react-router-dom'
import Images from '../HomePage/assets/img5.webp'
import sand from '../HomePage/assets/sandip.webp'
import indra from '../HomePage/assets/indrabahadur.webp'
import sac from '../HomePage/assets/sachin.webp'
import ref from '../HomePage/assets/img4.webp'
import ret from '../HomePage/assets/bookret.webp'
import fac from '../HomePage/assets/img9.webp'
import repo from '../HomePage/assets/img3.webp'
import opa from '../HomePage/assets/img11.webp'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import {useScrollToHash} from '../../../CustomHooks/Navigation'



library.add(fas, faClock);
library.add(fas);


export default function AboutUs() {

const refs = useScrollToHash(['library-hours','library-staffs','facilities']);

    return (
        <div className='font-serif mt-28'>
            <Link to='/about'></Link>

                            {/* About us */}
            <div className='w-full h-48 bg-[#efefef] flex items-center justify-center'>
                <div >
                    <div className='flex justify-center text-6xl font-bold text-[#014da1]'>
                    <p>About Us</p>
                    </div>
                    <div className=" border-b-4 mx-auto w-44 mt-2 border-red-600 mb-10"></div>
                </div>
            </div>

                            {/* Library hours */}

            <div ref={refs['library-hours']} id="library-hours">
                <div className='h-28 mt-6 flex items-center justify-center'>
                    <div >
                    <div className='flex justify-center text-4xl font-bold mt-12 '>
                        <p>Library-Hours</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
        
                <div className="h-96 mx-40 my-0.5 bg-[#f3f2ed] shadow-2xl flex items-center rounded-xl hover:scale-105 duration-700">
                    <div className="m-20 w-5/12 rounded-2xl ">
                        <img src={Images} className="h-60 rounded-2xl "></img>
                    </div>
                    <div className='w-7/12 mr-10 p-6 '>
                    <ul className='list-none'>
                        
                        <li className="text-2xl font-bold text-orange-500">
                        <FontAwesomeIcon icon="fa-regular fa-clock" className="mr-2 text-blue-500" />
                            OPERATING HOURS</li>
                        <li className="ml-8 font-semibold">
                            9:00 AM to 6:00 PM</li>
                        <li className='ml-8 font-semibold'>Monday to Friday</li>
                        <li className='mt-4 text-2xl font-bold text-orange-500'>
                        <FontAwesomeIcon icon="fa-regular fa-clock" className="mr-2 text-blue-500" />
                            SATURDAYS</li>
                        <li className='ml-8 font-semibold'>
                            9:00 AM to 2:00 PM</li>
                        <li className='mt-4 text-3xl font-bold text-orange-500'>Closed on Sundays and public holidays</li>
                        </ul>
                    </div>
                
            
                

                </div>
            </div>
                                        {/* Library Staffs */}
            <div ref={refs['library-staffs']} id="library-staffs">
                <div className='w-full h-36 flex items-center justify-center'>
                    <div >
                        <div className='flex justify-center text-4xl font-bold mt-12 '>
                            <p>Library Staffs</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
                <div className=" mx-40 mt my-0.5 bg-blue-500 shadow-2xl flex rounded-xl items-center hover:scale-105 duration-700 ">
                    <div className="mx-20 w-56 mr-24 ">
                        <img src={sand} className="h-60 w-56 rounded-2xl mt-10"></img>
                        <div className="text-white p-8 mt-5 rounded-xl ">
                            <ul>
                                <li className="text-2xl font-extrabold">Library Clerk</li>
                                <li className="font-bold ml-6">Mr.Sandip Patil</li> 
                                <li className="font-semibold ml-3"> M.A,B.Ed.,M.L.I.Sc</li>
                            </ul>
                        </div>
                    </div> 
                    <div className="mx-20 w-5/12 mr-10">
                        <img src={sac} className="h-60 w-56 rounded-2xl mt-10 "></img>
                            <div className="text-white p-8 mt-5 w-64 rounded-xl">
                            <ul>
                                <li className="text-2xl font-extrabold">Library Attendant</li>
                                <li className="font-bold ml-6">Mr.Sachin Gurav</li> 
                                <li className="font-semibold ml-5"> M.A,B.Ed.,M.L.I.Sc</li>
                            </ul>
                            </div>
                    </div>
                    <div className="mx-20  w-5/12 ml-24">
                        <img src={indra} className="h-60 w-56 rounded-2xl mt-10"></img>
                            <div className="text-white p-6 mt-5 w-64 rounded-xl ">
                                <ul>
                                    <li className="text-2xl font-extrabold">Library Attendant</li>
                                    <li className="font-bold ml-4">Mr.Indrabahadur singh</li> 
                                    <li className="font-semibold ml-14"> BSc(Phys)</li>
                                </ul>
                            </div>
                    </div>
                </div>
            </div>    
                                        {/* Facilities */}
            <div ref={refs['facilities']} id="facilities">
                <div className='w-full h-40 flex items-center justify-center'>
                    <div >
                        <div className='flex justify-center  text-4xl font-bold mt-12 '>
                            <p>Facilities</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
                <div>
                
                </div>
                
            </div>
            <div className="h-screen mx-40 my-0.5 bg-blue-500 shadow-2xl flex flex-wrap  items-center rounded-xl">
                <div className="mx-20 w-56 mr-16  hover:scale-105 duration-700 ">
                        <img src={ref} className="h-60 w-56 rounded-2xl mt-10"></img>
                        <div className=" p-5  rounded-xl h-3 ">
                            <h1 className="font-extrabold text-white text-2xl">Reference Service</h1>
                        </div>
                </div>
                <div>
                    <div className="ml-24 w-56 hover:scale-105 duration-700">
                        <img src={ret} className="h-60 w-56 rounded-2xl mt-10 "></img>
                            <div className=" p-5 h-3 rounded-xl">
                                <h1 className="font-extrabold text-white text-2xl" >HomeIssue/Book return</h1>
                            </div>
                    </div>
                </div>
                <div className="ml-36  w-56 hover:scale-105 duration-700 ">
                        <img src={fac} className="h-60 w-56 rounded-2xl mt-10"></img>
                            <div className="p-5 h-3 rounded-xl ">
                                <h1 className="font-extrabold text-white text-2xl">Book Bank facility</h1>
                            </div>
                </div>
                <div className="mx-20  w-56 mr-16 hover:scale-105 duration-700 mb-10 ">
                        <img src={repo} className="h-60 w-56 rounded-2xl mt-10"></img>
                            <div className=" p-5 h-3 rounded-xl ">
                                <h1 className="font-extrabold text-white text-2xl">Repography service</h1>
                            </div>
                </div>
                <div className="ml-24  w-56 hover:scale-105 duration-700 mb-10">
                        <img src={opa} className="h-60 w-56 rounded-2xl mt-10"></img>
                            <div className=" p-5 h-3 rounded-xl ">
                                <h1 className="font-extrabold text-white text-2xl">Library OPAC</h1>
                            </div>
                </div>
                <div className="ml-36 w-56 hover:scale-105 duration-700 mb-10">
                        <img src={fac} className="h-60 w-56 rounded-2xl mt-10"></img>
                            <div className=" p-5 h-3 rounded-xl ">
                                <h1 className="font-extrabold text-white text-2xl">Newspaper clipping</h1>
                            </div>
                </div>
                
                
               
            </div>
                                        {/* Infratructure */}
            <div>
                <div className='w-full h-60  flex items-center justify-center'>
                    <div >
                        <div className='flex justify-center text-4xl font-bold '>
                            <p>Infratructure</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

