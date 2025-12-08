import { NavLink } from 'react-router-dom'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Sies_logo from './assets/Header/sies_logo_header.png'
import useAuthStore from './Store/userAuth.store.js';
import image1 from './assets/defaultUser.png'


const activeClassName = 'text-s_orange';
const inactiveClassName = 'text-s_blue hover:text-s_blue_400';
const navLinks = [
  {
    to: "/E-Resources",
    text: "E-Resources",
    drop_link: [
      "/quicklinks#pyq",
      "/E-Resources#university-syllabus",
      "/others#More",
      "https://ieeexplore.ieee.org/Xplore/home.jsp",
      "https://siesgstlibrary.ourlib.in",
      "https://discovery.delnet.in",
      "https://ebookcentral.proquest.com/auth/lib/siesmumbai/login.action?returnURL=https%3A%2F%2Febookcentral.proquest.com%2Flib%2Fsiesmumbai%2Fbookshelf.action",
      "https://ndl.education.gov.in/home",
    ],
    drop_name: [
      "Question Papers",
      "University Syllabus",
      "OER",
      "IEEE",
      "OPAC",
      "DELNET",
      "E-Books",
      "Rashtriya e Pustakalaya",
    ],
  },
  {
    to: "/about",
    text: "About Us",
    drop_link: [
      "/about#library-hours",
      "/others#FAQs",
      "/about#library-staffs",
      "/others#FAQs",
    ],
    drop_name: ["Library Hours", "Library Rules", "Library Staffs", "FAQs"],
  },
  {
    to: "/others",
    text: "Others",
    drop_link: [
      "/donate-books",
      "/suggest-books",
      "/contactus",
      "/about#facilities",
      "/about#infrastructure",
    ],
    drop_name: [
      "Donate Books",
      "Suggest Books",
      "Feedback",
      "Facilities",
      "Infrastructure",
    ],
  },
];

const StyledNavLink = ({ to, text, drop_link, drop_name, isMobile }) => {
  if (isMobile) {
    return (
      <li className="relative flex items-center mt-8 font-medium cursor-pointer text-s_blue group text-2-Primary">
        <NavLink
          to={to}
          className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName}`}>
          {text}
          <FontAwesomeIcon icon={faCaretDown} className="px-1.5" />
        </NavLink>
        <MobStyledDropdown
          to={drop_link}
          text={drop_name}
        />
      </li>
    );
  }
  return (
    <li className="relative flex items-center m-8 font-medium cursor-pointer text-s_blue group text-Primary">
      <NavLink
        to={to}
        className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName}`}>
        {text}
        <FontAwesomeIcon icon={faCaretDown} className="px-1.5" />
      </NavLink>
      <StyledDropdown to={drop_link} text={drop_name} />
    </li>
  );
};

