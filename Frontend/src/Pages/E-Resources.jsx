// import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useScrollToHash, useSmoothScroll } from '../Navigation.jsx';
// import React, { useRef } from 'react';
// import useSyllabusStore from '../Store/syllabus.store.js';
// import { Helmet } from 'react-helmet';

// const exams = [
//   {
//     title: 'UPSC',
//     description: 'UPSC conducts the Civil Services Examination for recruitment to various Indian Administrative Service (IAS) and other top civil services.',
//     link: 'https://upsc.gov.in/',
//   },
//   {
//     title: 'GRE',
//     description: 'The GRE assesses readiness for graduate programs through verbal, quantitative, and analytical writing tests.',
//     link: 'https://www.ets.org/gre.html',
//   },
//   {
//     title: 'GATE',
//     description: 'GATE evaluates knowledge in engineering and science subjects for admissions to postgraduate programs and for various public sector job roles in India.',
//     link: 'http://gate.iitd.ac.in/',
//   },
//   {
//     title: 'SAT',
//     description: 'The SAT is a college admission test that assesses a student\'s readiness for higher education through math, reading, and writing sections.',
//     link: 'https://satsuite.collegeboard.org/sat',
//   },
//   {
//     title: 'TOEFL',
//     description: 'TOEFL measures English language proficiency for non-native speakers, assessing reading, writing, listening, and speaking skills for academic purposes.',
//     link: 'https://www.ets.org/toefl.html',
//   },
//   {
//     title: 'CAT',
//     description: 'The Common Admission Test (CAT) is an entrance exam for management programs, testing verbal, logical, and quantitative aptitude.',
//     link: 'https://iimcat.ac.in/',
//   },
//   {
//     title: 'IELTS',
//     description: 'IELTS assesses English language proficiency for education, work, or migration in English-speaking countries.',
//     link: 'https://www.ielts.org/',
//   },
//   {
//     title: 'JEE',
//     description: 'JEE is a competitive exam for engineering program admissions, assessing physics, chemistry, and math proficiency.',
//     link: 'https://jeemain.nta.nic.in/',
//   },
//   {
//     title: 'NEET',
//     description: 'NEET is an entrance exam for medical programs, assessing biology, chemistry, and physics knowledge.',
//     link: 'https://neet.nta.nic.in/',
//   },
// ];

// const universitySyllabusData = {
//   branches: [
//     { value: '', label: 'Select Branch' },
//     { value: 'Computer Engineering', label: 'Computer Engineering' },
//     { value: 'MECHANICAL', label: 'MECHANICAL' },
//     { value: 'AIDS', label: 'AIDS' },
//     { value: 'AIML', label: 'AIML' },
//     { value: 'IT', label: 'IT' },
//     { value: 'EXTC', label: 'EXTC' },
//     { value: 'Electronics and Computer Science', label: 'Electronics and Computer Science' },
//     { value: 'IOT', label: 'IOT' },
//   ],
//   semesters: [
//     { value: '', label: 'Select Semester' },
//     { value: 'SEM 1', label: 'SEM 1' },
//     { value: 'SEM 2', label: 'SEM 2' },
//     { value: 'SEM 3', label: 'SEM 3' },
//     { value: 'SEM 4', label: 'SEM 4' },
//     { value: 'SEM 5', label: 'SEM 5' },
//     { value: 'SEM 6', label: 'SEM 6' },
//     { value: 'SEM 7', label: 'SEM 7' },
//     { value: 'SEM 8', label: 'SEM 8' },
//   ],
// };

