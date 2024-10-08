import { useState } from 'react'
import '../css/form.css'
import {useScrollToHash, useSmoothScroll} from '../Navigation'
import usePyqsStore from '../Store/pyqs.store';
import axios from 'axios';

const branchOptions = [
    { value: "choose", text: "Choose Branch" },
    { value: "Computer Engineering"  , text: "Computer Engineering"   },
    { value: "Electronics and Telecommunication", text: "Electronics and Telecommunication" },
    { value: "Electronics and Computer Science"  , text: "Electronics and Computer Science"   },
    { value: "Information Technology", text: "Information Technology" },
    { value: "CS IOT" , text: "CS IOT"  },
    { value: "First Year Engineering" , text: "First Year Engineering"  },
    { value: "AIML", text: "AIML" },
    { value: "AIDS", text: "AIDS" },
];

const semesterOptions = [
    { value: "choose", text: "Choose Semester" },
    { value: "SEM 1", text: "SEM 1" },
    { value: "SEM 2", text: "SEM 2" },
    { value: "SEM 3", text: "SEM 3" },
    { value: "SEM 4", text: "SEM 4" },
    { value: "SEM 5", text: "SEM 5" },
    { value: "SEM 6", text: "SEM 6" },
    { value: "SEM 7", text: "SEM 7" },
    { value: "SEM 8", text: "SEM 8" },
];

