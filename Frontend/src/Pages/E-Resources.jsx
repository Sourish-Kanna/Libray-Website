import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useScrollToHash, useSmoothScroll } from "../Navigation";
import useSyllabusStore from "../Store/syllabus.store.js";
import useAuthStore from "../Store/userAuth.store.js";
import useBranchStore from "../Store/branch.store.js";
import useSemesterStore from "../Store/semester.store.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from 'react-helmet';
import axios from "axios";

const exams = [
  {
    title: 'UPSC',
    description: 'UPSC conducts the Civil Services Examination for recruitment to various Indian Administrative Service (IAS) and other top civil services.',
    link: 'https://upsc.gov.in/',
  },
  {
    title: 'GRE',
    description: 'The GRE assesses readiness for graduate programs through verbal, quantitative, and analytical writing tests.',
    link: 'https://www.ets.org/gre.html',
  },
  {
    title: 'GATE',
    description: 'GATE evaluates knowledge in engineering and science subjects for admissions to postgraduate programs and for various public sector job roles in India.',
    link: 'http://gate.iitd.ac.in/',
  },
  {
    title: 'SAT',
    description: 'The SAT is a college admission test that assesses a student\'s readiness for higher education through math, reading, and writing sections.',
    link: 'https://satsuite.collegeboard.org/sat',
  },
  {
    title: 'TOEFL',
    description: 'TOEFL measures English language proficiency for non-native speakers, assessing reading, writing, listening, and speaking skills for academic purposes.',
    link: 'https://www.ets.org/toefl.html',
  },
  {
    title: 'CAT',
    description: 'The Common Admission Test (CAT) is an entrance exam for management programs, testing verbal, logical, and quantitative aptitude.',
    link: 'https://iimcat.ac.in/',
  },
  {
    title: 'IELTS',
    description: 'IELTS assesses English language proficiency for education, work, or migration in English-speaking countries.',
    link: 'https://www.ielts.org/',
  },
  {
    title: 'JEE',
    description: 'JEE is a competitive exam for engineering program admissions, assessing physics, chemistry, and math proficiency.',
    link: 'https://jeemain.nta.nic.in/',
  },
  {
    title: 'NEET',
    description: 'NEET is an entrance exam for medical programs, assessing biology, chemistry, and physics knowledge.',
    link: 'https://neet.nta.nic.in/',
  },
];

