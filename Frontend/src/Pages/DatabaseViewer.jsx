import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFilePdf, faArrowUp } from '@fortawesome/free-solid-svg-icons';

// Imports from your project structure
import usePyqsStore from '../Store/pyqs.store.js';
import useSyllabusStore from '../Store/syllabus.store.js';
import { frontendLogger, generateActionId } from '../utils/logger.js';
import '../css/admin.css';

const DatabaseViewer = () => {
    const navigate = useNavigate();

    const {
        pyq: pyqs,
        fetchAllPYQs,
        downloadPYQ,
        loading: pyqLoading,
        error: pyqError
    } = usePyqsStore();

    const {
        syllabus: syllabuses,
        fetchAllSyllabus,
        downloadSyllabus,
        loading: sylLoading,
        error: sylError
    } = useSyllabusStore();

    const [pyqSort, setPyqSort] = React.useState([
        { field: "branch", order: "asc" },
        { field: "semester", order: "asc" },
        { field: "year", order: "desc" },
        { field: "month", order: "asc" }
    ]);
    
    const [sylSort, setSylSort] = React.useState({ field: 'branch', order: 'asc' });

    useEffect(() => {
        const actionId = generateActionId("DATABASE_LOAD");
        const start = Date.now();
        frontendLogger.info({ screenOrStore: "DatabaseViewer", action: "DATABASE_LOAD", step: "EFFECT_MOUNT", status: "STARTED", actionId, message: `[DATABASE_LOAD] EFFECT_MOUNT STARTED` });
        
        const loadData = async () => {
            try {
                await fetchAllPYQs();
                await fetchAllSyllabus();
                frontendLogger.info({ screenOrStore: "DatabaseViewer", action: "DATABASE_LOAD", step: "RESPONSE_RECEIVED", status: "SUCCESS", actionId, durationMs: Date.now() - start, message: `[DATABASE_LOAD] RESPONSE_RECEIVED SUCCESS` });
            } catch (error) {
                frontendLogger.error({ screenOrStore: "DatabaseViewer", action: "DATABASE_LOAD", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[DATABASE_LOAD] END FAILURE` });
            }
        };
        
        loadData();
        
        return () => {
            frontendLogger.info({ screenOrStore: "DatabaseViewer", action: "DATABASE_LOAD", step: "EFFECT_CLEANUP", status: "STARTED", actionId, message: `[DATABASE_LOAD] EFFECT_CLEANUP STARTED` });
        };
    }, [fetchAllPYQs, fetchAllSyllabus]);

    // --- Actions ---
    const handleBack = () => {
        navigate(-1);
    };

    const scrollToSyllabus = () => {
        const section = document.getElementById('syllabus-section');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getSort = (field) => pyqSort.find(s => s.field === field);

    const toggleSort = (field) => {
        setPyqSort(prev =>
            prev.map(sort =>
                sort.field === field
                    ? { ...sort, order: sort.order === "asc" ? "desc" : "asc" }
                    : sort
            )
        );
    };

    const sortData = (data, sortConfig) => {
        const monthOrder = {
            january: 1, february: 2, march: 3, april: 4,
            may: 5, june: 6, july: 7, august: 8,
            september: 9, october: 10, november: 11, december: 12
        };

        return [...data].sort((a, b) => {
            for (let { field, order } of sortConfig) {
                let valA = a[field];
                let valB = b[field];

                if (field === "month") {
                    valA = monthOrder[valA?.toLowerCase()] || 0;
                    valB = monthOrder[valB?.toLowerCase()] || 0;
                }

                if (typeof valA === "string") valA = valA.toLowerCase();
                if (typeof valB === "string") valB = valB.toLowerCase();

                if (valA < valB) return order === "asc" ? -1 : 1;
                if (valA > valB) return order === "asc" ? 1 : -1;
            }

            return 0;
        });
    };

    // Safe Data Handling
    const pyqList = sortData(
        Array.isArray(pyqs) ? pyqs : [],
        pyqSort
    );

    const sylList = sortData(
        Array.isArray(syllabuses) ? syllabuses : [],
        [{ field: sylSort.field, order: sylSort.order }]
    );

    // Loading / Error States
    if (pyqLoading || sylLoading) {
        return (
            <div className="flex items-center justify-center h-screen text-xl text-blue-700">
                <div className="mt-10">Loading Database Entries...</div>
            </div>
        );
    }

    if (pyqError || sylError) {
        return (
            <div className="flex items-center justify-center h-screen text-xl text-red-600">
                <div className="mt-10">Error: {pyqError || sylError}</div>
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-x-hidden">
            <Helmet>
                <title>Database Viewer | Library | SIESGST</title>
            </Helmet>

            {/* --- Main Content Container --- */}
            <div className="mx-4 sm:mx-16 lg:mx-40 min-h-screen">

                {/* --- EXACT HEADER STYLE FROM PYQ PAGE --- */}
                <div className="flex items-center justify-center w-full h-auto py-8">
                    <div className="flex flex-col items-center">
                        {/* Back Button (Added nicely above title)
                        <button
                            onClick={handleBack}
                            className="self-start mb-4 flex items-center gap-2 px-3 py-1 text-sm font-semibold text-white transition-colors bg-gray-600 rounded-md hover:bg-gray-700"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} /> Back
                        </button> */}

                        <div className="flex justify-center text-4xl font-bold lg:text-4xl text-center">
                            <p>Database Viewer</p>
                        </div>
                        <div className="w-24 mx-auto mt-2 mb-6 border-b-4 border-blue-700 lg:w-44" />

                        {/* Jump to Syllabus Button */}
                        <button
                            onClick={scrollToSyllabus}
                            className="px-6 py-2 text-blue-700 transition-colors bg-white border-2 border-blue-700 rounded-full hover:bg-blue-50"
                        >
                            ⬇ Jump to Syllabuses
                        </button>
                    </div>
                </div>


                {/* --- PYQ TABLE SECTION --- */}
                <div className="mb-12">
                    <h2 className="mb-4 text-2xl font-bold text-gray-700 border-l-4 border-blue-500 pl-3">
                        Question Papers ({pyqList.length})
                    </h2>

                    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-white bg-blue-600">
                                    <th
                                        onClick={() => toggleSort("branch")}
                                        className="p-4 font-semibold border-b cursor-pointer hover:bg-blue-700"
                                    >
                                        Branch {getSort("branch") && (getSort("branch").order === "asc" ? "↑" : "↓")}
                                    </th>

                                    <th
                                        onClick={() => toggleSort("semester")}
                                        className="p-4 font-semibold border-b cursor-pointer hover:bg-blue-700"
                                    >
                                        Sem {getSort("semester") && (getSort("semester").order === "asc" ? "↑" : "↓")}
                                    </th>

                                    <th
                                        onClick={() => toggleSort("month")}
                                        className="p-4 font-semibold border-b cursor-pointer hover:bg-blue-700"
                                    >
                                        Month {getSort("month") && (getSort("month").order === "asc" ? "↑" : "↓")}
                                    </th>

                                    <th
                                        onClick={() => toggleSort("year")}
                                        className="p-4 font-semibold border-b cursor-pointer hover:bg-blue-700"
                                    >
                                        Year {getSort("year") && (getSort("year").order === "asc" ? "↑" : "↓")}
                                    </th>

                                    <th className="p-4 font-semibold border-b text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {pyqList.map((item, index) => (
                                    <tr
                                        key={item._id}
                                        className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                                    >
                                        <td className="p-4 border-b border-gray-100">{item.branch}</td>
                                        <td className="p-4 border-b border-gray-100">{item.semester}</td>
                                        <td className="p-4 border-b border-gray-100 capitalize">{item.month}</td>
                                        <td className="p-4 border-b border-gray-100">{item.year}</td>
                                        <td className="p-4 text-center border-b border-gray-100">
                                            <button
                                                onClick={() => downloadPYQ(item._id, item)}
                                                className="px-3 py-1 text-sm text-white transition-opacity bg-green-500 rounded hover:opacity-80"
                                                title="Download PDF"
                                            >
                                                <FontAwesomeIcon icon={faFilePdf} /> Download
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {pyqList.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-gray-500">
                                            No Question Papers found in database.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- Scroll to Top --- */}
                <div className="flex justify-center mt-10 mb-10">
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 px-6 py-2 text-gray-600 transition-colors border border-gray-300 rounded-full hover:bg-gray-100"
                    >
                        <FontAwesomeIcon icon={faArrowUp} /> Back to Top
                    </button>
                </div>

                {/* --- SYLLABUS TABLE SECTION --- */}
                <div id="syllabus-section" className="mb-12 pt-8">
                    <h2 className="mb-4 text-2xl font-bold text-gray-700 border-l-4 border-blue-500 pl-3">
                        Syllabuses ({sylList.length})
                    </h2>

                    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-white bg-blue-600">
                                    <th
                                        onClick={() => setSylSort({
                                            field: "branch",
                                            order: sylSort.order === "asc" ? "desc" : "asc"
                                        })}
                                        className="p-4 font-semibold border-b cursor-pointer hover:bg-blue-700"
                                    >
                                        Branch {sylSort.field === "branch" && (sylSort.order === "asc" ? "↑" : "↓")}
                                    </th>

                                    <th
                                        onClick={() => setSylSort({
                                            field: "semester",
                                            order: sylSort.order === "asc" ? "desc" : "asc"
                                        })}
                                        className="p-4 font-semibold border-b cursor-pointer hover:bg-blue-700"
                                    >
                                        Sem {sylSort.field === "semester" && (sylSort.order === "asc" ? "↑" : "↓")}
                                    </th>

                                    <th className="p-4 font-semibold border-b text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {sylList.map((item, index) => (
                                    <tr
                                        key={item._id}
                                        className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                                    >
                                        <td className="p-4 border-b border-gray-100">{item.branch}</td>
                                        <td className="p-4 border-b border-gray-100">{item.semester}</td>
                                        <td className="p-4 text-center border-b border-gray-100">
                                            <button
                                                onClick={() => downloadSyllabus(item._id, item)}
                                                className="px-3 py-1 text-sm text-white transition-opacity bg-green-500 rounded hover:opacity-80"
                                            >
                                                <FontAwesomeIcon icon={faFilePdf} /> Download
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {sylList.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="p-8 text-center text-gray-500">
                                            No Syllabuses found in database.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- Scroll to Top --- */}
                <div className="flex justify-center mt-10 mb-10">
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 px-6 py-2 text-gray-600 transition-colors border border-gray-300 rounded-full hover:bg-gray-100"
                    >
                        <FontAwesomeIcon icon={faArrowUp} /> Back to Top
                    </button>
                </div>

            </div>
        </div>
    );
};

export default DatabaseViewer;