import {NavLink} from 'react-router-dom'
import { StyledNavLink } from './Navigation.jsx'
import { Link } from 'react-router-dom'
import Sies_logo from './assets/sies_logo_header.png'
import user from './assets/user_icon.png'


const Scholarship = "https://scholarships.gov.in/"
const Research_fund = "https://www.aicte-india.org/opportunities/students/research-funds"

function NavBar() {
    return (
      <div className='fixed top-0 z-20 flex w-full px-30 h-fit bg-Navbg'>

            <div className='flex-grow'>
                <img src={Sies_logo} alt="SIES Logo" className="h-28" />
            </div>

            <div className='flex-grow h-full mt-2'>
                <ul className='flex items-center justify-between w-full font-serif flex-nowrap'>
                    <li className='text-[#014da1] cursor-pointer font-medium text-xl m-8'>
                        <NavLink to='' className={({ isActive }) => `${isActive ? 'text-[#f26d21]' : 'text-[#014da1] hover:text-blue-400'}`}>Home</NavLink>
                    </li>
                    
                    <StyledNavLink 
                    to="/about" 
                    text="About Us" 
                    drop_link = {["/about#library-hours","/about#library-staffs","/about#facilities","/about#infrastructure"]}
                    drop_name={["Library Hours","Library Staffs","Facilities","Infrastructure"]}/>
                    
                    <StyledNavLink 
                    to="/academics" 
                    text="Academics" 
                    drop_link = {["/academics#university-syllabus","/academics#academic-calender","/academics#competitive-exams"]}
                    drop_name={["University Syllabus","Academic Calender","Competitive Exams"]}/>
                    
                    <StyledNavLink 
                    to="/quicklinks" 
                    text="Quick Links" 
                    drop_link = {["/quicklinks#pyq","/donate-books","/suggest-books",Scholarship,Research_fund,"/quicklinks#lib-brochure"]} 
                    drop_name={["PYQs","Donate Books","Suggest Books","Scholarships", "Research Funds", "Library Brochure"]}/>
                    
                    <StyledNavLink 
                    to="/others" 
                    text="Others" 
                    drop_link = {["/others","/others","/others","/others","/contactus","/others"]}
                    drop_name={["IEEE","DELNET","E-Books","Events","Contact Us","FeedBack"]}/>

                </ul>
            </div>
            <div className='flex align-center h-12 w-40 bg-orange-400 justify-center rounded-full mt-8 '>
                <Link to='/register'><p className='my-3 '>Register</p></Link>
            </div>
            
            <div className='flex items-center'>
                <img src={user} className='h-12 w-12 mb-4 mx-5 ' alt="" />
            </div>
            
        </div>
    )
}
  
export default NavBar