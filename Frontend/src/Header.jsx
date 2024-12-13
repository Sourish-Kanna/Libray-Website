import { NavLink } from 'react-router-dom'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Sies_logo from './assets/Header/sies_logo_header.png'

const activeClassName = 'text-s_orange';
const inactiveClassName = 'text-s_blue hover:text-s_blue_400';
const navLinks = [
  {
    to: "/academics",
    text: "E-Resources",
    drop_link: ["/quicklinks#pyq", "/academics", "/academics#university-syllabus", "/academics#academic-calender", "/academics#competitive-exams"],
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

const StyledNavLink = ({ to, text, drop_link, drop_name, isMobile, toggleDropdown, index }) => {
    if (isMobile) {
        return (
            <li id={index} className="text-s_blue group cursor-pointer font-medium text-2-Primary mt-8 flex items-center">
              <NavLink
              to={to}
              className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName}`}
              onClick={() => toggleDropdown(index)}>
                {text}
                <FontAwesomeIcon icon="fa-solid fa-caret-down" className="px-1.5" />
              </NavLink>
                <MobStyledDropdown
                  to={drop_link}
                  text={drop_name}
                  isOpen={toggleDropdown[index]}
                  toggleDropdown={() => toggleDropdown(index)}
                />
              {!isMobile && <StyledDropdown to={drop_link} text={drop_name} />}
            </li>
          );
    }
  return (
    <li id={index} className="text-s_blue group relative cursor-pointer font-medium text-Primary m-8 flex items-center">
      <NavLink
        to={to}
        className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName}`}>
        {text}
        <FontAwesomeIcon icon="fa-solid fa-caret-down" className="px-1.5" />
      </NavLink>
      <StyledDropdown to={drop_link} text={drop_name} />
    </li>
  );
};

const StyledDropdown = ({ to, text }) => {
  return (
    <div className="absolute hidden bg-transparent group-hover:block w-52 top-8 -left-14">
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-s_orange"></div>
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

const MobStyledDropdown = ({ to, text, isOpen, toggleDropdown }) => {
    console.log(toggleDropdown)
    return (
      <div className={` ${isOpen ? 'block' : 'hidden'} bg-transparent w-52 top-8 -left-14`}>
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

const CustomLink = ({ name, link }) => {
  if (link.startsWith('/')) {
    return <NavLink to={link}>{name}</NavLink>;
  } else {
    return <a href={link} target="_blank" rel="noopener noreferrer">{name}</a>;
  }
};

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownState, setDropdownState] = useState(Array(navLinks.length).fill(false));

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (index) => {
    const newState = [...dropdownState];
    newState[index] = !newState[index];
    setDropdownState(newState);
  };

  return (
    <header className="top-0 z-20 w-full h-fit bg-header-color bg-header-bg bg-top-header bg-cover-header">
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
                isMobile={false}
                toggleDropdown={dropdownState}
                index={index}
              />
            ))}

            <li className="text-s_blue cursor-pointer font-medium text-Primary mr-4">
              <NavLink to="contactus" className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName}`}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu (only visible when the hamburger is open) */}
      {isOpen && (
        <div className="lg:hidden">
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
                isMobile={true}
                toggleDropdown={toggleDropdown} // Pass the function here
                index={index}
              />
            ))}

            <li className="text-s_blue cursor-pointer font-medium text-2-Primary mx-8">
              <NavLink to="contactus" className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName}`}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default NavBar;

{/* <div style="padding:0px float:left; width:100%; padding:10px 0px 10px 20px; text-align:center; border-bottom:1px solid #f26d21;" 
onclick="javascript:$('.mobile_submenus').hide(); $(this).children('div').show('slow');">
<a href="javascript:void(0);" class="menu_links">About</a>
<div id="mobile_menu_1" class="mobile_submenus" style="">
<div style="float:left; padding:15px 10px;  width:100%; text-align:left;">
<div style="padding:2px 0px;">
<a href="https://siesgst.edu.in/about-sies" style="color:#000; font-weight:500;">About SIES</a> 
<br>
</div>
<div style="padding:2px 0px;">
<a href="https://siesgst.edu.in/about-sies-gst" style="color:#000; font-weight:500;">About SIES GST</a> 
<br>
</div>
<div style="padding:2px 0px;">
<a href="https://siesgst.edu.in/message-hon-advisor" style="color:#000; font-weight:500;">Message from Hon. Advisor</a> 
<br>
</div>
<div style="padding:2px 0px;">
<a href="https://siesgst.edu.in/principals-desk" style="color:#000; font-weight:500;">From The Principal's Desk</a> 
<br>
</div>
<div style="padding:2px 0px;">
<a href="https://siesgst.edu.in/management" style="color:#000; font-weight:500;">Management</a> 
<br>
</div>
<div style="padding:2px 0px;">
<a href="images/Annual Report 2023-24.pdf" target="_blank" style="color:#000; font-weight:500;">Annual Report</a> 
<br>
</div>
<div style="padding:2px 0px;">
<a href="images/MANDATORY DISCLOSURE April 2023.pdf" target="_blank" style="color:#000; font-weight:500;">Mandatory Disclosure</a> 
<br>
</div>
<div style="padding:2px 0px;">
<a href="docs/Accreditional_Details.pdf" target="_blank" style="color:#000; font-weight:500;">Accreditation Details</a> 
<br>
</div>
<div style="padding:2px 0px;">
<a href="https://siesgst.edu.in/compliance-documents" style="color:#000; font-weight:500;">Compliance Documents</a> 
<br>
</div>
<div style="padding:2px 0px;">
<a href="https://siesgst.edu.in/administrative-staff" style="color:#000; font-weight:500;">Administrative Staff</a> 
<br>
</div>
<div style="padding:2px 0px;">
<a href="college-committee" target="_blank" style="color:#000; font-weight:500;">College Committees</a> 
<br>
</div>
</div>
</div>
</div> */}