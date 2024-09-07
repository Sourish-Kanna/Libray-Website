import { Link } from 'react-router-dom'
import Images from '../HomePage/assets/img5.webp'
import sand from '../HomePage/assets/sandip.webp'
import indra from '../HomePage/assets/indrabahadur.webp'
import sac from '../HomePage/assets/sachin.webp'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
library.add(fas, faClock);
library.add(fas);
export default function AboutUs() {
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

            <div>
                <div className='h-28 flex items-center justify-center'>
                    <div >
                    <div className='flex justify-center text-4xl font-bold '>
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
            <div>
                <div className='w-full h-36 flex items-center justify-center'>
                    <div >
                        <div className='flex justify-center text-4xl font-bold '>
                            <p>Library Staffs</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
                <div className="h-screen mx-40 mt my-0.5 bg-blue-500 shadow-2xl flex rounded-xl items-center hover:scale-105 duration-700 ">
                    <div className="m-20 w-56 mr-16 ">
                    <img src={sand} className="h-60 w-56 rounded-2xl"></img>
                    <div className="bg-white p-8 mt-10 rounded-xl ">
                        <ul>
                        <li className="text-2xl font-extrabold">Library Clerk</li>
                        <li className="font-bold ml-6">Mr.Sandip Patil</li> 
                        <li className="font-semibold ml-3"> M.A,B.Ed.,M.L.I.Sc</li>
                        </ul>
                    </div>
                    </div> 
                    <div className="m-20 w-5/12 mr-10">
                    <img src={sac} className="h-60 w-56 rounded-2xl "></img>
                    <div className="bg-white p-8 mt-10 w-64 rounded-xl">
                        <ul>
                        <li className="text-2xl font-extrabold">Library Attendant</li>
                        <li className="font-bold ml-6">Mr.Sachin Gurav</li> 
                        <li className="font-semibold ml-5"> M.A,B.Ed.,M.L.I.Sc</li>
                        </ul>
                    </div>
                    </div>
                    <div className="m-20  w-5/12 ml-16">
                    <img src={indra} className="h-60 w-56 rounded-2xl"></img>
                    <div className="bg-white p-8 mt-10 w-64 rounded-xl ">
                        <ul>
                        <li className="text-2xl font-extrabold">Library Attendant</li>
                        <li className="font-bold ml-4">Mr.Indrabahadur singh</li> 
                        <li className="font-semibold ml-20"> 11th</li>
                        </ul>
                    </div>
                    
                    </div>
                </div>
            </div>    
                                        {/* Facilities */}
            <div>
                <div className='w-full h-40 flex items-center justify-center'>
                    <div >
                        <div className='flex justify-center  text-4xl font-bold '>
                            <p>Facilities</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
            </div>
            <div className="h-screen mx-40 my-0.5 bg-[#f3f2ed] shadow-2xl flex items-center">
                

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

