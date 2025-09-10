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
      <section className="flex flex-col justify-center min-h-screen ">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center py-8 bg-gray-100 sm:py-12 md:py-16">
            <div>
              <div className="flex justify-center text-4xl font-bold sm:text-5xl md:text-6xl text-s_blue">
                <p>Contact Us</p>
              </div>
              <div className="w-32 mx-auto mt-2 border-b-4 sm:w-44 border-s_orange" />
            </div>
          </div>
          <div className="flex flex-grow w-full">
            <div className="flex-1 p-8 bg-white border-r border-gray-200">
              {/* Contact Information */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <i className="mb-2 text-4xl text-orange-500 fas fa-location-dot"></i>
                <div className="text-center">
                  <h2 className="mb-2 text-xl font-semibold">Our Address</h2>
                  <p className="text-lg">
                    SIES Graduate School of Technology Central Library, II
                    floor, (R 204), Sector-5, Nerul, Navi Mumbai-400706
                    Maharashtra, India
                  </p>
                </div>
              </div>

              {/* Librarian Information */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <i className="mb-2 text-4xl text-orange-500 fas fa-user"></i>
                <div className="text-center">
                  <h2 className="mb-2 text-xl font-semibold">Librarian</h2>
                  <p className="text-lg font-semibold">Ms. Swati Gajakose</p>
                  <p className="text-lg">Tel: +91 22 6108 2409</p>
                  <p className="text-lg">Email: librariansgst@sies.edu.in</p>
                </div>
              </div>

              {/* Staff Information */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <i className="mb-2 text-4xl text-orange-500 fas fa-users"></i>
                <div className="text-center">
                  <h2 className="mb-2 text-xl font-semibold">
                    Librarian Staff
                  </h2>
                  <p className="text-lg font-semibold">Mr. Sandip Patil</p>
                  <p className="text-lg">Email: sandipp@sies.edu.in</p>
                  <p className="mt-2 text-lg font-semibold">Mr. Sachin Gurav</p>
                  <p className="text-lg">Email: sachingurav@rediff.com</p>
                  <p className="mt-2 text-lg">Tel: +91 22 6108 2455</p>
                  <p className="mt-2 text-lg font-semibold">
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