const StyledDropdown = ({ to, text }) => {
  return (
    <div className="absolute z-10 hidden bg-transparent group-hover:block w-52 top-8 -left-14">
      <div className="absolute w-0 h-0 transform -translate-x-1/2 border-b-8 border-l-8 border-r-8 border-transparent left-1/2 -top-2 border-b-s_orange"/>
      <ul className="text-center bg-gray-300">
        {text.map((item, index) => (
          <li key={index} className="py-3 pl-2 border-b-2 hover:bg-gray-200">
            <CustomLink link={to[index]} name={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const MobStyledDropdown = ({ to, text }) => {
  return (
    <div className="fixed z-50 hidden w-2/4 ml-4 transform -translate-x-1/2 rounded-lg shadow-lg group-hover:block left-3/4 top-14 bg-header-color">
      <ul className="text-center">
        {text.map((item, index) => (
          <li key={index} className="py-3 pl-2 border-b-2 hover:bg-gray-200">
            <CustomLink link={to[index]} name={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const CustomLink = ({ name, link }) => {
  if (link.startsWith('/')) {
    return <NavLink to={link}>{name}</NavLink>;
  } else {
    return <a href={link} target="_blank" rel="noopener noreferrer">{name}</a>;
  }
};



function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { login, isLoading, error, isAuthenticated, user, logoutUser } = useAuthStore();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const submitHandler = () => {
    logoutUser();
  };

  return (
    <nav className="top-0 z-20 w-full h-fit bg-header-color bg-header-bg bg-top-header bg-cover-header">
      <div className="flex items-center justify-between px-4 lg:px-10 xl:px-30">
        <div className="flex items-center">
          <img src={Sies_logo} alt="SIES Logo" className="h-full" />
        </div>

        {/* Hamburger Icon (visible on small screens) */}
        <div className="flex items-center lg:hidden">
          <button onClick={toggleMenu} className="text-Primary text-s_blue">
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>

        {/* Desktop Menu (hidden on small screens) */}
        <div className="items-center justify-between hidden w-full pl-48 mt-2 lg:flex-grow lg:flex">
          <ul className="flex items-center justify-between w-full font-serif flex-nowrap">
            <li className="mr-4 font-medium cursor-pointer text-s_blue text-Primary">
              <NavLink to="" className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName}`}>
                Home
              </NavLink>
            </li>

            {navLinks.map((link, index) => (
              <StyledNavLink
                key={index}
                to={link.to}
                text={link.text}
                drop_link={link.drop_link}
                drop_name={link.drop_name}
                isMobile={false} />
            ))}

            <li className="mr-4 font-medium cursor-pointer text-s_blue text-Primary">
              <NavLink to="contactus" className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName}`}>
                Contact Us
              </NavLink>
            </li>

            <li>
              <NavLink
                to={isAuthenticated ? "#" : "Login"} // Prevent navigation when logging out
                onClick={isAuthenticated ? submitHandler : null} // Call logout if authenticated
                className={({ isActive }) =>
                  `${isActive ? activeClassName : inactiveClassName}`
                }
              >
                <div className="flex items-center w-full px-4 py-2 transition duration-500 ease-in-out transform border-2 rounded-full shadow-md cursor-pointer bg-header-color border-s_blue hover:border-s_orange">
                  <span className={`${isAuthenticated ? "text-s_blue" : "text-orange-500"} font-medium mr-4 text-xl hover:active:text-[#f26d21] text-s_blue hover:text-s_orange active:text-s_orange_400" `}>
                    {isAuthenticated ? "Logout" : "Login"}
                  </span>
                  <div className="flex items-center justify-center w-12 h-12 overflow-hidden text-lg text-white bg-gray-400 rounded-full hover:cursor-pointer">
                    <img
                      src={isAuthenticated && user?.avatar ? user.avatar : image1}
                      className="object-cover w-full h-full profile-image"
                      alt=""
                    />
                  </div>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu (only visible when the hamburger is open) */}
      {isOpen && (
  <div className="fixed inset-0 z-30 flex lg:hidden">
    {/* Semi-transparent overlay */}
    <div
      className="fixed inset-0 bg-black bg-opacity-50"
      onClick={toggleMenu}
    ></div>

    {/* Mobile Menu */}
    <div className="fixed top-0 left-0 z-40 w-1/2 h-full overflow-y-auto bg-header-color">
      <ul className="flex flex-col items-center px-4 py-2 space-y-2">
        <li className="mt-8 font-medium cursor-pointer text-s_blue text-2-Primary">
          <NavLink to="" className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName}`}>
            Home
          </NavLink>
        </li>

        {navLinks.map((link, index) => (
          <StyledNavLink
            key={index}
            to={link.to}
            text={link.text}
            drop_link={link.drop_link}
            drop_name={link.drop_name}
            isMobile={true} />
        ))}

        <li className="mx-8 font-medium cursor-pointer text-s_blue text-2-Primary">
          <NavLink to="contactus" className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName}`}>
            Contact Us
          </NavLink>
        </li>

        <li>
          {/* <NavLink
            to={isAuthenticated ? "#" : "Login"} // Prevent navigation when logging out
            onClick={isAuthenticated ? submitHandler : null} // Call logout if authenticated
            className={({ isActive }) =>
              `${isActive ? activeClassName : inactiveClassName}`
            }
          >
            <div className="flex items-center w-full px-4 py-2 transition duration-500 ease-in-out transform border-2 rounded-full shadow-md cursor-pointer bg-header-color border-s_blue hover:border-s_orange">
              <span className={`${isAuthenticated ? "text-s_blue" : "text-orange-500"} font-medium mr-4 text-xl hover:active:text-[#f26d21] text-s_blue hover:text-s_orange active:text-s_orange_400" `}>
                {isAuthenticated ? "Logout" : "Login"}
              </span>
              <div className="flex items-center justify-center w-12 h-12 overflow-hidden text-lg text-white bg-gray-400 rounded-full hover:cursor-pointer">
                <img
                  src={isAuthenticated && user?.avatar ? user.avatar : image1}
                  className="object-cover w-full h-full profile-image"
                  alt=""
                />
              </div>
            </div>
          </NavLink> */}
        </li>
      </ul>
    </div>
  </div>
)}
    </nav>
  );
}

export default NavBar;