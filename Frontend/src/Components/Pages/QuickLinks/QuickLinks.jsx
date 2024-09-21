import { useState } from 'react';
// import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../Books/Books.css'
import {useScrollToHash} from '../../../CustomHooks/Navigation'
import { useSmoothScroll } from '../../../CustomHooks/Navigation';

const createOption = (value, text) => {
    return (
      <option key={value} value={value}>
        {text}
      </option>
    );
};

const branchOptions = [
    { value: "choose", text: "Choose Branch" },
    { value: "CE"  , text: "CE"   },
    { value: "EXTC", text: "EXTC" },
    { value: "IT"  , text: "IT"   },
    { value: "MECH", text: "MECH" },
    { value: "IOT" , text: "IOT"  },
    { value: "ECS" , text: "ECS"  },
    { value: "AIML", text: "AIML" },
    { value: "AIDS", text: "AIDS" },
];

const semesterOptions = [
    { value: "choose", text: "Choose Semester" },
    { value: "Semester 1", text: "Semester 1" },
    { value: "Semester 2", text: "Semester 2" },
    { value: "Semester 3", text: "Semester 3" },
    { value: "Semester 4", text: "Semester 4" },
    { value: "Semester 5", text: "Semester 5" },
    { value: "Semester 6", text: "Semester 6" },
    { value: "Semester 7", text: "Semester 7" },
    { value: "Semester 8", text: "Semester 8" },
];

const Scholarship = "https://scholarships.gov.in/"
const Research_fund = "https://www.aicte-india.org/opportunities/students/research-funds"

export default function Quicklinks() {
    useSmoothScroll();
    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [showPYQs, setShowPYQs] = useState(false);
    const [generatedPYQLinks, setGeneratedPYQLinks] = useState([]); 

    const handleBranchChange = (event) => {
        setBranch(event.target.value);
    };

    const handleSemesterChange = (event) => {
        setSemester(event.target.value);
    };

    const generatePYQLinks = (branch, semester) => {
        // In a real-world scenario, this could come from a database or API
        const baseURL = "https://www.google.com/search?q=";
        
        const yearOptions = [
            "2019 May", "2019 November", "2020 May", "2020 November",
            "2021 May", "2021 November", "2022 May", "2022 November",
            "2023 May", "2023 November", "2024 May", "2024 November"
        ];
        
        // Create dummy links based on branch and semester
        return yearOptions.map((year, index) => ({
            name: `${year}`,
            url: `${baseURL}/${branch}/${semester}/${year.replace(' ', '-').toLowerCase()}`
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log([branch]);
        console.log([semester]);
        if (branch !== '' && semester !== '') {
            const links = generatePYQLinks(branch, semester);
            setGeneratedPYQLinks(links);
            setShowPYQs(true);
        } else {
            alert('Please select both Branch and Semester.');
        }
    };

    const refs=useScrollToHash(['pyq','lib-brochure',"more"]);
    
  return (
    
    <div className='font-serif mt-28 mb-28'>

        <div className='w-full h-48 bg-[#efefef] flex items-center justify-center'>
            <div >
                <div className='flex justify-center text-6xl font-bold text-[#014da1]'>
                    <p>Quick Links</p>
                </div>
                <div className=" border-b-4 mx-auto w-44 mt-2 border-red-600 mb-10"></div>
            </div>
        </div>

        {/* Question Papers (PYQs) */}

        <div className='mx-40' id='pyq' ref={refs['pyq']} >
            <div className='flex items-center justify-center w-full h-32'>
                <div>
                    <div className='flex justify-center text-4xl font-bold'>
                        <p>Pervious Year Questions</p>
                    </div>
                    <div className="mx-auto mt-2 mb-10 border-b-4 border-blue-700 w-56"></div>
                </div>
            </div>
            <div className="p-4 flex-col border bg-[#f3f2ed] rounded-2xl shadow-2xl w-3/4 h-auto mx-40 relative group duration-1000" >
                <div> 
                    <form id="pyq-form" onSubmit={handleSubmit}>
                        <div className="grid">
                            <label htmlFor="branch">Select Branch:</label>
                            <select id="branch" name="branch" value={branch} onChange={handleBranchChange}>
                                {branchOptions.map((option) => createOption(option.value, option.text))}
                            </select>

                            <label htmlFor="semester">Select Semester:</label>
                            <select id="semester" name="semester" value={semester} onChange={handleSemesterChange}>
                                {semesterOptions.map((option) => createOption(option.value, option.text))}
                            </select>
                        </div>
                        <input className='' type="submit" value="Search PYQs"></input>
                    </form>
                </div>
                { showPYQs && 
                    (<div className=''>
                        <h2>{branch} - {semester} PYQs</h2>
                        <div className="grid grid-cols-3 gap-0 auto-rows-min content-center 
                        mx-10 my-3 text-xl">
                            {generatedPYQLinks.map((link, index) => (
                                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" 
                                className="underline hover:text-[#f26d21] grid my-2"> 
                                {link.name}</a>
                            ))}
                        </div>
                    </div>)
                }
            </div>
        </div>
        
        {/* Library Brochure */}

        {/* <div className='mx-40' ref={refs['lib-brochure']}>

            <div className='flex items-center justify-center w-full h-40 mt-12'>
                <div>
                    <div className='flex justify-center text-4xl font-bold'>
                        <p>Library Brochure</p>
                    </div>
                    <div className="mx-auto mt-2 mb-10 border-b-4 border-blue-700 w-56"></div>
                </div>
            </div>
            <div className='p-4 flex-col border bg-[#f3f2ed] rounded-2xl shadow-2xl w-3/4 h-auto mx-40 relative group duration-1000'>
                <div className="grid grid-cols-3 gap-0 auto-rows-min content-center  mx-10 my-3 text-xl">
                    <a href='/donate-books' className='underline hover:text-[#f26d21] grid my-2'>Donate Books</a>
                    <a href='/suggest-books' className='underline hover:text-[#f26d21] grid my-2'>Suggest Books</a>
                    <a href= {Scholarship} className='underline hover:text-[#f26d21] grid my-2'>Scholarship Link</a>
                    <a href={Research_fund} className='underline hover:text-[#f26d21] grid my-2'>Reseach Fund</a>
                </div>
            </div>
        </div>
        {/* More links 

        <div className='mx-40' ref={refs['more']}>
            <div className='flex items-center justify-center w-full h-40 mt-12'>
                <div>
                    <div className='flex justify-center text-4xl font-bold'>
                        <p>More Links</p>
                    </div>
                    <div className="mx-auto mt-2 mb-10 border-b-4 border-blue-700 w-56"></div>
                </div>
            </div>
            <div className='p-4 flex-col border bg-[#f3f2ed] rounded-2xl shadow-2xl w-3/4 h-auto mx-40 relative group duration-1000'>
                <div className="grid grid-cols-3 gap-0 auto-rows-min content-center  mx-10 my-3 text-xl">
                    <a href='/donate-books' className='underline hover:text-[#f26d21] grid my-2'>Donate Books</a>
                    <a href='/suggest-books' className='underline hover:text-[#f26d21] grid my-2'>Suggest Books</a>
                    <a href= {Scholarship} className='underline hover:text-[#f26d21] grid my-2'>Scholarship Link</a>
                    <a href={Research_fund} className='underline hover:text-[#f26d21] grid my-2'>Reseach Fund</a>
                </div>
            </div>
        </div>

        */}
        
    </div>
  )
}
