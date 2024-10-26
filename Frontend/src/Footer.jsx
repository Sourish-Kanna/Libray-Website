import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'; 
import Sies_logo from './assets/sies_logo_footer.png';
import { NavLink, Link } from 'react-router-dom';

const activeClassName = 'text-[#f26d21]';
const inactiveClassName = "text-white hover:text-gray-300";

// Sections and Links Data
const sections = [
  {
    title: 'E-Resources',
    links: [
      { name: 'Question Papers', path: '/quicklinks#pyq' },
      { name: 'OER', path: '/academics' },
      { name: 'DELNET', path: '/academics#university-syllabus' },
      { name: 'IEEE', path: '/academics#academic-calender' },
      { name: 'OPAC', path: '/academics#competitive-exams' }
    ]
  },
  {
    title: 'About Us',
    links: [
      { name: 'Library Hours', path: '/about#library-hours' },
      { name: 'Library Rules', path: '/about#library-rules' },
      { name: 'Library Staffs', path: '/about#library-staffs' },
      { name: 'FAQs', path: '/about#faqs' }
    ]
  },
  {
    title: 'Others',
    links: [
      { name: 'Donate Books', path: '/donate-books' },
      { name: 'Suggest Books', path: '/suggest-books' },
      { name: 'Book Bank', path: '/others#book-bank' },
      { name: 'Feedback', path: '/others#feedback' },
      { name: 'Facilities', path: '/about#facilities' },
      { name: 'Infrastructure', path: '/about#infrastructure' }
    ]
  }
];

const socialIcons = [
  { icon: faInstagram, link: "https://instagram.com" },
  { icon: faFacebook, link: "https://facebook.com" },
  { icon: faLinkedin, link: "https://linkedin.com" },
  { icon: faYoutube, link: "https://youtube.com" }
];

function Footer() {

  return (
    <div className="py-12 bg-[#014ca1] overflow-x-hidden">
      <div className="px-6 lg:mx-44">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full">
          <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0">
            <img src={Sies_logo} alt="SIES Logo" className="h-full" />
            <div className="flex space-x-6">
              {socialIcons.map((social, index) => (
                <a key={index} href={social.link} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon 
                    className="text-3xl p-3 lg:text-4xl text-white hover:text-[#f26d21] duration-700" 
                    icon={social.icon} 
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Render sections dynamically */}
          <div className="grid grid-cols-1 gap-8 lg:gap-16 lg:flex lg:space-x-16">
            {sections.map((section, index) => (
              <div key={index} className="py-6">
                <NavLink to={`/${section.title.toLowerCase()}`} className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName}`}>
                  <p className="mb-4 font-serif font-bold text-center lg:text-left">{section.title}</p>
                </NavLink>
                <ul className="font-serif space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <Link key={linkIndex} to={link.path}>
                      <li>
                        <p className={`${inactiveClassName} text-center lg:text-left cursor-pointer`}>{link.name}</p>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-6 space-y-2">
        <p className="text-sm text-gray-400">Developed by Students of SIES GST</p>
        <p className="text-sm text-gray-400">© SIES Graduate School Of Technology. All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
