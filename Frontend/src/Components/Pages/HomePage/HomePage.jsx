import React from 'react'
import principal_mam_photo from './assets/principal_mam.png'
import Library_office_photo from './assets/library_office_photo.png'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
library.add(fas);

export default function HomePage() {
  return (
    //image section
        <div className='mt-20 h-full w-full overflow-x-hidden  '>
            <Link to='/'></Link>
            <div className='bg-homepage-bg h-screen bg-no-repeat w-full bg-center bg-cover'>

                {/* accouncement */}

                <div className='mx-40'>
                    <p className='bg-yellow-300 pt-20'>News</p>
                </div>
            </div>

        </div>
  )
}