// const examComponent = (exam, index) => {
//   return (
//     <div key={index} className="relative group">
//       <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-500 shadow-xl rounded-xl">
//         <p className="text-white">{exam.title}</p>
//         <FontAwesomeIcon className="text-2xl text-s_orange" icon={faChevronDown} />
//       </div>
//       <div className="max-h-0 mb-5 overflow-hidden duration-700 shadow-xl group-hover:max-h-[500px] rounded-xl">
//         <div className="flex-col content-center mx-10 my-3 text-xl transition-all duration-700 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
//           <p className="py-2 text-lg">{exam.description}</p>
//           <p className="py-2 text-lg">
//             <a href={exam.link} target="_blank" rel="noopener noreferrer" className="text-s_orange underline">
//               Click here for more information
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function EResources() {
//   useSmoothScroll();
//   const refs = useScrollToHash(['university-syllabus', 'academic-calender', 'competitive-exam']);
//   const { branch, semester, setBranch, setSemester, fetchSyllabus, downloadSyllabus, 
//     syllabus, loading, error,} = useSyllabusStore();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await fetchSyllabus();
//   };

//   const handleDownload = async () => {
//     await downloadSyllabus();
//   };

//   return (
//     <div className="overflow-x-hidden w-full h-full">
//       <Helmet>
//         <title>E-Resources | Library | SIESGST</title>
//       </Helmet>

//       {/* E-Resources */}
//       <div className="bg-gray-100 flex items-center justify-center py-8 sm:py-12 md:py-16">
//         <div>
//           <div className="flex justify-center text-3xl sm:text-4xl md:text-5xl font-bold text-s_blue">
//             <p>E-Resources</p>
//           </div>
//           <div className="border-b-4 mx-auto w-20 sm:w-32 mt-2 border-s_orange" />
//         </div>
//       </div>

//       {/* University Syllabus */}
//       <div className="mx-4 sm:mx-16 md:mx-40 py-10">
//         <div className="flex items-center justify-center w-full py-6">
//           <div>
//             <div className="flex justify-center text-2xl sm:text-3xl font-bold">
//               <p>University Syllabus</p>
//             </div>
//             <div className="mx-auto mt-2 mb-6 border-b-4 border-blue-700 w-24 sm:w-32" />
//           </div>
//         </div>
//         <form
//           id="question-paper-form"
//           className="p-4 border bg-[#f3f2ed] rounded-2xl shadow-2xl w-full max-w-2xl mx-auto"
//           onSubmit={handleSubmit}
//         >
//           <div className="px-4 mb-4">
//             <label htmlFor="branch" className="block mb-2 text-base sm:text-lg font-bold text-gray-700">
//               Select Branch:
//             </label>
//             <select
//               id="branch"
//               name="branch"
//               value={branch}
//               onChange={(e) => setBranch(e.target.value)}
//               className="w-full p-3 border border-gray-400 rounded-md focus:border-blue-600 focus:ring-blue-600"
//             >
//               {universitySyllabusData.branches.map((branch) => (
//                 <option key={branch.value} value={branch.value}>
//                   {branch.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="px-4 mb-4">
//             <label htmlFor="semester" className="block mb-2 text-base sm:text-lg font-bold text-gray-700">
//               Select Semester:
//             </label>
//             <select
//               id="semester"
//               name="semester"
//               value={semester}
//               onChange={(e) => setSemester(e.target.value)}
//               className="w-full p-3 border border-gray-400 rounded-md focus:border-s_otext-s_orange focus:ring-s_otext-s_orange"
//             >
//               {universitySyllabusData.semesters.map((semester) => (
//                 <option key={semester.value} value={semester.value}>
//                   {semester.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {error && <div className="px-4 mb-4 text-red-500">{error}</div>}
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               id="download-btn"
//               className="px-4 py-2 mt-2 text-white rounded-md bg-s_orange w-36 sm:w-40 active:bg-[#fe8641]"
//               disabled={loading}
//             >
//               {loading ? 'Loading...' : 'Get Syllabus'}
//             </button>
//           </div>
//           {syllabus && (
//             <div className="px-4 mt-4 flex justify-center">
//               <button
//                 type="button"
//                 onClick={handleDownload}
//                 className="px-4 py-2 text-white rounded-md bg-blue-500 active:bg-blue-700"
//               >
//                 Click to Download
//               </button>
//             </div>
//           )}
//         </form>
//       </div>

//       {/* Competitive Exams */}
//       <div ref={refs['competitive-exams']} id="competitive-exams" className="mx-4 sm:mx-16 md:mx-40 py-10">
//         <div className="flex items-center justify-center w-full py-6">
//           <div>
//             <div className="flex justify-center text-2xl sm:text-3xl font-bold">
//               <p>Competitive Exams</p>
//             </div>
//           </div>
//         </div>
//         <div>
//           {exams.map((exam, index) => examComponent(exam, index))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useScrollToHash, useSmoothScroll } from "../Navigation";
import useSyllabusStore from "../Store/syllabus.store.js";
import useAuthStore from "../Store/userAuth.store.js";
import useBranchStore from "../Store/branch.store.js"; // Import branch store
import useSemesterStore from "../Store/semester.store.js"; // Import semester store
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function EResources() {
  const { isAuthenticated } = useAuthStore();
  const [file, setFile] = useState(null);

  // Zustand stores for branches and semesters
  const {
    branches,
    loading: branchLoading,
    error: branchError,
    fetchBranches,
    addBranch,
    updateBranch,
    deleteBranch,
  } = useBranchStore();

  const {
    semesters,
    loading: semesterLoading,
    error: semesterError,
    fetchSemesters,
    addSemester,
    updateSemester,
    deleteSemester,
  } = useSemesterStore();

  const {
    branch,
    semester,
    setBranch,
    setSemester,
    fetchSyllabus,
    downloadSyllabus,
    createSyllabus,
    updateSyllabus,
    deleteSyllabus,
    syllabus,
    loading: syllabusLoading,
    error: syllabusError,
  } = useSyllabusStore();

  useSmoothScroll();
  const refs = useScrollToHash([
    "university-syllabus",
    "academic-calender",
    "competitive-exam",
  ]);

  // Fetch branches and semesters on component mount
  useEffect(() => {
    fetchBranches();
    fetchSemesters();
  }, [fetchBranches, fetchSemesters]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchSyllabus();
      if (syllabus) {
        await downloadSyllabus();
        toast.success("Syllabus downloaded successfully!");
      } else {
        toast.error("No syllabus found for the selected branch and semester.");
      }
    } catch (err) {
      toast.error("Failed to fetch and download syllabus.");
    }
  };

  const handleAdd = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("branch", branch);
    formData.append("semester", semester);
    formData.append("syllabus", file);
    try {
      await createSyllabus(formData);
      toast.success("Syllabus added successfully!");
    } catch (err) {
      toast.error("Failed to add syllabus.");
    }
  };

  const handleUpdate = async () => {
    if (!file || !syllabus?._id) {
      alert("Please select a file and ensure a syllabus is loaded.");
      return;
    }
    const formData = new FormData();
    formData.append("branch", branch);
    formData.append("semester", semester);
    formData.append("syllabus", file);
    try {
      await updateSyllabus(syllabus._id, formData);
      toast.success("Syllabus updated successfully!");
    } catch (err) {
      toast.error("Failed to update syllabus.");
    }
  };

  const handleDelete = async () => {
    if (!syllabus?._id) {
      alert("No syllabus available to delete.");
      return;
    }
    try {
      await deleteSyllabus(syllabus._id);
      toast.success("Syllabus deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete syllabus.");
    }
  };

  // Add, edit, and delete branches
  const handleAddBranch = async (name) => {
    try {
      await addBranch(name);
      toast.success("Branch added successfully!");
    } catch (err) {
      toast.error("Failed to add branch.");
    }
  };

  const handleEditBranch = async (id, newName) => {
    try {
      await updateBranch(id, newName);
      toast.success("Branch updated successfully!");
    } catch (err) {
      toast.error("Failed to update branch.");
    }
  };

  const handleDeleteBranch = async () => {
    if (!branch) {
      toast.error("Please select a branch to delete.");
      return;
    }

    try {
      // Find the branch object from the branches array
      const branchToDelete = branches.find((b) => b.name === branch);
      if (!branchToDelete) {
        toast.error("Selected branch not found.");
        return;
      }

      // Call the deleteBranch function from the store
      await deleteBranch(branchToDelete._id);
      toast.success("Branch deleted successfully!");

      // Clear the selected branch after deletion
      setBranch("");
    } catch (err) {
      toast.error("Failed to delete branch.");
    }
  };

  // Add, edit, and delete semesters
  const handleAddSemester = async (name) => {
    try {
      await addSemester(name);
      toast.success("Semester added successfully!");
    } catch (err) {
      toast.error("Failed to add semester.");
    }
  };

  const handleEditSemester = async (id, newName) => {
    try {
      await updateSemester(id, newName);
      toast.success("Semester updated successfully!");
    } catch (err) {
      toast.error("Failed to update semester.");
    }
  };

  const handleDeleteSemester = async () => {
    if (!semester) {
      toast.error("Please select a semester to delete.");
      return;
    }

    try {
      // Find the semester object from the semesters array
      const semesterToDelete = semesters.find((s) => s.name === semester);
      if (!semesterToDelete) {
        toast.error("Selected semester not found.");
        return;
      }

      // Call the deleteSemester function from the store
      await deleteSemester(semesterToDelete._id);
      toast.success("Semester deleted successfully!");

      // Clear the selected semester after deletion
      setSemester("");
    } catch (err) {
      toast.error("Failed to delete semester.");
    }
  };

  return (
    <div className="font-serif mt-28">
      <Link to="/academics"></Link>
      <ToastContainer />

      <div className="w-full h-48 bg-[#efefef] flex items-center justify-center">
        <div>
          <div className="flex justify-center text-6xl font-bold text-[#014da1]">
            <p>Academics</p>
          </div>
          <div className="mx-auto mt-2 mb-10 border-b-4 border-red-600 w-44"></div>
        </div>
      </div>

      {/* University Syllabus */}
      <div
        className="mx-40"
        ref={refs["university-syllabus"]}
        id="university-syllabus"
      >
        <div className="flex items-center justify-center w-full h-40">
          <div>
            <div className="flex justify-center text-4xl font-bold ">
              <p>University Syllabus</p>
            </div>
            <div className="mx-auto mt-2 mb-10 border-b-4 border-blue-700 w-44"></div>
          </div>
        </div>
        <form
          id="question-paper-form"
          className="p-4 flex-col border bg-[#f3f2ed] rounded-2xl shadow-2xl w-3/4 h-auto mx-40"
          onSubmit={handleSubmit}
        >
          <div className="px-10 mb-4">
            <label
              htmlFor="branch"
              className="block mb-2 text-lg font-bold text-gray-700"
            >
              Select Branch:
            </label>
            <select
              id="branch"
              name="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full p-3.5 border border-gray-400 rounded-md focus:border-blue-600 focus:ring-blue-600"
            >
              <option value="">Select Branch</option>
              {branches.map((branchOption) => (
                <option key={branchOption._id} value={branchOption.name}>
                  {branchOption.name}
                </option>
              ))}
            </select>
            {isAuthenticated && (
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => handleAddBranch(prompt("Enter branch name:"))}
                  className="px-2 py-1 text-white bg-green-500 rounded-md"
                >
                  Add Branch
                </button>
                <button
                  type="button"
                  onClick={handleDeleteBranch}
                  className="px-2 py-1 text-white bg-red-500 rounded-md"
                >
                  Delete Selected Branch
                </button>
              </div>
            )}
          </div>
          <div className="px-10 mb-4">
            <label
              htmlFor="semester"
              className="block mb-2 text-lg font-bold text-gray-700"
            >
              Select Semester:
            </label>
            <select
              id="semester"
              name="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full p-3.5 border border-gray-400 rounded-md focus:border-[#f26d21] focus:ring-[#f26d21]"
            >
              <option value="">Select Semester</option>
              {semesters.map((semesterOption) => (
                <option key={semesterOption._id} value={semesterOption.name}>
                  {semesterOption.name}
                </option>
              ))}
            </select>
            {isAuthenticated && (
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() =>
                    handleAddSemester(prompt("Enter semester name:"))
                  }
                  className="px-2 py-1 text-white bg-green-500 rounded-md"
                >
                  Add Semester
                </button>
                <button
                  type="button"
                  onClick={handleDeleteSemester}
                  className="px-2 py-1 text-white bg-red-500 rounded-md"
                >
                  Delete Selected Semester
                </button>
              </div>
            )}
          </div>
          {syllabusError && (
            <div className="px-10 mb-4 text-red-500">{syllabusError}</div>
          )}
          {isAuthenticated && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="file"
                  className="block mb-2 text-lg font-bold text-gray-700"
                >
                  Upload File:
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full p-3.5 border border-gray-400 rounded-md"
                />
              </div>
              <div className="flex justify-center gap-4 mb-4">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="px-4 py-2 text-white rounded-md bg-green-500 active:bg-green-700"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="px-4 py-2 text-white rounded-md bg-blue-500 active:bg-blue-700"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 text-white rounded-md bg-red-500 active:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              id="download-btn"
              className="px-4 py-2 mt-2 text-white rounded-md bg-[#f26d21] w-50 active:bg-[#fe8641]"
              disabled={syllabusLoading}
            >
              {syllabusLoading ? "Loading..." : "Get Syllabus"}
            </button>
          </div>
        </form>
      </div>

      {/* Competitive Exam */}
      <div ref={refs["competitive-exams"]} id="competitive-exams">
        <div className="flex items-center justify-center w-full h-40">
          <div>
            <div className="flex justify-center text-4xl font-bold ">
              <p>Competitive Exams</p>
            </div>
          </div>
        </div>
        <div className="mx-40 ">
          <div className="relative group">
            <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-500 shadow-xl rounded-xl">
              <p className="text-white">UPSE</p>
              <FontAwesomeIcon
                className="text-2xl text-[#f26d21]"
                icon="fa-solid fa-chevron-down"
              />
            </div>
            <div className="h-0 mb-5 overflow-hidden duration-700 shadow-xl group-hover:h-28 rounded-xl">
              <div className="flex-col content-center mx-10 my-3 text-xl transition-all duration-700 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                <p className="py-2 text-lg">
                  UPSC conducts the Civil Services Examination for recruitment
                  to various Indian Administrative Service (IAS) and other top
                  civil services.
                </p>
                <p className="py-2 text-lg">
                  <a
                    href="https://upsc.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f26d21] underline "
                  >
                    {" "}
                    Click here for more information
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-500 shadow-xl rounded-xl">
              <p className="text-white">GRE</p>
              <FontAwesomeIcon
                className="text-2xl text-[#f26d21]"
                icon="fa-solid fa-chevron-down"
              />
            </div>
            <div className="h-0 mb-5 overflow-hidden duration-700 shadow-xl group-hover:h-28 rounded-xl">
              <div className="flex-col content-center mx-10 my-3 text-xl transition-all duration-700 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                <p className="py-2 text-lg">
                  The GRE assesses readiness for graduate programs through
                  verbal, quantitative, and analytical writing tests.
                </p>
                <p className="py-2 text-lg">
                  <a
                    href="https://www.ets.org/gre.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#f26d21]"
                  >
                    {" "}
                    Click here for more information
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-500 shadow-xl rounded-xl">
              <p className="text-white">GATE</p>
              <FontAwesomeIcon
                className="text-2xl text-[#f26d21]"
                icon="fa-solid fa-chevron-down"
              />
            </div>
            <div className="h-0 mb-5 overflow-hidden duration-700 shadow-xl group-hover:h-28 rounded-xl">
              <div className="flex-col content-center mx-10 my-3 text-xl transition-all duration-700 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                <p className="py-2 text-lg">
                  GATE evaluates knowledge in engineering and science subjects
                  for admissions to postgraduate programs and for various public
                  sector job roles in India.
                </p>
                <p className="py-2 text-lg">
                  <a
                    href="http://gate.iitd.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#f26d21]"
                  >
                    {" "}
                    Click here for more information
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-500 shadow-xl rounded-xl">
              <p className="text-white">SAT</p>
              <FontAwesomeIcon
                className="text-2xl text-[#f26d21]"
                icon="fa-solid fa-chevron-down"
              />
            </div>
            <div className="h-0 mb-5 overflow-hidden duration-700 shadow-xl group-hover:h-28 rounded-xl">
              <div className="flex-col content-center mx-10 my-3 text-xl transition-all duration-700 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                <p className="py-2 text-lg">
                  The SAT is a college admission test that assesses a student's
                  readiness for higher education through math, reading, and
                  writing sections.
                </p>
                <p className="py-2 text-lg">
                  <a
                    href="https://satsuite.collegeboard.org/sat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#f26d21]"
                  >
                    {" "}
                    Click here for more information
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="flex justify-between px-10 py-5 my-5 text-2xl duration-700 bg-blue-500 shadow-xl rounded-xl">
              <p className="text-white">TOFEL</p>
              <FontAwesomeIcon
                className="text-2xl text-[#f26d21]"
                icon="fa-solid fa-chevron-down"
              />
            </div>
            <div className="h-0 mb-5 overflow-hidden duration-700 shadow-xl group-hover:h-28 rounded-xl">
              <div className="flex-col content-center mx-10 my-3 text-xl transition-all duration-700 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                <p className="py-2 text-lg">
                  TOEFL measures English language proficiency for non-native
                  speakers, assessing reading, writing, listening, and speaking
                  skills for academic purposes.
                </p>
                <p className="py-2 text-lg">
                  <a
                    href="https://www.ets.org/toefl.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#f26d21]"
                  >
                    Click here for more information
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
