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

const subjectOptions = {
    "AIDS": {
        "SEM 1": ["Engineering Mathematics-1", "Engineering Physics-1", "Engineering Chemistry-1", "Engineering Mechanics", "Basic Electrical and Electronics Engineering"],
        "SEM 2": ["Engineering Mathematics-2", "Engineering Physics-2", "Engineering Chemistry-2", "Engineering Graphics", "C Programming","PCE-1"],
        "SEM 3": ["Engineering Mathematics-3", "DSGT", "Data Structure", "DLCOA", "Computer Graphics"],
        "SEM 4": ["Engineering Mathematics-4", "AOA", "DBMS", "Operating System", "Microprocessor"],
        "SEM 5": ["Computer Network", "Web Computing", "Artificial Intelligence", "DWM", "DLO-1"],
        "SEM 6": ["Data Analytics and Visualization", "Cryptography and System Security", "Software Engineering and Project Management", "Machine Learning", "DLO-2"],
        "SEM 7": ["Deep Learning", "Big Data Analytics", "DLO-3", "DLo-4", "ILO-1"],
        "SEM 8": ["Advanced Artificial Intelligence", "DLO-5", "DLO-6", "ILO-2"],
        
    },
    "Computer Engineering": {
        "SEM 1": ["Engineering Mathematics-1", "Engineering Physics-1", "Engineering Chemistry-1", "Engineering Mechanics", "Basic Electrical and Electronics Engineering"],
        "SEM 2": ["Engineering Mathematics-2", "Engineering Physics-2", "Engineering Chemistry-2", "Engineering Graphics", "C Programming","PCE-1"],
        "SEM 3": ["Engineering Mathematics-3", "DSGT", "Data Structure", "DLCOA", "Computer Graphics"],
        "SEM 4": ["Engineering Mathematics-4", "AOA", "DBMS", "Operating System", "Microprocessor"],
        "SEM 5": ["TCS", "Software Engineering", "Computer Network", "DWM", "DLO-1"],
        "SEM 6": ["System Programming & Compiler Construction", "Cryptography and System Security", "Mobile Computing", "Artificial Intelligence", "DLO-2"],
        "SEM 7": ["Machine Learning", "Big Data Analytics", "DLO-3", "DLO-4", "ILO-1"],
        "SEM 8": ["Distributed Computing", "DLO-5", "DLO-6", "ILO-1",],
    
    },
    "Electronics and Telecommunication": {
        "SEM 1": ["Engineering Mathematics-1", "Engineering Physics-1", "Engineering Chemistry-1", "Engineering Mechanics", "Basic Electrical and Electronics Engineering"],
        "SEM 2": ["Engineering Mathematics-2", "Engineering Physics-2", "Engineering Chemistry-2", "Engineering Graphics", "C Programming","PCE-1"],
        "SEM 3": ["EXTC Sem3 Sub1", "EXTC Sem3 Sub2", "EXTC Sem3 Sub3", "EXTC Sem3 Sub4", "EXTC Sem3 Sub5"],
        "SEM 4": ["Engineering Mathematics-4", "Microcontrollers", "Linear Integrated Circuits", "Signals & Systems", "PCE"],
        "SEM 5": ["Digital Communication", "DTSP", "Digital VLSI", "Random Signal Analysis", "DLO-1"],
        "SEM 6": ["Electromagnetics and Antenna", "Computer Communication Networks", "Image Processing And Machine vision", "Artificial Neural Network And Fuzzy Logic", "DLO-2"],
        "SEM 7": ["Microwave Engineering", "Mobile Communication System", "DLO-3", "DLO-4", "ILO-1"],
        "SEM 8": ["Optical Communication And Networks", "DLO-5", "DLO-6", "ILO-2"],
    
    },
    "Electronics and Computer Science": {
        "SEM 1": ["Engineering Mathematics-1", "Engineering Physics-1", "Engineering Chemistry-1", "Engineering Mechanics", "Basic Electrical and Electronics Engineering"],
        "SEM 2": ["Engineering Mathematics-2", "Engineering Physics-2", "Engineering Chemistry-2", "Engineering Graphics", "C Programming","PCE-1"],
        "SEM 3": ["Engineering Mathematics-3", "Electronics Devices", "Digital Electronics", "Data Structures and Algorithms", "DBMS"],
        "SEM 4": ["Engineering Mathematics-4", "Electronic Circuits", "Controls and Instrumentation", "Microprocessors and Microcontrollers", "Discrete Structures and Automata Theory"],
        "SEM 5": ["Communication Engineering", "Computer Organization and Architecture", "Software Engineering", "Web Technologies", "DLO-2"],
        "SEM 6": ["Embedded Systems and TROS ", "Artificial Intelligence", "Computer Networks", "DWM", "DLO-2"],
        "SEM 7": ["VLSI", "IOT", "DLO-3", "DLO-4", "ILO-1"],
        "SEM 8": ["Robotics", "DLO-5", "DLO-6", "ILO-2"],
    
    },
    "Information Technology": {
        "SEM 1": ["Engineering Mathematics-1", "Applied Physics-1", "Engineering Chemistry-1", "Engineering Mechanics", "Basic Electrical and Electronics Engineering"],
        "SEM 2": ["Engineering Mathematics-2", "Engineering Physics-2", "Engineering Chemistry-2", "Engineering Graphics", "C Programming","PCE-1"],
        "SEM 3": ["Engineering Mathematics-3", "Data Structure and Analysis", "DBMS", "Principles of Communication", "Paradigms and computer Programming Fundamentals"],
        "SEM 4": ["Engineering Mathematics-4", "Computer Network and Network Design", "Operating System", "Automata theory", "Computer Organization and Architecture"],
        "SEM 5": ["Internet Programming", "Computer Network Security", "Entrepreneurship and E-business", "Software engineering", "DLO-1"],
        "SEM 6": ["Data Mining & Business Intelligence", "Web X.0", "Wireless Technology", "AI and DS-1", "DLO-2"],
        "SEM 7": ["AI and DS-2", "Internet of Everything", "DLO-3", "DLO-4", "ILO-1"],
        "SEM 8": ["Blockchain and DLT", "DLO-5", "DLO-6", "ILO-2", ],
    
    },
    "AIML": {
        "SEM 1": ["Engineering Mathematics-1", "Applied Physics-1", "Engineering Chemistry-1", "Engineering Mechanics", "Basic Electrical and Electronics Engineering"],
        "SEM 2": ["Engineering Mathematics-2", "Engineering Physics-2", "Engineering Chemistry-2", "Engineering Graphics", "C Programming","PCE-1"],
        "SEM 3": ["Engineering Mathematics-3", "DSGT", "Data Structure", "DLCOA", "Computer Graphics"],
        "SEM 4": ["Engineering Mathematics-4", "AOA", "DBMS", "Operating System", "Microprocessor"],
        "SEM 5": ["Computer Network", "Web Computing", "Artificial Intelligence", "DWM", "DLO-1"],
        "SEM 6": ["Data Analytics and Visualization", "Cryptography and System Security", "Software Engineering and Project Management", "Machine Learning", "DLO-2"],
        "SEM 7": ["Deep Learning", "Big Data Analytics", "DLO-3", "DLo-4", "ILO-4"],
        "SEM 8": ["Advanced Artificial Intelligence", "DLO-5", "DLO-6", "ILO-2"],
    
    },
    "CS IOT": {
        "SEM 1": ["Engineering Mathematics-1", "Applied Physics-1", "Engineering Chemistry-1", "Engineering Mechanics", "Basic Electrical and Electronics Engineering"],
        "SEM 2": ["Engineering Mathematics-2", "Engineering Physics-2", "Engineering Chemistry-2", "Engineering Graphics", "C Programming","PCE-1"],
        "SEM 3": ["IOT Sem3 Sub1", "IOT Sem3 Sub2", "IOT Sem3 Sub3", "IOT Sem3 Sub4", "IOT Sem3 Sub5"],
        "SEM 4": ["IOT Sem4 Sub1", "IOT Sem4 Sub2", "IOT Sem4 Sub3", "IOT Sem4 Sub4", "IOT Sem4 Sub5"],
        "SEM 5": ["TCS", "Software Engineering", "Computer Network", "DWM", "DLO-1"],
        "SEM 6": ["Cryptography and System Security", "IOT Architecture and Protocols", "Blockchain Technology", "Web X.0", "DLO-2"],
        "SEM 7": ["IOT Sem7 Sub1", "IOT Sem7 Sub2", "IOT Sem7 Sub3", "IOT Sem7 Sub4", "IOT Sem7 Sub5"],
        "SEM 8": ["IOT Sem8 Sub1", "IOT Sem8 Sub2", "IOT Sem8 Sub3", "IOT Sem8 Sub4", "IOT Sem8 Sub5"],
    
    },
    "First Year Engineering":{
        "SEM 1": ["Engineering Mathematics-1", "Engineering Physics-1", "Engineering Chemistry-1", "Engineering Mechanics", "Basic Electrical and Electronics Engineering"],
        "SEM 2": ["Engineering Mathematics-2", "Engineering Physics-2", "Engineering Chemistry-2", "Engineering Graphics", "C Programming","PCE-1"], 
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
