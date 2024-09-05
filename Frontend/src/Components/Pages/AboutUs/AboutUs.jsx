import { Link } from 'react-router-dom'

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

                            {/* Facilites */}

            <div>
                <div className='w-full h-60  flex items-center justify-center'>
                    <div >
                    <div className='flex justify-center text-4xl font-bold '>
                        <p>Facilites</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
            </div>
                                        {/* Library Staffs */}
            <div>
                <div className='w-full h-60  flex items-center justify-center'>
                    <div >
                        <div className='flex justify-center text-4xl font-bold '>
                            <p>Library Staffs</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
            </div>
                                        {/* Library hours */}
            <div>
                <div className='w-full h-60  flex items-center justify-center'>
                    <div >
                        <div className='flex justify-center text-4xl font-bold '>
                            <p>Library Hours</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
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