const subjectOptions = {
    "AIDS": {
        "SEM 1": ["AIDS Sem1 Sub1", "AIDS Sem1 Sub2", "AIDS Sem1 Sub3", "AIDS Sem1 Sub4", "AIDS Sem1 Sub5"],
        "SEM 2": ["AIDS Sem2 Sub1", "AIDS Sem2 Sub2", "AIDS Sem2 Sub3", "AIDS Sem2 Sub4", "AIDS Sem2 Sub5"],
        "SEM 3": ["AIDS Sem3 Sub1", "AIDS Sem3 Sub2", "AIDS Sem3 Sub3", "AIDS Sem3 Sub4", "AIDS Sem3 Sub5"],
        "SEM 4": ["AIDS Sem4 Sub1", "AIDS Sem4 Sub2", "AIDS Sem4 Sub3", "AIDS Sem4 Sub4", "AIDS Sem4 Sub5"],
        "SEM 5": ["AIDS Sem5 Sub1", "AIDS Sem5 Sub2", "AIDS Sem5 Sub3", "AIDS Sem5 Sub4", "AIDS Sem5 Sub5"],
        "SEM 6": ["AIDS Sem6 Sub1", "AIDS Sem6 Sub2", "AIDS Sem6 Sub3", "AIDS Sem6 Sub4", "AIDS Sem6 Sub5"],
        "SEM 7": ["AIDS Sem7 Sub1", "AIDS Sem7 Sub2", "AIDS Sem7 Sub3", "AIDS Sem7 Sub4", "AIDS Sem7 Sub5"],
        "SEM 8": ["AIDS Sem8 Sub1", "AIDS Sem8 Sub2", "AIDS Sem8 Sub3", "AIDS Sem8 Sub4", "AIDS Sem8 Sub5"],
        
    },
    "Computer Engineering": {
        "SEM 1": ["Comp  Sem1 Sub1", "Comp  Sem1 Sub2", "Comp  Sem1 Sub3", "Comp  Sem1 Sub4", "Comp  Sem1 Sub5"],
        "SEM 2": ["Comp  Sem2 Sub1", "Comp  Sem2 Sub2", "Comp  Sem2 Sub3", "Comp  Sem2 Sub4", "Comp  Sem2 Sub5"],
        "SEM 3": ["Comp  Sem3 Sub1", "Comp  Sem3 Sub2", "Comp  Sem3 Sub3", "Comp  Sem3 Sub4", "Comp  Sem3 Sub5"],
        "SEM 4": ["Comp  Sem4 Sub1", "Comp  Sem4 Sub2", "Comp  Sem4 Sub3", "Comp  Sem4 Sub4", "Comp  Sem4 Sub5"],
        "SEM 5": ["Comp  Sem5 Sub1", "Comp  Sem5 Sub2", "Comp  Sem5 Sub3", "Comp  Sem5 Sub4", "Comp  Sem5 Sub5"],
        "SEM 6": ["Comp  Sem6 Sub1", "Comp  Sem6 Sub2", "Comp  Sem6 Sub3", "Comp  Sem6 Sub4", "Comp  Sem6 Sub5"],
        "SEM 7": ["Comp  Sem7 Sub1", "Comp  Sem7 Sub2", "Comp  Sem7 Sub3", "Comp  Sem7 Sub4", "Comp  Sem7 Sub5"],
        "SEM 8": ["Comp  Sem8 Sub1", "Comp  Sem8 Sub2", "Comp  Sem8 Sub3", "Comp  Sem8 Sub4", "Comp  Sem8 Sub5"],
    
    },
    "Electronics and Telecommunication": {
        "SEM 1": ["EXTC Sem1 Sub1", "EXTC Sem1 Sub2", "EXTC Sem1 Sub3", "EXTC Sem1 Sub4", "EXTC Sem1 Sub5"],
        "SEM 2": ["EXTC Sem2 Sub1", "EXTC Sem2 Sub2", "EXTC Sem2 Sub3", "EXTC Sem2 Sub4", "EXTC Sem2 Sub5"],
        "SEM 3": ["EXTC Sem3 Sub1", "EXTC Sem3 Sub2", "EXTC Sem3 Sub3", "EXTC Sem3 Sub4", "EXTC Sem3 Sub5"],
        "SEM 4": ["EXTC Sem4 Sub1", "EXTC Sem4 Sub2", "EXTC Sem4 Sub3", "EXTC Sem4 Sub4", "EXTC Sem4 Sub5"],
        "SEM 5": ["EXTC Sem5 Sub1", "EXTC Sem5 Sub2", "EXTC Sem5 Sub3", "EXTC Sem5 Sub4", "EXTC Sem5 Sub5"],
        "SEM 6": ["EXTC Sem6 Sub1", "EXTC Sem6 Sub2", "EXTC Sem6 Sub3", "EXTC Sem6 Sub4", "EXTC Sem6 Sub5"],
        "SEM 7": ["EXTC Sem7 Sub1", "EXTC Sem7 Sub2", "EXTC Sem7 Sub3", "EXTC Sem7 Sub4", "EXTC Sem7 Sub5"],
        "SEM 8": ["EXTC Sem8 Sub1", "EXTC Sem8 Sub2", "EXTC Sem8 Sub3", "EXTC Sem8 Sub4", "EXTC Sem8 Sub5"],
    
    },
    "Electronics and Computer Science": {
        "SEM 1": ["ECS Sem1 Sub1", "ECS Sem1 Sub2", "ECS Sem1 Sub3", "ECS Sem1 Sub4", "ECS Sem1 Sub5"],
        "SEM 2": ["ECS Sem2 Sub1", "ECS Sem2 Sub2", "ECS Sem2 Sub3", "ECS Sem2 Sub4", "ECS Sem2 Sub5"],
        "SEM 3": ["ECS Sem3 Sub1", "ECS Sem3 Sub2", "ECS Sem3 Sub3", "ECS Sem3 Sub4", "ECS Sem3 Sub5"],
        "SEM 4": ["ECS Sem4 Sub1", "ECS Sem4 Sub2", "ECS Sem4 Sub3", "ECS Sem4 Sub4", "ECS Sem4 Sub5"],
        "SEM 5": ["dbms", "ECS Sem5 Sub2", "ECS Sem5 Sub3", "ECS Sem5 Sub4", "ECS Sem5 Sub5"],
        "SEM 6": ["dbms", "ECS Sem6 Sub2", "ECS Sem6 Sub3", "ECS Sem6 Sub4", "ECS Sem6 Sub5"],
        "SEM 7": ["ECS Sem7 Sub1", "ECS Sem7 Sub2", "ECS Sem7 Sub3", "ECS Sem7 Sub4", "ECS Sem7 Sub5"],
        "SEM 8": ["ECS Sem8 Sub1", "ECS Sem8 Sub2", "ECS Sem8 Sub3", "ECS Sem8 Sub4", "ECS Sem8 Sub5"],
    
    },
    "Information Technology": {
        "SEM 1": ["IT Sem1 Sub1", "IT Sem1 Sub2", "IT Sem1 Sub3", "IT Sem1 Sub4", "IT Sem1 Sub5"],
        "SEM 2": ["IT Sem2 Sub1", "IT Sem2 Sub2", "IT Sem2 Sub3", "IT Sem2 Sub4", "IT Sem2 Sub5"],
        "SEM 3": ["IT Sem3 Sub1", "IT Sem3 Sub2", "IT Sem3 Sub3", "IT Sem3 Sub4", "IT Sem3 Sub5"],
        "SEM 4": ["IT Sem4 Sub1", "IT Sem4 Sub2", "IT Sem4 Sub3", "IT Sem4 Sub4", "IT Sem4 Sub5"],
        "SEM 5": ["IT Sem5 Sub1", "IT Sem5 Sub2", "IT Sem5 Sub3", "IT Sem5 Sub4", "IT Sem5 Sub5"],
        "SEM 6": ["IT Sem6 Sub1", "IT Sem6 Sub2", "IT Sem6 Sub3", "IT Sem6 Sub4", "IT Sem6 Sub5"],
        "SEM 7": ["IT Sem7 Sub1", "IT Sem7 Sub2", "IT Sem7 Sub3", "IT Sem7 Sub4", "IT Sem7 Sub5"],
        "SEM 8": ["IT Sem8 Sub1", "IT Sem8 Sub2", "IT Sem8 Sub3", "IT Sem8 Sub4", "IT Sem8 Sub5"],
    
    },
    "AIML": {
        "SEM 1": ["AIML Sem1 Sub1", "AIML Sem1 Sub2", "AIML Sem1 Sub3", "AIML Sem1 Sub4", "AIML Sem1 Sub5"],
        "SEM 2": ["AIML Sem2 Sub1", "AIML Sem2 Sub2", "AIML Sem2 Sub3", "AIML Sem2 Sub4", "AIML Sem2 Sub5"],
        "SEM 3": ["AIML Sem3 Sub1", "AIML Sem3 Sub2", "AIML Sem3 Sub3", "AIML Sem3 Sub4", "AIML Sem3 Sub5"],
        "SEM 4": ["AIML Sem4 Sub1", "AIML Sem4 Sub2", "AIML Sem4 Sub3", "AIML Sem4 Sub4", "AIML Sem4 Sub5"],
        "SEM 5": ["AIML Sem5 Sub1", "AIML Sem5 Sub2", "AIML Sem5 Sub3", "AIML Sem5 Sub4", "AIML Sem5 Sub5"],
        "SEM 6": ["AIML Sem6 Sub1", "AIML Sem6 Sub2", "AIML Sem6 Sub3", "AIML Sem6 Sub4", "AIML Sem6 Sub5"],
        "SEM 7": ["AIML Sem7 Sub1", "AIML Sem7 Sub2", "AIML Sem7 Sub3", "AIML Sem7 Sub4", "AIML Sem7 Sub5"],
        "SEM 8": ["AIML Sem8 Sub1", "AIML Sem8 Sub2", "AIML Sem8 Sub3", "AIML Sem8 Sub4", "AIML Sem8 Sub5"],
    
    },
    "CS IOT": {
        "SEM 1": ["IOT Sem1 Sub1", "IOT Sem1 Sub2", "IOT Sem1 Sub3", "IOT Sem1 Sub4", "IOT Sem1 Sub5"],
        "SEM 2": ["IOT Sem2 Sub1", "IOT Sem2 Sub2", "IOT Sem2 Sub3", "IOT Sem2 Sub4", "IOT Sem2 Sub5"],
        "SEM 3": ["IOT Sem3 Sub1", "IOT Sem3 Sub2", "IOT Sem3 Sub3", "IOT Sem3 Sub4", "IOT Sem3 Sub5"],
        "SEM 4": ["IOT Sem4 Sub1", "IOT Sem4 Sub2", "IOT Sem4 Sub3", "IOT Sem4 Sub4", "IOT Sem4 Sub5"],
        "SEM 5": ["IOT Sem5 Sub1", "IOT Sem5 Sub2", "IOT Sem5 Sub3", "IOT Sem5 Sub4", "IOT Sem5 Sub5"],
        "SEM 6": ["IOT Sem6 Sub1", "IOT Sem6 Sub2", "IOT Sem6 Sub3", "IOT Sem6 Sub4", "IOT Sem6 Sub5"],
        "SEM 7": ["IOT Sem7 Sub1", "IOT Sem7 Sub2", "IOT Sem7 Sub3", "IOT Sem7 Sub4", "IOT Sem7 Sub5"],
        "SEM 8": ["IOT Sem8 Sub1", "IOT Sem8 Sub2", "IOT Sem8 Sub3", "IOT Sem8 Sub4", "IOT Sem8 Sub5"],
    
    },
    "First Year Engineering":{
        "SEM 1": ["FE Sem1 Sub1", "FE Sem1 Sub2", "FE Sem1 Sub3", "FE Sem1 Sub4", "FE Sem1 Sub5"],
        "SEM 2": ["FE Sem2 Sub1", "FE Sem2 Sub2", "FE Sem2 Sub3", "FE Sem2 Sub4", "FE Sem2 Sub5"], 
    }
    
};

