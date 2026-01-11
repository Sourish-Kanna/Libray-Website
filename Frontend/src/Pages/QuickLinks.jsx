import { useState, useEffect } from "react";
import "../css/admin.css";
import { useScrollToHash, useSmoothScroll } from "../Navigation";
import usePyqsStore from "../Store/pyqs.store";
import useAuthStore from "../Store/userAuth.store";
import useYearStore from "../Store/year.store.js";
import useBranchStore from "../Store/branch.store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from 'react-helmet';
import axios from "axios";

// const branches = [
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
//   { value: "ME-IS", text: "ME Information Security" },
//   { value: "ME-AIDS", text: "ME AIDS" },
// ];

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

// const subjectOptions = {
//   AIDS: {
//     "SEM 1": [
//       "Engineering Mathematics-1",
//       "Engineering Physics-1",
//       "Engineering Chemistry-1",
//       "Engineering Mechanics",
//       "Basic Electrical and Electronics Engineering",
//     ],
//     "SEM 2": [
//       "Engineering Mathematics-2",
//       "Engineering Physics-2",
//       "Engineering Chemistry-2",
//       "Engineering Graphics",
//       "C Programming",
//       "PCE-1",
//     ],
//     "SEM 3": [
//       "Engineering Mathematics-3",
//       "DSGT",
//       "Data Structure",
//       "DLCOA",
//       "Computer Graphics",
//     ],
//     "SEM 4": [
//       "Engineering Mathematics-4",
//       "AOA",
//       "DBMS",
//       "Operating System",
//       "Microprocessor",
//     ],
//     "SEM 5": [
//       "Computer Network",
//       "Web Computing",
//       "Artificial Intelligence",
//       "DWM",
//       "DLO-1",
//     ],
//     "SEM 6": [
//       "Data Analytics and Visualization",
//       "Cryptography and System Security",
//       "Software Engineering and Project Management",
//       "Machine Learning",
//       "DLO-2",
//     ],
//     "SEM 7": ["Deep Learning", "Big Data Analytics", "DLO-3", "DLo-4", "ILO-1"],
//     "SEM 8": ["Advanced Artificial Intelligence", "DLO-5", "DLO-6", "ILO-2"],
//   },
//   "Computer Engineering": {
//     "SEM 1": [
//       "Engineering Mathematics-1",
//       "Engineering Physics-1",
//       "Engineering Chemistry-1",
//       "Engineering Mechanics",
//       "Basic Electrical and Electronics Engineering",
//     ],
//     "SEM 2": [
//       "Engineering Mathematics-2",
//       "Engineering Physics-2",
//       "Engineering Chemistry-2",
//       "Engineering Graphics",
//       "C Programming",
//       "PCE-1",
//     ],
//     "SEM 3": [
//       "Engineering Mathematics-3",
//       "DSGT",
//       "Data Structure",
//       "DLCOA",
//       "Computer Graphics",
//     ],
//     "SEM 4": [
//       "Engineering Mathematics-4",
//       "AOA",
//       "DBMS",
//       "Operating System",
//       "Microprocessor",
//     ],
//     "SEM 5": [
//       "TCS",
//       "Software Engineering",
//       "Computer Network",
//       "DWM",
//       "DLO-1",
//     ],
//     "SEM 6": [
//       "System Programming & Compiler Construction",
//       "Cryptography and System Security",
//       "Mobile Computing",
//       "Artificial Intelligence",
//       "DLO-2",
//     ],
//     "SEM 7": [
//       "Machine Learning",
//       "Big Data Analytics",
//       "DLO-3",
//       "DLO-4",
//       "ILO-1",
//     ],
//     "SEM 8": ["Distributed Computing", "DLO-5", "DLO-6", "ILO-1"],
//   },
//   "Electronics and Telecommunication": {
//     "SEM 1": [
//       "Engineering Mathematics-1",
//       "Engineering Physics-1",
//       "Engineering Chemistry-1",
//       "Engineering Mechanics",
//       "Basic Electrical and Electronics Engineering",
//     ],
//     "SEM 2": [
//       "Engineering Mathematics-2",
//       "Engineering Physics-2",
//       "Engineering Chemistry-2",
//       "Engineering Graphics",
//       "C Programming",
//       "PCE-1",
//     ],
//     "SEM 3": [
//       "EXTC Sem3 Sub1",
//       "EXTC Sem3 Sub2",
//       "EXTC Sem3 Sub3",
//       "EXTC Sem3 Sub4",
//       "EXTC Sem3 Sub5",
//     ],
//     "SEM 4": [
//       "Engineering Mathematics-4",
//       "Microcontrollers",
//       "Linear Integrated Circuits",
//       "Signals & Systems",
//       "PCE",
//     ],
//     "SEM 5": [
//       "Digital Communication",
//       "DTSP",
//       "Digital VLSI",
//       "Random Signal Analysis",
//       "DLO-1",
//     ],
//     "SEM 6": [
//       "Electromagnetics and Antenna",
//       "Computer Communication Networks",
//       "Image Processing And Machine vision",
//       "Artificial Neural Network And Fuzzy Logic",
//       "DLO-2",
//     ],
//     "SEM 7": [
//       "Microwave Engineering",
//       "Mobile Communication System",
//       "DLO-3",
//       "DLO-4",
//       "ILO-1",
//     ],
//     "SEM 8": ["Optical Communication And Networks", "DLO-5", "DLO-6", "ILO-2"],
//   },
//   "Electronics and Computer Science": {
//     "SEM 1": [
//       "Engineering Mathematics-1",
//       "Engineering Physics-1",
//       "Engineering Chemistry-1",
//       "Engineering Mechanics",
//       "Basic Electrical and Electronics Engineering",
//     ],
//     "SEM 2": [
//       "Engineering Mathematics-2",
//       "Engineering Physics-2",
//       "Engineering Chemistry-2",
//       "Engineering Graphics",
//       "C Programming",
//       "PCE-1",
//     ],
//     "SEM 3": [
//       "Engineering Mathematics-3",
//       "Electronics Devices",
//       "Digital Electronics",
//       "Data Structures and Algorithms",
//       "DBMS",
//     ],
//     "SEM 4": [
//       "Engineering Mathematics-4",
//       "Electronic Circuits",
//       "Controls and Instrumentation",
//       "Microprocessors and Microcontrollers",
//       "Discrete Structures and Automata Theory",
//     ],
//     "SEM 5": [
//       "Communication Engineering",
//       "Computer Organization and Architecture",
//       "Software Engineering",
//       "Web Technologies",
//       "DLO-2",
//     ],
//     "SEM 6": [
//       "Embedded Systems and TROS ",
//       "Artificial Intelligence",
//       "Computer Networks",
//       "DWM",
//       "DLO-2",
//     ],
//     "SEM 7": ["VLSI", "IOT", "DLO-3", "DLO-4", "ILO-1"],
//     "SEM 8": ["Robotics", "DLO-5", "DLO-6", "ILO-2"],
//   },
//   "Information Technology": {
//     "SEM 1": [
//       "Engineering Mathematics-1",
//       "Applied Physics-1",
//       "Engineering Chemistry-1",
//       "Engineering Mechanics",
//       "Basic Electrical and Electronics Engineering",
//     ],
//     "SEM 2": [
//       "Engineering Mathematics-2",
//       "Engineering Physics-2",
//       "Engineering Chemistry-2",
//       "Engineering Graphics",
//       "C Programming",
//       "PCE-1",
//     ],
//     "SEM 3": [
//       "Engineering Mathematics-3",
//       "Data Structure and Analysis",
//       "DBMS",
//       "Principles of Communication",
//       "Paradigms and computer Programming Fundamentals",
//     ],
//     "SEM 4": [
//       "Engineering Mathematics-4",
//       "Computer Network and Network Design",
//       "Operating System",
//       "Automata theory",
//       "Computer Organization and Architecture",
//     ],
//     "SEM 5": [
//       "Internet Programming",
//       "Computer Network Security",
//       "Entrepreneurship and E-business",
//       "Software engineering",
//       "DLO-1",
//     ],
//     "SEM 6": [
//       "Data Mining & Business Intelligence",
//       "Web X.0",
//       "Wireless Technology",
//       "AI and DS-1",
//       "DLO-2",
//     ],
//     "SEM 7": [
//       "AI and DS-2",
//       "Internet of Everything",
//       "DLO-3",
//       "DLO-4",
//       "ILO-1",
//     ],
//     "SEM 8": ["Blockchain and DLT", "DLO-5", "DLO-6", "ILO-2"],
//   },
//   AIML: {
//     "SEM 1": [
//       "Engineering Mathematics-1",
//       "Applied Physics-1",
//       "Engineering Chemistry-1",
//       "Engineering Mechanics",
//       "Basic Electrical and Electronics Engineering",
//     ],
//     "SEM 2": [
//       "Engineering Mathematics-2",
//       "Engineering Physics-2",
//       "Engineering Chemistry-2",
//       "Engineering Graphics",
//       "C Programming",
//       "PCE-1",
//     ],
//     "SEM 3": [
//       "Engineering Mathematics-3",
//       "DSGT",
//       "Data Structure",
//       "DLCOA",
//       "Computer Graphics",
//     ],
//     "SEM 4": [
//       "Engineering Mathematics-4",
//       "AOA",
//       "DBMS",
//       "Operating System",
//       "Microprocessor",
//     ],
//     "SEM 5": [
//       "Computer Network",
//       "Web Computing",
//       "Artificial Intelligence",
//       "DWM",
//       "DLO-1",
//     ],
//     "SEM 6": [
//       "Data Analytics and Visualization",
//       "Cryptography and System Security",
//       "Software Engineering and Project Management",
//       "Machine Learning",
//       "DLO-2",
//     ],
//     "SEM 7": ["Deep Learning", "Big Data Analytics", "DLO-3", "DLo-4", "ILO-4"],
//     "SEM 8": ["Advanced Artificial Intelligence", "DLO-5", "DLO-6", "ILO-2"],
//   },
//   "CS IOT": {
//     "SEM 1": [
//       "Engineering Mathematics-1",
//       "Applied Physics-1",
//       "Engineering Chemistry-1",
//       "Engineering Mechanics",
//       "Basic Electrical and Electronics Engineering",
//     ],
//     "SEM 2": [
//       "Engineering Mathematics-2",
//       "Engineering Physics-2",
//       "Engineering Chemistry-2",
//       "Engineering Graphics",
//       "C Programming",
//       "PCE-1",
//     ],
//     "SEM 3": [
//       "IOT Sem3 Sub1",
//       "IOT Sem3 Sub2",
//       "IOT Sem3 Sub3",
//       "IOT Sem3 Sub4",
//       "IOT Sem3 Sub5",
//     ],
//     "SEM 4": [
//       "IOT Sem4 Sub1",
//       "IOT Sem4 Sub2",
//       "IOT Sem4 Sub3",
//       "IOT Sem4 Sub4",
//       "IOT Sem4 Sub5",
//     ],
//     "SEM 5": [
//       "TCS",
//       "Software Engineering",
//       "Computer Network",
//       "DWM",
//       "DLO-1",
//     ],
//     "SEM 6": [
//       "Cryptography and System Security",
//       "IOT Architecture and Protocols",
//       "Blockchain Technology",
//       "Web X.0",
//       "DLO-2",
//     ],
//     "SEM 7": [
//       "IOT Sem7 Sub1",
//       "IOT Sem7 Sub2",
//       "IOT Sem7 Sub3",
//       "IOT Sem7 Sub4",
//       "IOT Sem7 Sub5",
//     ],
//     "SEM 8": [
//       "IOT Sem8 Sub1",
//       "IOT Sem8 Sub2",
//       "IOT Sem8 Sub3",
//       "IOT Sem8 Sub4",
//       "IOT Sem8 Sub5",
//     ],
//   },
//   "First Year Engineering": {
//     "SEM 1": [
//       "Engineering Mathematics-1",
//       "Engineering Physics-1",
//       "Engineering Chemistry-1",
//       "Engineering Mechanics",
//       "Basic Electrical and Electronics Engineering",
//     ],
//     "SEM 2": [
//       "Engineering Mathematics-2",
//       "Engineering Physics-2",
//       "Engineering Chemistry-2",
//       "Engineering Graphics",
//       "C Programming",
//       "PCE-1",
//     ],
//   },
// };

