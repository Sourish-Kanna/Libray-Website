import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'; 
import Sies_logo from './assets/sies_logo_footer.png';
import { NavLink, Link } from 'react-router-dom';

const activeClassName = 'text-[#f26d21]';
const inactiveClassName = "text-white hover:text-gray-300";

function Footer() {

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

  return (
    <div className="py-12 bg-[#014ca1] overflow-x-hidden ">
      <div className="mx-44">
        <div className="flex justify-between w-11/12">
          <div>
            <img className="w-56" src={Sies_logo} alt="SIES logo" />
            <div className="mt-10">
              {socialIcons.map((social, index) => (
                <a key={index} href={social.link} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon 
                    className="text-4xl mr-7 my-10 text-white hover:text-[#f26d21] duration-700" 
                    icon={social.icon} 
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Render sections dynamically */}
          {sections.map((section, index) => (
            <div key={index} className="py-6">
              <NavLink to={`/${section.title.toLowerCase()}`}
               className={({ isActive }) =>`${isActive ? activeClassName : inactiveClassName}`}>
                <h4 className="mb-4 font-serif font-bold cursor-pointer">{section.title}</h4>
              </NavLink>
              <ul className="font-serif">
                {section.links.map((link, linkIndex) => (
                  <Link key={linkIndex} to={link.path}>
                    <li>
                      <p className={`${inactiveClassName} cursor-pointer`}>{link.name}</p>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
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