// const yearOptions = [
//     "2019 May", "2019 November", "2020 May", "2020 November",
//     "2021 May", "2021 November", "2022 May", "2022 November",
//     "2023 May", "2023 November", "2024 May", "2024 November"
// ];

const yearOptions = [
    { value: "2019", text: "2019" },
    { value: "2020", text: "2020" },
    { value: "2021", text: "2021" },
    { value: "2022", text: "2022" },
    { value: "2023", text: "2023" },
    { value: "2024", text: "2024" },
];

const monthOptions = [
    { value: "May", text: "May" },
    { value: "November", text: "November" },
];
// const Scholarship = "https://scholarships.gov.in/"
// const Research_fund = "https://www.aicte-india.org/opportunities/students/research-funds"

function Quicklinks() {
    useSmoothScroll();
    useScrollToHash(['pyq', 'lib-brochure', "more"]);

// Extract state and actions from the store
const {
    branch,
    semester,
    subject,
    year,
    month,
    loading,
    error,
    setBranch,
    setSemester,
    setSubject,
    setYear,
    setMonth,
    fetchPYQ,
    downloadPYQ,
} = usePyqsStore();

const handleBranchChange = (e) => {
    const selectedBranch = e.target.value;
    console.log("Branch changed to:", selectedBranch); // Debug
    setBranch(e.target.value);
    setSemester("choose");
    setSubject("choose");
};

const handleSemesterChange = (e) => {
    const selectedSemester = e.target.value;
    console.log("Semester changed to:", selectedSemester); // Debug
    setSemester(e.target.value);
    setSubject("choose");
};

const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    console.log("Subject changed to:", selectedSubject); // Debug
    setSubject(e.target.value);
};

