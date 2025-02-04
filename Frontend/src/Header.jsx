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
    drop_link: ["/quicklinks#pyq", "/E-Resources", "/E-Resources#university-syllabus", "/E-Resources#academic-calender", "/E-Resources#competitive-exams"],
    drop_name: ["Question Papers", "OER", "DELNET", "IEEE", "OPAC"],
  },
  {
    to: "/about",
    text: "About Us",
    drop_link: ["/about#library-hours", "/about#library-hours", "/about#library-staffs", "/about#infrastructure"],
    drop_name: ["Library Hours", "Library Rules", "Library Staffs", "FAQs"],
  },
  {
    to: "/others",
    text: "Others",
    drop_link: ["/donate-books", "/suggest-books", "/others", "/others", "/about#facilities", "/about#infrastructure"],
    drop_name: ["Donate Books", "Suggest Books", "Book Bank", "Feedback", "Facilities", "Infrastructure"],
  },
];

const StyledNavLink = ({ to, text, drop_link, drop_name, isMobile }) => {
  if (isMobile) {
    return (
      <li className="text-s_blue group cursor-pointer font-medium text-2-Primary mt-8 flex items-center relative">
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
    <li className="text-s_blue group relative cursor-pointer font-medium text-Primary m-8 flex items-center">
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
    <div className="absolute hidden bg-transparent z-10 group-hover:block w-52 top-8 -left-14">
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-8 
        border-r-8 border-b-8 border-transparent border-b-s_orange"/>
      <ul className="bg-gray-300 text-center">
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
    <div className="ml-4 hidden group-hover:block fixed left-3/4 transform -translate-x-1/2 top-14 w-2/4 bg-header-color z-50 shadow-lg rounded-lg">
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
        <div className="hidden lg:flex-grow lg:flex items-center justify-between w-full mt-2 pl-48">
          <ul className="flex items-center justify-between w-full font-serif flex-nowrap">
            <li className="text-s_blue cursor-pointer font-medium text-Primary mr-4">
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

            <li className="text-s_blue cursor-pointer font-medium text-Primary mr-4">
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
                <div className="flex items-center w-full cursor-pointer bg-header-color rounded-full px-4 py-2 shadow-md  border-2 border-s_blue hover:border-s_orange transform transition duration-500 ease-in-out">
                  <span className={`${isAuthenticated ? "text-s_blue" : "text-orange-500"} font-medium mr-4 text-xl hover:active:text-[#f26d21] text-s_blue hover:text-s_orange active:text-s_orange_400" `}>
                    {isAuthenticated ? "Logout" : "Login"}
                  </span>
                  <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:cursor-pointer text-white text-lg">
                    <img
                      src={isAuthenticated && user?.avatar ? user.avatar : image1}
                      className="profile-image w-full h-full object-cover"
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
  <div className="lg:hidden fixed inset-0 z-30 flex">
    {/* Semi-transparent overlay */}
    <div
      className="fixed inset-0 bg-black bg-opacity-50"
      onClick={toggleMenu}
    ></div>

    {/* Mobile Menu */}
    <div className="fixed left-0 top-0 h-full w-1/2 bg-header-color z-40 overflow-y-auto">
      <ul className="flex flex-col items-center px-4 py-2 space-y-2">
        <li className="text-s_blue cursor-pointer font-medium text-2-Primary mt-8">
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

        <li className="text-s_blue cursor-pointer font-medium text-2-Primary mx-8">
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
            <div className="flex items-center w-full cursor-pointer bg-header-color rounded-full px-4 py-2 shadow-md  border-2 border-s_blue hover:border-s_orange transform transition duration-500 ease-in-out">
              <span className={`${isAuthenticated ? "text-s_blue" : "text-orange-500"} font-medium mr-4 text-xl hover:active:text-[#f26d21] text-s_blue hover:text-s_orange active:text-s_orange_400" `}>
                {isAuthenticated ? "Logout" : "Login"}
              </span>
              <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:cursor-pointer text-white text-lg">
                <img
                  src={isAuthenticated && user?.avatar ? user.avatar : image1}
                  className="profile-image w-full h-full object-cover"
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