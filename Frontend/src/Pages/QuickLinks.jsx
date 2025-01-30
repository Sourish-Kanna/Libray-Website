import { useEffect, useState } from "react";
import "../css/QuickLinks.css";
import { useScrollToHash, useSmoothScroll } from "../Navigation";
import usePyqsStore from "../Store/pyqs.store";
import useAuthStore from "../Store/userAuth.store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useYearStore from "../Store/yearStore.js";
import useSemesterStore from "../Store/semester.store.js";
import useSubjectStore from "../Store/subjectStore.js";
import useMonthStore from "../Store/monthStore.js";
import useBranchStore from "../Store/branch.store.js";

function Quicklinks() {
  useSmoothScroll();
  useScrollToHash(["pyq", "lib-brochure", "more"]);

  // Extract state and actions from the stores
  const { years, fetchYears } = useYearStore();
  const { semesters, fetchSemesters } = useSemesterStore();
  const { subjects, fetchSubjects } = useSubjectStore();
  const { months, fetchMonths } = useMonthStore();
  const { branches, fetchBranches } = useBranchStore();

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
    createPYQ,
    updatePYQ,
    deletePYQ,
  } = usePyqsStore();

  const { isAuthenticated } = useAuthStore();
  const [file, setFile] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchYears();
    fetchSemesters();
    fetchSubjects();
    fetchMonths();
    fetchBranches();
  }, [fetchYears, fetchSemesters, fetchSubjects, fetchMonths, fetchBranches]);

  const handleBranchChange = (e) => {
    const selectedBranch = e.target.value;
    setBranch(selectedBranch);
    setSemester("choose");
    setSubject("choose");
  };

  const handleSemesterChange = (e) => {
    const selectedSemester = e.target.value;
    setSemester(selectedSemester);
    setSubject("choose");
  };

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setSubject(selectedSubject);
  };

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value.toLowerCase();
    setMonth(selectedMonth);
  };

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
      if (pyqData && pyqData._id) {
        await downloadPYQ(pyqData._id);
        toast.success("PYQ downloaded successfully!");
      } else {
        toast.error("PYQ not found!");
      }
    } catch (err) {
      toast.error("Failed to download PYQ. Please try again.");
    }
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("branch", branch);
      formData.append("semester", semester);
      formData.append("subject", subject);
      formData.append("year", year);
      formData.append("month", month);
      if (file) {
        formData.append("questionPaper", file);
      }

      await createPYQ(formData);
      toast.success("PYQ created successfully!");
    } catch (err) {
      toast.error("Failed to create PYQ. Please try again.");
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("branch", branch);
      formData.append("semester", semester);
      formData.append("subject", subject);
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
      toast.error("Failed to delete PYQ. Please try again.");
    }
  };

  return (
    <div className="font-serif mt-28">
      <ToastContainer />
      <div className="mx-40" id="Donate-books">
        <div className="flex items-center justify-center w-full h-40">
          <div>
            <div className="flex justify-center text-4xl font-bold">
              <p>Question Papers</p>
            </div>
            <div className="mx-auto mt-2 mb-10 border-b-4 border-blue-700 w-44"></div>
          </div>
        </div>
        <form
          id="question-paper"
          className="form-container"
          onSubmit={handleSubmit}
        >
          <label htmlFor="branch">Branch:</label>
          <select id="branch" value={branch} onChange={handleBranchChange}>
            <option value="choose">Choose Branch</option>
            {branches.map((branch) => (
              <option key={branch._id} value={branch.name}>
                {branch.name}
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
            <option value="choose">Choose Semester</option>
            {semesters.map((semester) => (
              <option key={semester._id} value={semester.name}>
                {semester.name}
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
            <option value="choose">Choose Subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>

          <label htmlFor="year">Year:</label>
          <select id="year" value={year} onChange={handleYearChange}>
            <option value="choose">Choose Year</option>
            {years.map((year) => (
              <option key={year._id} value={year.name}>
                {year.name}
              </option>
            ))}
          </select>

          <label htmlFor="month">Month:</label>
          <select id="month" value={month} onChange={handleMonthChange}>
            <option value="choose">Choose Month</option>
            {months.map((month) => (
              <option key={month._id} value={month.name}>
                {month.name}
              </option>
            ))}
          </select>

          {error && <p className="error-message">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="bg-orange-500 px-4 py-2 rounded-xl"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {isAuthenticated && (
            <div className="file-input-container">
              <label htmlFor="file">Upload PYQ File:</label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
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