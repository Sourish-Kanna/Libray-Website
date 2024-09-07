import Sies_logo from './assets/sies_logo.png'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function StyledNavLink(props) {
    const { to, text, drop_link, drop_name} = props;
  
    const activeClassName = 'text-[#f26d21]';
    const inactiveClassName = 'text-[#014da1] hover:text-blue-400';
  
    return (
      <li className='text-[#014da1] cursor-pointer font-medium text-xl relative group p-8'>
        <NavLink to={to}
          className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName}`}>
        {`${text}`}<FontAwesomeIcon icon="fa-solid fa-caret-down" />
        </NavLink>
        <StyledDropdown to={`${drop_link}`} text={`${drop_name}`}/>
      </li>
    );
}
  
function CustomLink(props) {
    const { name, link } = props;
  
    if (link.startsWith('/')) {
      return <NavLink to={link}>{name}</NavLink>;
    } else {
      return <a href={link} target="_blank" rel="noopener noreferrer">{name}</a>;
    }
}

function StyledDropdown(props) {
    const { to, text} = props;

    const Display_name = JSON.parse(text)
    const Route =  JSON.parse(to)
        
    return (
      <div className='hidden group-hover:block absolute bg-[#efefef] w-52 mt-4 -left-11'>
        <div className='absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#f26d21]'></div>
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

const Scholarship = "https://scholarships.gov.in/"
const Research_fund = "https://www.aicte-india.org/opportunities/students/research-funds"

function NavBar() {
  return (
    <div className='fixed top-0 z-20 flex w-full px-40 h-28 bg-Navbg'>
        <div className='py-2'>
            <img src={Sies_logo}alt="" />
        </div>

        <div className='mr-40 ml-80'></div>
    
        <div className='flex-col justify-around w-4/5 h-full '>
            <ul className='flex justify-between font-serif'>

                <li className='pt-10 text-[#014da1] cursor-pointer font-medium text-xl h-full '><NavLink to='' className={({ isActive }) => `${isActive ? 'text-[#f26d21]' : 'text-[#014da1] hover:text-blue-400'}`}>Home</NavLink></li>
                
                <StyledNavLink to="/about" text="About Us" 
                drop_link = {JSON.stringify(["/about#library-hours","/about#library-staffs","/about#facilities"] )}
                drop_name={JSON.stringify(["Library Hours","Library Staffs","Facilities"])}/>
                
                <StyledNavLink to="/academics" text="Academics" 
                drop_link = {JSON.stringify(["/academics#university-syllabus","/academics#academic-calender","/academics#competitive-exams"])}
                drop_name={JSON.stringify(["University Syllabus","Academic Calender","Competitive Exams"])}/>
                
                <StyledNavLink to="/quicklinks" text="Quick Links" 
                drop_link = {JSON.stringify(["/quicklinks","/quicklinks","/quicklinks","/quicklinks",Scholarship,Research_fund,"/quicklinks"])} 
                drop_name={JSON.stringify(["Question Banks","Plagiarism Tool","Donate Books","Suggest Books","Scholarships", "Research Funds", "Library Brochure"])}/>
                
                <StyledNavLink to="/others" text="Others" 
                drop_link = {JSON.stringify(["/others","/others","/others","/others","/others","/others"])}
                drop_name={JSON.stringify(["IEEE","DELNET","E-Books","Events","Contact Us","FeedBack"])}/>
            
            </ul>
        </div>
    </div>
  )
}

export default NavBar

// // import React from 'react'
// import Sies_logo from './assets/sies_logo.png'
// import {NavLink} from 'react-router-dom'
// // import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// function NavBar() {
//   return (
//     <div className='fixed top-0 z-20 flex w-full px-40 h-28 bg-Navbg'>
//         <div className=''>
//             <img className='fixed w-52 ' src={Sies_logo}alt="" />
//         </div>

        
//         <div className='flex-col justify-around w-9/12 h-full mr-40 ml-80'>        
            
//         {/* <div className='mt-5 -ml-20 text-xl bg-yellow-200'>
//             News
//         </div> */}
//                                                     {/* home */}
                                                                                    
//             <ul className='flex justify-between font-serif'>
//               <li className='pt-10 text-[#014da1] cursor-pointer
//                 font-medium text-xl h-full '>
//                     <NavLink 
//                         to='' 
//                         className={({ isActive }) => 
//                     `${isActive ? 'text-[#f26d21]' : 'text-[#014da1] hover:text-blue-400'} `
//                         }
//                     >
//                         Home
//                     </NavLink>

//               </li>
              
//                                                     {/* about us */}
                                                                                            
//               <li className=' p-6 text-[#014da1] cursor-pointer                   
//                 font-medium text-xl  relative group pt-10'>
//                         <NavLink to="/about" className={({ isActive }) =>`${isActive ? 'text-[#f26d21]' : 'text-[#014da1] hover:text-blue-400'}` }>
//                             About <FontAwesomeIcon icon="fa-solid fa-caret-down" />
//                         </NavLink>
//                         <div className='hidden group-hover:block absolute bg-[#efefef] w-52 mt-4   -left-11'>
//                         <div className='absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#f26d21]'></div>
//                             <ul className='bg-gray-300'>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>Library Hours</li>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>Facilities</li>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>Library Staffs</li>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>Rules&Guildlines</li>
//                             </ul>

//                         </div>
//               </li>
              
//                                                 {/* Academics */}
                  
//               <li className=' p-6 text-[#014da1] cursor-pointer
//                 font-medium text-xl   relative group  pt-10'>
//                         <NavLink to='/academics' className={({ isActive }) => `${isActive ? 'text-[#f26d21]' : 'text-[#014da1] hover:text-blue-400'}`} >
//                             Academics <FontAwesomeIcon icon="fa-solid fa-caret-down" />
//                         </NavLink>
//                         <div className='hidden group-hover:block absolute bg-[#efefef] w-52 mt-4  -left-5'>
//                         <div className='absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#f26d21]'></div>
//                             <ul className='bg-gray-300'>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>University Syllabus</li>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>Scholarship</li>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>Academic Calender</li>
//                                 {/* <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>Achievements</li> */}

//                             </ul>

//                         </div>
//               </li>
              
//                                                         {/* Quick Links */}
                                                                                                            
//               <li className=' p-6 text-[#014da1] cursor-pointer
//                 font-medium text-xl  relative group pt-10'>
//                         <NavLink to='/quicklinks' className={({ isActive }) => `${isActive ? 'text-[#f26d21]' : 'text-[#014da1] hover:text-blue-400'}`} >
//                             Quick Links <FontAwesomeIcon icon="fa-solid fa-caret-down" />
//                         </NavLink>
//                         <div className='hidden group-hover:block absolute bg-[#efefef] w-52 mt-4  -left-5'>
//                         <div className='absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#f26d21]'></div>
//                             <ul className='bg-gray-300'>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>Question Banks</li>
//                                 {/* <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>University Syllabus</li> */}
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>Plagiarism Tool</li>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>Donate Books</li>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>Suggest Books</li>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>Scholarships</li>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>Research Funds</li>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>Library Brochure</li>

//                             </ul>

//                         </div>
//               </li>
//               <li className=' p-6 text-[#014da1] cursor-pointer
//                 font-medium text-xl   relative group pt-10'>
//                         <NavLink to='/others' className={({ isActive }) => `${isActive ? 'text-[#f26d21]' : 'text-[#014da1] hover:text-blue-400'}`} >
//                           Others <FontAwesomeIcon icon="fa-solid fa-caret-down" />
//                         </NavLink>
//                         <div className='hidden group-hover:block absolute bg-[#efefef] w-52 mt-4  -left-8'>
//                         <div className='absolute left-24 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#f26d21]'></div>
//                             <ul className='text-xl bg-gray-300'>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>IEEE</li>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>DELNET</li>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>E-Books</li>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>Events</li>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>Contact Us</li>
//                                 <li className='py-3 pl-2 border-b-2 hover:bg-gray-200'>FeedBack</li>
//                             </ul>

//                         </div>
//               </li> 
//             </ul>
//         </div>
        
//     </div>
//   )
// }

// export default NavBar