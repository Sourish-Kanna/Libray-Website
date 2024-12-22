import '../css/form.css';
import { useScrollToHash, useSmoothScroll } from '../Navigation';
import usePyqsStore from '../Store/pyqs.store';
import { Helmet } from 'react-helmet';

const branchOptions = [
  { value: "choose", text: "Choose Branch" },
  { value: "Computer Engineering", text: "Computer Engineering" },
  { value: "Electronics and Telecommunication", text: "Electronics and Telecommunication" },
  { value: "Electronics and Computer Science", text: "Electronics and Computer Science" },
  { value: "Information Technology", text: "Information Technology" },
  { value: "CS IOT", text: "CS IOT" },
  { value: "First Year Engineering", text: "First Year Engineering" },
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

function Quicklinks() {
  useSmoothScroll();
  useScrollToHash(['pyq', 'lib-brochure', 'more']);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pyqData = await fetchPYQ();
      if (pyqData && pyqData._id) {
        const response = await downloadPYQ(pyqData._id);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = response.headers['content-disposition']?.match(/filename="?([^"]+)"?/)?.[1] || 'pyq.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Error fetching or downloading PYQ:", err);
    }
  };

  const isSubmitDisabled =
    branch === "choose" ||
    semester === "choose" ||
    subject === "choose" ||
    year === "choose" ||
    month === "choose" ||
    loading;

  return (
    <div className="default-bg">
      <Helmet>
        <title>Others | Library | SIESGST</title>
      </Helmet>
      <div className="form-container bg-[#f3f2ed] p-6 rounded-lg shadow-lg">
        <h1>Download Question Papers</h1>
        <form onSubmit={handleSubmit} aria-labelledby="form-title">
          <fieldset disabled={loading}>
            <div className="form-group">
              <label htmlFor="branch">Branch</label>
              <select
                id="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                aria-required="true"
              >
                {branchOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="semester">Semester</label>
              <select
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                aria-required="true"
              >
                {semesterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="year">Year</label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                aria-required="true"
              >
                {yearOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="month">Month</label>
              <select
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                aria-required="true"
              >
                {monthOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className={`submit-btn ${isSubmitDisabled ? 'disabled' : ''}`}
              disabled={isSubmitDisabled}
            >
              {loading ? "Processing..." : "Download PYQ"}
            </button>
          </fieldset>
        </form>
        {error && <p className="error-message" role="alert">{error}</p>}
      </div>
    </div>
  );
}

export default Quicklinks;
