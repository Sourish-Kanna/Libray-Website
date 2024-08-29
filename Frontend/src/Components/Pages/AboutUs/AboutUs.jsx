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
                    <div class=" border-b-4 mx-auto w-44 mt-2 border-red-600 mb-10"></div>
                </div>
            </div>

                            {/* Facilites */}

            <div>
                <div className='w-full h-60  flex items-center justify-center'>
                    <div >
                    <div className='flex justify-center text-4xl font-bold '>
                        <p>Facilites</p>
                        </div>
                        <div class=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
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
                        <div class=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
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
                        <div class=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
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
                        <div class=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
            </div>

            





























            
            {/*<section className="flex justify-center min-h-screen font-serif">
                <div className="">
                    <div>
                    <header className="text-center">
                        <h1 className="pb-2 mt-10 mb-8 text-4xl font-bold border-b-4 border-orange-400 h-14">About Us</h1>
                    </header>
                    </div>

                    <div className="flex flex-grow w-full text-2xl">

                        {/* Left Side 
                        <div className="justify-between flex-1 px-6 bg-white border-r-2 border-orange-400"> 
                            <div className="flex-col gap-3 mb-6">
                                <div className='pb-4'>
                                    <h2 className="mb-2 text-3xl font-semibold">About Us</h2>
                                    <p>
                                        Library being the heart of an academic and learning center is located in the II floor and is easily accessible
                                        from any part of the SIES GST Campus.<br/>
                                        The aim  of the library is to facilitate the creation of new knowledge through the procurement, processing,
                                        organization &  dissemination of knowledge resources and providing for value added services to users.
                                    </p>
                                </div>
                                <div className='pb-4'>
                                    <h2 className="mb-2 text-3xl font-semibold">General Rules</h2>
                                    <ul className='list-disc space-y-0.5 space-x-4'>
                                        <li className='list-none'></li>
                                        <li>Students should maintain silence in the library at all the time.</li>
                                        <li>Group discussion is strictly not allowed.</li>
                                        <li>Personal Books, Printed Materials, Bags & plastic carry bags are not allowed to bring inside the library.</li>
                                        <li>Members are held responsible for all items issued on their name, until they are returned to the library in good condition.</li>
                                        <li>The lost or mutilated book should be brought to the notice of library staff immediately.</li>
                                        <li>If an issued book is lost / damaged, it is to be either replaced with latest edition or compensated by double the original cost
                                            at the prevailing exchange rate. Refunding compensation money may not be possible if book lost is found later.</li>
                                        <li>The borrowing facility can be restricted or suspended in case of misbehavior or misuse of the library facilities / materials.</li>
                                        <li>Use of mobile is strictly prohibited in and around the library premises.</li>
                                        <li>Documents marked as “Reference Copy” are to be consulted within the library premises.</li>
                                        <li>Materials issued out from the library are to be returned at the Circulation Desk only during its working hours before the due date mentioned.</li>
                                        <li>A document issued may be renewed provided there is no pending reservation against it.</li>
                                        <li>Borrower should bring the material physically to the library for renewal.</li>
                                        <li>No user is eligible to borrow documents from the library on someone’s behalf.</li>
                                        <li>No material from the library should be taken out without proper issue. Any type of violation may lead to a disciplinary action.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        {/* <!-- Right Side --> 
                        <div className="justify-between flex-1 px-6 bg-white">
                            <div className="flex-col items-start gap-2 mb-6">
                                <div className='pb-6'>
                                    <h2 className="mb-2 text-3xl font-semibold">Library Timings</h2>
                                    <p>
                                        Monday to Saturday: 08 am to 07 pm (11 hrs)<br/>
                                        During Vacation:  09 am to 5 pm (8 hrs)<br/>
                                        The library will remain closed on Sundays &  Public holidays. <br/>
                                        Regarding extension of timings, if any, after 7 pm, contact at circulation counter or mail us to :
                                        <a href="mailto:librariangst@sies.edu.in?subject=Regarding extension of timings"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline transition-colors duration-200 hover:text-blue-800">
                                            librariangst@sies.edu.in
                                        </a>.
                                    </p>

                                </div>
                                <div className='pb-4'>
                                    <h2 className="mb-2 text-3xl font-semibold">Library Commmitee</h2>
                                    <p>
                                        Hello
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>*/}
        </div>
    )
}