const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    console.log("Year changed to:", selectedYear); // Debug
    setYear(e.target.value);
};

const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    console.log("Month changed to:", selectedMonth); // Debug
    setMonth(e.target.value);
};

const availableSubjects = subjectOptions[branch]?.[semester] || [];

const isSubmitDisabled =
    branch === "choose" ||
    semester === "choose" ||
    subject === "choose" ||
    year === "choose" ||
    month === "choose" ||
    loading;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const pyqData = await fetchPYQ();
            if (pyqData && pyqData._id) { // Assuming the PYQ data contains an 'id' field
    
                const response = await downloadPYQ(pyqData._id);
    
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
    
                const contentDisposition = response.headers['content-disposition'];
                let fileName = 'pyq.pdf';
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
                    if (fileNameMatch && fileNameMatch.length === 2) {
                        fileName = fileNameMatch[1];
                    }
                }
    
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
                console.log("Download initiated");
            } else {
                console.log("PYQ Data is undefined or missing 'id'");
            }
        } catch (err) {
            console.error("Error fetching or downloading PYQ:", err);
        }
    };
    

return (
    <form className="form-container mt-50" onSubmit={handleSubmit}>
        <label htmlFor="branch">Branch:</label>
        <select id="branch" value={branch} onChange={handleBranchChange}>
        {branchOptions.map(option => (
            <option key={option.value} value={option.value}>
            {option.text}
            </option>
        ))}
        </select>

        <label htmlFor="semester">Semester:</label>
        <select
        id="semester"
        value={semester}
        onChange={handleSemesterChange}
        disabled={branch === "choose"}
        >
        {semesterOptions.map(option => (
            <option key={option.value} value={option.value}>
            {option.text}
            </option>
        ))}
        </select>

        <label htmlFor="subject">Subject:</label>
        <select
        id="subject"
        value={subject}
        onChange={handleSubjectChange}
        disabled={semester === "choose"}
        >
        {availableSubjects.length > 0 ? (
            availableSubjects.map((subj, index) => (
            <option key={index} value={subj}>
                {subj}
            </option>
            ))
        ) : (
            <option value="">No subjects available</option>
        )}
        </select>

        <label htmlFor="year">Year:</label>
        <select id="year" value={year} onChange={handleYearChange}>
        <option value="choose">Choose Year</option>
        {yearOptions.map(option => (
            <option key={option.value} value={option.value}>
            {option.text}
            </option>
        ))}
        </select>

        <label htmlFor="month">Month:</label>
        <select id="month" value={month} onChange={handleMonthChange}>
        <option value="choose">Choose Month</option>
        {monthOptions.map(option => (
            <option key={option.value} value={option.value}>
            {option.text}
            </option>
        ))}
        </select>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={isSubmitDisabled}>
        {loading ? 'Submitting...' : 'Submit'}
        </button>
    </form>
);
}

export default Quicklinks;