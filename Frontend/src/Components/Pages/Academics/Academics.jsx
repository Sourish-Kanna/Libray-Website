import React from 'react'
import { Link } from 'react-router-dom'
export default function EResources() {
  return (
    <div className='font-serif mt-28'>
        <Link to='/academics'></Link>

        <div className='w-full h-48 bg-[#efefef] flex items-center justify-center'>
            <div >
                <div className='flex justify-center text-6xl font-bold text-[#014da1]'>
                    <p>Academics</p>
                </div>
                <div className="mx-auto mt-2 mb-10 border-b-4 border-red-600 w-44"></div>
            </div>
        </div>

                            {/* Scholarship */}

        <div className='mx-40'>
            <div className='flex items-center justify-center w-full h-60'>
                <div >
                    <div className='flex justify-center text-4xl font-bold '>
                        <p>Scholarship</p>
                    </div>
                <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
            </div>
            </div>
            <div className='flex items-center justify-between w-full my-10 text-xl duration-700 bg-white shadow-xl rounded-xl hover:scale-105 h-5/6'>
            Links to scholarship portals and detailed information about financial aid opportunities.
            </div>
        </div>
                                        {/* Rules&Guildelines */}
            <div>
                <div className='flex items-center justify-center w-full h-60'>
                    <div >
                        <div className='flex justify-center text-4xl font-bold '>
                            <p>Rules&Guildelines</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
            </div>
                                        {/* Academic Calender*/}
            <div>
                <div className='flex items-center justify-center w-full h-60'>
                    <div >
                        <div className='flex justify-center text-4xl font-bold '>
                            <p>Academic Calender</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
            </div>
                                        {/*Achievements */}
            <div>
                <div className='flex items-center justify-center w-full h-60'>
                    <div >
                        <div className='flex justify-center text-4xl font-bold '>
                            <p>Achievements</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
            </div>



            {/* <header className="mb-4 text-center h-14">
                <h1 className="mt-10 mb-8 text-4xl font-bold border-b-4 border-orange-400 h-14">E-Resources</h1>
            </header>
            <div className='flex justify-center h-24 align-center '>
              <p className='m-auto text-4xl font-bold text-orange-500 size-4/4'>List of E-resources subscribed by the Library for the year 2022</p>
            </div>
            <div className='grid grid-cols-4 gap-8 mx-10 text-2xl'>

              <div className='flex flex-col justify-between p-5 bg-yellow-100 rounded-xl'>
                  <p className='mb-3'>IEEE-ASPP:</p>
                  <p>The IEEE All Society Periodical Package provides access to IEEE journals, transactions, letters, magazines and conference proceedings, IET journals and conference proceedings, IEEE Standards and IEEE educational courses.  </p>
                  <a className='my-10' href="">Read more</a>
              </div>
              <div className='flex flex-col justify-between p-5 bg-yellow-100 rounded-xl'>
                  <p className='mb-3'>Science Direct:</p>
                  <p>Science Direct is Elsevier’s leading information solution forresearchers. Science Direct combines authoritative, full-text scientific, technical and health publications with smart,intuitive functionality so that users can stay informed in their fields and can work more effectively and efficiently.</p>
                  <a className='my-10' href="">Read more</a>
              </div>
              <div className='flex flex-col justify-between p-5 bg-yellow-100 rounded-xl'>
                  <p className='mb-3'>ASME:</p>
                  <p>THE AMERICAN SOCIETY OF MECHANICAL ENGINEERS promotes the art, science & practice of multidisciplinary engineering and allied sciences around the globe.Founded in 1880 by a small group of leading industrialists, ASME has grown through the decades to include more than 130,000 members in 151 countries. </p>
                  <a className='my-10' href="">Read more</a>
              </div>
              <div className='flex flex-col justify-between p-5 bg-yellow-100 rounded-xl'>
                  <p className='mb-3'>J-Gate Plus:</p>
                  <p>It is an electronic gateway to global e-journal literature. Launched in 2001 by Informatics India Limited. It provides seamless access to  millions of journal articles available online offered by 13,243 Publishers.It presently has a massive database of journal literature, indexed from 48,025 e-journals with links to full text at publisher sites.</p>
                  <a className='my-10' href="">Read more</a>
              </div>

              <div>

              </div>
            </div> */}
      
    </div>
  )
}