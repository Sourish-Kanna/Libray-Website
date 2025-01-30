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
