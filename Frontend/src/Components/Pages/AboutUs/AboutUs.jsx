import { Link } from 'react-router-dom'
import Images from '../HomePage/assets/img5.webp'

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
                <div className='h-40 flex items-center justify-center'>
                    <div >
                    <div className='flex justify-center text-4xl font-bold '>
                        <p>Library-Hours</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
        
                <div className="h-screen mx-40 my-0.5 bg-[#f3f2ed] shadow-2xl flex items-center rounded-xl">
                    <div className="w-1/2 rounded-2xl">
                        <img src={Images} className="h-60 p-6 rounded-2xl "></img>
                    </div>
                    <div className='w-1/2 bg-yellow-50'>
                        <li>Operating hours</li>
                        <li>saturdays</li>
                    </div>
                
            
                

                </div>
            </div>
                                        {/* Library Staffs */}
            <div>
                <div className='w-full h-40 flex items-center justify-center'>
                    <div >
                        <div className='flex justify-center text-4xl font-bold '>
                            <p>Library Staffs</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
                <div className="h-screen mx-40 mt my-0.5 bg-[#f3f2ed] shadow-2xl flex flex-col items-center ">
                <div className="flex flex-row space-x-10"></div>
                    <div className='h-32 w-32mx-10 mt-10  bg-black shadow-2xl'></div>
                        <p>hello</p></div>
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