const monthOptions = [
  { value: "may", text: "May" },
  { value: "november", text: "November" },
];

// const yearOptions = [
//   { value: "2019", text: "2019" },
//   { value: "2020", text: "2020" },
//   { value: "2021", text: "2021" },
//   { value: "2022", text: "2022" },
//   { value: "2023", text: "2023" },
//   { value: "2024", text: "2024" },
//   { value: "2025", text: "2025" },
//   { value: "2026", text: "2026" },
// ];

function Quicklinks() {
  useSmoothScroll();
  useScrollToHash(["pyq", "lib-brochure", "more"]);

  // Extract state and actions from the store
  const {
    branch,
    semester,
    // subject,
    year,
    month,
    loading,
    error,
    setBranch,
    setSemester,
    // setSubject,
    setYear,
    setMonth,
    fetchPYQ,
    downloadPYQ,
    createPYQ,
    updatePYQ,
    deletePYQ,
  } = usePyqsStore();

  const { isAuthenticated } = useAuthStore();

  // Zustand store for branches
  const {
    branches,
    loading: branchLoading,
    error: branchError,
    fetchBranches,
    addBranch,
    updateBranch,
    deleteBranch,
  } = useBranchStore();

  const { fetchYears, yearOptions, addYear, deleteYear } = useYearStore();

  useEffect(() => {
    fetchBranches(); // Fetch branches on component mount
    fetchYears();
  }, [fetchBranches]);

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
    // console.log("Branch set to:", e.target.value); // Debug
    // setSemester("choose");
    // setSubject("choose");
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
    // console.log("Semester changed to:", e.target.value); // Debug
    // setSubject("choose");
  };

  // const handleSubjectChange = (e) => {
  //   const selectedSubject = e.target.value;
  //   console.log("Subject changed to:", selectedSubject); // Debug
  //   setSubject(e.target.value);
  // };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    // console.log("Year changed to:", e.target.value); // Debug
  };

  const handleMonthChange = (e) => {
    // const selectedMonth = e.target.value.toLowerCase(); // Convert to lowercase
    // console.log("Month changed to:", e.target.value.toLowerCase()); // Debug
    setMonth(e.target.value.toLowerCase()); // Set the lowercase value
};

  // const availableSubjects = subjectOptions[branch]?.[semester] || [];

  const isSubmitDisabled =
    branch === "choose" ||
    semester === "choose" ||
    // subject === "choose" ||
    year === "choose" ||
    month === "choose" ||
    loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pyqData = await fetchPYQ();
      // console.log("PYQ Data on Submit:", pyqData); // Debug log
      if (pyqData && pyqData._id) {
        await downloadPYQ(pyqData._id);
        toast.success("PYQ downloaded successfully!");
      } else {
        // console.log("PYQ data not found:", pyqData); // Debug log 
        toast.error("PYQ not found!");
      }
    } catch (err) {
      console.error(err); // Debug log
      toast.error("Failed to download PYQ. Please try again later.");
    }
  };

  const [file, setFile] = useState(null);

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("branch", branch);
      formData.append("semester", semester);
      // formData.append("subject", subject);
      formData.append("year", year);
      formData.append("month", month);
      if (file) {
        formData.append("questionPaper", file);
      }

      await createPYQ(formData);
      toast.success("PYQ created successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create PYQ. Please try again.");
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("branch", branch);
      formData.append("semester", semester);
      // formData.append("subject", subject);
      formData.append("year", year);
      formData.append("month", month);
      if (file) {
        formData.append("questionPaper", file);
      }

      const pyqData = await fetchPYQ();
      if (pyqData && pyqData._id) {
        await updatePYQ(pyqData._id, formData);
        toast.success("PYQ updated successfully!");
      } else {
        toast.error("PYQ not found!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update PYQ. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const pyqData = await fetchPYQ();
      if (pyqData && pyqData._id) {
        await deletePYQ(pyqData._id);
        toast.success("PYQ deleted successfully!");
      } else {
        toast.error("PYQ not found!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete PYQ. Please try again.");
    }
  };

    // Add, edit, and delete branches
    const handleAddBranch = async (name, value) => {
      try {
        await addBranch(name, value);
        toast.success("Branch added successfully!");
      } catch (err) {
        toast.error("Failed to add branch.");
      }
    };

    const handleEditBranch = async (id, newName, newValue) => {
      try {
        await updateBranch(id, newName, newValue);
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
        await deleteBranch(branchToDelete._id);
        toast.success("Branch deleted successfully!");
        setBranch("");
      } catch (err) {
        toast.error("Failed to delete branch.");
      }
    };

  // Add and delete years
  const handleDeleteYear = async () => {
    if (!year) {
      toast.error("Please select a year to delete.");
      return;
    }
    try {
      await deleteYear(year);
      toast.success("Year deleted successfully!");
      setYear("choose");
    } catch (err) {
      toast.error("Failed to delete year.");
    }
  };

  const handleAddyear = async (yearName) => {
    if (!yearName) {
      toast.error("Please enter a year name.");
      return;
    }
    try {
      await addYear(yearName);
      toast.success("Year added successfully!");
    } catch (err) {
      toast.error("Failed to add year.");
    }
  };

  return (
    <div className="w-full h-full overflow-x-hidden">
      <Helmet>
        <title>Others | Library | SIESGST</title>
      </Helmet>
      <ToastContainer />

      <div className="mx-4 sm:mx-16 lg:mx-40" id="Select-PYQs">
        <div className="flex items-center justify-center w-full h-auto py-8">
          <div>
            <div className="flex justify-center text-4xl font-bold lg:text-4xl">
              {/* <p>Question Papers</p> */}
              <p>Download Question Paper</p>
            </div>
            <div className="w-24 mx-auto mt-2 mb-6 border-b-4 border-blue-700 lg:w-44" />
          </div>
        </div>

        <form
          id="select-pyqs-form"
          className="form-container"
          onSubmit={handleSubmit}
        >
          {/* Branch */}
          <div className="form-group">
            <label htmlFor="branch">Branch:</label>
            <select
              id="branch"
              value={branch}
              onChange={handleBranchChange}
              className="form-control"
            >
              <option value="choose">Choose Branch</option>
              {branches.map((branchOption) => (
                <option key={branchOption._id} value={branchOption.value}>
                  {branchOption.name}
                </option>
              ))}
            </select>
            {isAuthenticated && (
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    const name = prompt("Enter branch name:");
                    const value = prompt("Enter branch value (identifier):");
                    if (name && value) handleAddBranch(name, value);
                  }}
                  className="px-2 py-1 text-white bg-green-500 rounded-md"
                >
                  Add Branch
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newName = prompt("Enter new branch name:");
                    if (newName && branch) {
                      const branchToEdit = branches.find((b) => b.value === branch);
                      if (branchToEdit) {
                        handleEditBranch(branchToEdit._id, newName, branchToEdit.value);
                      }
                      else {
                        alert("Selected branch not found.");
                      }
                    }
                    else {
                      alert("Please add a new branch name to edit.");
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

          {/* Semester */}
          <div className="form-group">
            <label htmlFor="semester">Semester:</label>
            <select
              id="semester"
              value={semester}
              onChange={handleSemesterChange}
              disabled={branch === "choose"}
              className="form-control"
            >
              {semesterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          {/* <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <select
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
              disabled={semester === "choose"}
              className="form-control"
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
          </div>
          */}

          {/* Year */}
          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <select
              id="year"
              value={year}
              onChange={handleYearChange}
              className="form-control"
            >
              <option value="choose">Choose Year</option>
              {yearOptions.map((option) => (
                <option key={option.value} value={option.text}>
                  {option.text}
                </option>
              ))}
            </select>
            {isAuthenticated && (
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() =>
                    handleAddyear(prompt("Enter year name:"))
                  }
                  className="px-2 py-1 text-white bg-green-500 rounded-md"
                >
                  Add Year
                </button>
                <button
                  type="button"
                  onClick={handleDeleteYear}
                  className="px-2 py-1 text-white bg-red-500 rounded-md"
                >
                  Delete Selected Year
                </button>
              </div>
            )}
          </div>

          {/* Month */}
          <div className="form-group">
            <label htmlFor="month">Month:</label>
            <select
              id="month"
              value={month}
              onChange={handleMonthChange}
              className="form-control"
            >
              <option value="choose">Choose Month</option>
              {monthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`submit-btn ${isSubmitDisabled && "opacity-50"}`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {isAuthenticated && (
            <div className="file-input-container">
              <label htmlFor="file">Upload PYQ File:</label>
              <input type="file" id="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
          )}

          {isAuthenticated && (
            <div className="admin-buttons">
              <button
                type="button"
                onClick={handleCreate}
                className="create-button"
              >
                Create
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                className="update-button"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="flex items-center justify-center w-full h-32" />
    </div>
  );
}

export default Quicklinks;