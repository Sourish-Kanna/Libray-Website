// import React from 'react'
import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function Services() {
  return (
    <div className='font-serif mt-28'>
        <Link to='/services'>
        </Link>
          <div className='w-full h-48 bg-[#efefef] flex items-center justify-center'>
            <div >
              <div className='flex justify-center text-6xl font-bold text-[#014da1]'>
                <p>Quick Links</p>
              </div>
              <div className=" border-b-4 mx-auto w-44 mt-2 border-red-600 mb-10"></div>
              </div>
          </div>

                                                  {/* Question Banks */}

                                                  <div>
            <div className='w-full h-60  flex items-center justify-center'>
              <div >
                  <div className='flex justify-center text-4xl font-bold '>
                      <p>Question Banks</p>
                  </div>
                  <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
              </div>
            </div>
          </div>
                                        {/* Library Brochure */}
            <div>
                <div className='w-full h-60  flex items-center justify-center'>
                    <div >
                        <div className='flex justify-center text-4xl font-bold '>
                            <p>Library Brochure</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
            </div>
                                        {/* University Syllabus*/}
            <div>
                <div className='w-full h-60  flex items-center justify-center'>
                    <div >
                        <div className='flex justify-center text-4xl font-bold '>
                            <p>University Syllabus</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
            </div>
                                        {/*Scholarships*/}
            <div>
                <div className='w-full h-60  flex items-center justify-center'>
                    <div >
                        <div className='flex justify-center text-4xl font-bold '>
                            <p>Scholarships</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
            </div>
                                        {/*Research Funds*/}
            <div>
                <div className='w-full h-60  flex items-center justify-center'>
                    <div >
                        <div className='flex justify-center text-4xl font-bold '>
                            <p>Research Funds</p>
                        </div>
                        <div className=" border-b-4 mx-auto w-44 mt-2 border-blue-700 mb-10"></div>
                    </div>
                </div>
            </div>



        {/* <p className='text-4xl font-bold my-10 border-b-4  border-orange-500 pb-4 h-14  text-center'>Library Services</p>
        <div className="Flex m-8 font-serif" >
        <h1 className='text-4xl'>Library provides the following Services:</h1>
          <div className='flex m-8 justify-between '>
            
              <ul className='p-0'>
                <li className='bg-yellow-200 text-3xl flex m-2m justify-between'><p className='m-4'>Membership</p>
                  <a href=""><FontAwesomeIcon className='mx-4'icon="fa-solid fa-chevron-right" /></a>
                  </li>
                <li className='bg-yellow-200 text-3xl flex '><a href="">Book Search &#40;OPAC&#41;<FontAwesomeIcon className='mx-4'icon="fa-solid fa-chevron-right" /></a></li>
                <li className='bg-yellow-200 text-3xl flex '><a href="">Book issue&#47;renew&#47;<FontAwesomeIcon className='mx-4'icon="fa-solid fa-chevron-right" />reserve</a></li>
                <li className='bg-yellow-200 text-3xl flex '><a href="">Internet facility<FontAwesomeIcon className='mx-4'icon="fa-solid fa-chevron-right" /></a></li>
                <li className='bg-yellow-200 text-3xl flex '><a href="">Photocopy facility<FontAwesomeIcon className='mx-4'icon="fa-solid fa-chevron-right" /></a></li>
                <li className='bg-yellow-200 text-3xl flex '><a href="">Book Bank Scheme &#40;SC&#47;ST&#47;NT&#47;OBC&#41;<FontAwesomeIcon className='mx-4'icon="fa-solid fa-chevron-right" /></a></li>
              </ul>
              <img src={services} alt="" className=''/>
          </div>
          <div>

          </div>
        </div> */}
      
    </div>
  )
}