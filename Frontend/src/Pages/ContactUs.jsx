import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Helmet } from 'react-helmet';
import '../css/form.css';
import '../css/admin.css';

export default function ContactUs() {
  return (
    <div className="">
      <Link to="/contact"></Link>
        <Helmet>
                <title>Others | Library | SIESGST</title>
            </Helmet>
      <section className="min-h-screen flex flex-col justify-center ">
        <div className="flex flex-col h-full">
          <div className='bg-gray-100 flex items-center justify-center py-8 sm:py-12 md:py-16'>
                <div>
                    <div className='flex justify-center text-4xl sm:text-5xl md:text-6xl font-bold text-s_blue'>
                        <p>Contact Us</p>
                    </div>
                    <div className="border-b-4 mx-auto w-32 sm:w-44 mt-2 border-s_orange"/>
                </div>
            </div>
          <div className="flex flex-grow w-full">
            <div className="flex-1 p-8 bg-white border-r border-gray-200">
              {/* Contact Information */}
              <div className="mb-6 flex flex-col items-center gap-4">
                <i className="fas fa-location-dot text-orange-500 text-4xl mb-2"></i>
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Our Address</h2>
                  <p className="text-lg">
                    SIES Graduate School of Technology Central Library, II
                    floor, (R 204), Sector-5, Nerul, Navi Mumbai-400706
                    Maharashtra, India
                  </p>
                </div>
              </div>

              {/* Librarian Information */}
              <div className="mb-6 flex flex-col items-center gap-4">
                <i className="fas fa-user text-orange-500 text-4xl mb-2"></i>
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Librarian</h2>
                  <p className="text-lg font-semibold">
                    Ms. Arunadevi S Lingam
                  </p>
                  <p className="text-lg">Tel: +91 22 6108 2409</p>
                  <p className="text-lg">Email: librariansgst@sies.edu.in</p>
                </div>
              </div>

              {/* Staff Information */}
              <div className="mb-6 flex flex-col items-center gap-4">
                <i className="fas fa-users text-orange-500 text-4xl mb-2"></i>
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">
                    Librarian Staff
                  </h2>
                  <p className="text-lg font-semibold">Mr. Sandip Patil</p>
                  <p className="text-lg">Email: sandipp@sies.edu.in</p>
                  <p className="text-lg font-semibold mt-2">Mr. Sachin Gurav</p>
                  <p className="text-lg">Email: sachingurav@rediff.com</p>
                  <p className="text-lg mt-2">Tel: +91 22 6108 2455</p>
                  <p className="text-lg mt-2 font-semibold">
                    Mr. Indrabahadur Singh
                  </p>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </section>
    </div>
  );
}
