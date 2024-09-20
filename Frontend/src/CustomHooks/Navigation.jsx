import { useEffect, useRef } from 'react';
import { NavLink,useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// for navigation
const StyledNavLink = ({ to, text, drop_link, drop_name}) => {

    const activeClassName = 'text-[#f26d21]';
    const inactiveClassName = 'text-[#014da1] hover:text-blue-400';

    return (
      <li className='text-[#014da1] group relative cursor-pointer font-medium text-xl m-8'>
        <NavLink 
        to={to}
        className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName}`}>
        {text}
            <FontAwesomeIcon icon="fa-solid fa-caret-down" className='px-1.5'/>
        </NavLink>
        <StyledDropdown to={drop_link} text={drop_name}/>
    </li>
    );
}

const StyledDropdown = ({ to, text})=> {

    const Display_name = text;
    const Route =  to;
        
    return (
        <div className='absolute hidden bg-transparent group-hover:block w-52 top-8 -left-14'>
            <div className='absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 
            border-b-8 border-transparent border-b-[#f26d21]'></div>
            <ul className='bg-gray-300'>
            {Display_name.map((item, index) => (
                <li key={index} className='py-3 pl-2 border-b-2 hover:bg-gray-200'>
                    <CustomLink link={Route[index]} name={item}/>
                </li>
            ))}
            </ul>
        </div>
    );
}

const CustomLink = ({name, link}) => {

    if (link.startsWith('/')) {
      return <NavLink to={link}>{name}</NavLink>;
    } else {
      return <a href={link} target="_blank" rel="noopener noreferrer">{name}</a>;
    }
};

// navigation inside the page
const useScrollToHash = (sections) => {
const refs = sections.reduce((acc, section) => {
    acc[section] = useRef(null);
    return acc;
}, {});

const location = useLocation();

useEffect(() => {
    const hash = location.hash;
    if (hash && refs[hash.replace('#', '')]?.current) {
    refs[hash.replace('#', '')].current.scrollIntoView({ behavior: 'smooth' });
    }
}, [location, refs]);

return refs;
};

export { StyledNavLink, StyledDropdown, CustomLink, useScrollToHash };