const examComponent = (exam, index) => {
  return (
    <div key={index} className="relative group">
      <div className="flex justify-between px-6 py-5 my-5 text-xl duration-1000 bg-blue-500 shadow-xl sm:text-2xl sm:px-10 rounded-xl">
        <p className="text-white">{exam.title}</p>
        <FontAwesomeIcon className="text-2xl text-white transition-transform duration-700 group-hover:rotate-180" icon={faChevronDown} />
      </div>
      <div className="max-h-0 group-hover:max-h-[500px] shadow-xl mb-5 duration-700 rounded-xl overflow-hidden">
        <div className="flex-col content-center mx-10 my-3 text-sm transition-all duration-700 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0 sm:text-xl">
          <p className="py-2">{exam.description}</p>
          <p className="py-2">
            <a href={exam.link} target="_blank" rel="noopener noreferrer" className="underline text-s_orange">
              Click here for more information
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

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
    // semesters,
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

  // const branches = [
  //   { value: "choose", text: "Choose Branch" },
  //   { value: "Computer Engineering", text: "Computer Engineering" },
  //   {
  //     value: "Electronics and Telecommunication",
  //     text: "Electronics and Telecommunication",
  //   },
  //   {
  //     value: "Electronics and Computer Science",
  //     text: "Electronics and Computer Science",
  //   },
  //   { value: "Information Technology", text: "Information Technology" },
  //   { value: "CS IOT", text: "CS IOT" },
  //   { value: "First Year Engineering", text: "First Year Engineering" },
  //   { value: "AIML", text: "AIML" },
  //   { value: "AIDS", text: "AIDS" },
  //   { value: "ME", text: "Mechanical Engineering" },
  //   { value: "ME-Information Security", text: "ME Information Security" },
  //   { value: "ME-AIDS", text: "ME AIDS" },
  // ];

  const semesters = [
    { value: "choose", text: "Choose Semester" },
    { value: "SEM 2", text: "SEM 1 - 2" },
    { value: "SEM 3", text: "SEM 3 - 8" },
  ];

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
      const syllabusData = await fetchSyllabus();
      if (syllabusData && syllabusData._id) {
        await downloadSyllabus(syllabusData._id);
        toast.success("Syllabus downloaded successfully!");
      } else {
        toast.error("Syllabus not found!");
      }
    } catch (err) {
      toast.error("Failed to download syllabus. Please try again.");
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
      console.error(err);
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

  // // Add, edit, and delete semesters
  // const handleAddSemester = async (name) => {
  //   try {
  //     await addSemester(name);
  //     toast.success("Semester added successfully!");
  //   } catch (err) {
  //     toast.error("Failed to add semester.");
  //   }
  // };
  // 
  // const handleEditSemester = async (id, newName) => {
  //   try {
  //     await updateSemester(id, newName);
  //     toast.success("Semester updated successfully!");
  //   } catch (err) {
  //     toast.error("Failed to update semester.");
  //   }
  // };
  // 
  // const handleDeleteSemester = async () => {
  //   if (!semester) {
  //     toast.error("Please select a semester to delete.");
  //     return;
  //   }
  // 
  //   try {
  //     // Find the semester object from the semesters array
  //     const semesterToDelete = semesters.find((s) => s.name === semester);
  //     if (!semesterToDelete) {
  //       toast.error("Selected semester not found.");
  //       return;
  //     }
  // 
  //     // Call the deleteSemester function from the store
  //     await deleteSemester(semesterToDelete._id);
  //     toast.success("Semester deleted successfully!");
  // 
  //     // Clear the selected semester after deletion
  //     setSemester("");
  //   } catch (err) {
  //     toast.error("Failed to delete semester.");
  //   }
  // };

  return (
    <div className="w-full h-full overflow-x-hidden">
      {/* <Link to="/academics"></Link> */}
      <Helmet>
        <title>E-Resources | Library | SIESGST</title>
      </Helmet>
      <ToastContainer />

      {/* E-Resources */}
      <div className="flex items-center justify-center py-8 bg-gray-100 sm:py-12 md:py-16">
        <div>
          <div className="flex justify-center text-3xl font-bold sm:text-4xl md:text-5xl text-s_blue">
            <p>E-Resources</p>
          </div>
          <div className="w-20 mx-auto mt-2 border-b-4 sm:w-32 border-s_orange" />
        </div>
      </div>

      {/* University Syllabus */}
      <div
        className="py-10 mx-4 sm:mx-16 md:mx-40"
        ref={refs["university-syllabus"]}
        id="university-syllabus"
      >
        <div className="flex items-center justify-center w-full py-6">
          <div>
            <div className="flex justify-center text-2xl font-bold sm:text-3xl">
              <p>Syllabus</p>
            </div>
            <div className="w-24 mx-auto mt-2 mb-6 border-b-4 border-blue-700 sm:w-32"></div>
          </div>
        </div>
        {/* Form Start */}
        <form
          id="question-paper-form"
          className="w-full max-w-2xl p-4 mx-auto border shadow-2xl bg-header-color rounded-2xl"
          onSubmit={handleSubmit}
        >
          {/* select branch */}
          <div className="px-4 mb-4">
            <label
              htmlFor="branch"
              className="block mb-2 text-base font-bold text-gray-700 sm:text-lg"
            >
              Select Branch:
            </label>
            <select
              id="branch"
              name="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded-md focus:border-blue-600 focus:ring-blue-600"
            >
              <option value="">Select Branch</option>
              {branches.map((branchOption) => (
                // manual option rendering removed
                // <option key={branchOption.value} value={branchOption.value}>
                //   {branchOption.text}
                // </option>
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
                  onClick={() => {
                    const newName = prompt("Enter new branch name:");
                    if (newName && branch) {
                      const branchToEdit = branches.find((b) => b.name === branch);
                      if (branchToEdit) {
                        handleEditBranch(branchToEdit._id, newName);
                      }
                    }
                    else {
                      alert("Please select a branch to edit.");
                    }
                  }}
                  className="px-2 py-1 text-white bg-yellow-500 rounded-md"
                >
                  Edit Branch
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
          {/* select semester */}
          <div className="px-4 mb-4">
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
              className="w-full p-3 border border-gray-400 rounded-md focus:border-s_orange focus:ring-s_orange"
            >
              {/* <option value="">Select Semester</option> */}
              {semesters.map((semesterOption) => (
                <option key={semesterOption.value} value={semesterOption.value}>
                  {semesterOption.text}
                </option>
              ))}
            </select>
            {/* {isAuthenticated && (
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
            )} */}
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
                  className="px-4 py-2 text-white bg-green-500 rounded-md active:bg-green-700"
                >
                  Add File
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md active:bg-blue-700"
                >
                  Update File
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 text-white bg-red-500 rounded-md active:bg-red-700"
                >
                  Delete File
                </button>
              </div>
            </>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              id="download-btn"
              className="px-4 py-2 mt-2 text-white rounded-md bg-s_orange w-36 sm:w-40 active:bg-s_orange_400"
              disabled={syllabusLoading}
            >
              {syllabusLoading ? "Loading..." : "Get Syllabus"}
            </button>
          </div>
        </form>
      </div>

      {/* Competitive Exam */}
      <div ref={refs["competitive-exams"]} id="competitive-exams" className="py-10 mx-4 sm:mx-16 md:mx-40">
        <div className="flex items-center justify-center w-full py-6">
          <div>
            <div className="flex justify-center text-2xl font-bold sm:text-3xl">
              <p>Competitive Exams</p>
            </div>
          </div>
        </div>
        <div>
          {exams.map((exam, index) => examComponent(exam, index))}
        </div>
      </div>
    </div>
  );
}
