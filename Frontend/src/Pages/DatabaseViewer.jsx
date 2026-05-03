import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilePdf,
    faArrowUp,
    faChevronRight,
    faChevronDown
} from '@fortawesome/free-solid-svg-icons';

import usePyqsStore from '../Store/pyqs.store.js';
import useSyllabusStore from '../Store/syllabus.store.js';
import '../css/admin.css';

const DatabaseViewer = () => {

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

    const [collapsed, setCollapsed] = useState({});

    // Fetch
    useEffect(() => {
        fetchAllPYQs();
        fetchAllSyllabus();
    }, [fetchAllPYQs, fetchAllSyllabus]);

    // Initialize all collapsed
    useEffect(() => {
        const initialCollapsed = {};

        pyqs?.forEach(p => {
            initialCollapsed[`b-${p.branch}`] = true;
            initialCollapsed[`s-${p.branch}-${p.semester}`] = true;
            initialCollapsed[`y-${p.branch}-${p.semester}-${p.year}`] = true;
        });

        syllabuses?.forEach(s => {
            initialCollapsed[`sb-${s.branch}`] = true;
            initialCollapsed[`ss-${s.branch}-${s.semester}`] = true;
        });

        setCollapsed(initialCollapsed);
    }, [pyqs, syllabuses]);

    const toggle = (key) => {
        setCollapsed(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const scrollToSyllabus = () => {
        const section = document.getElementById('syllabus-section');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Sorting (ascending)
    const sortedPYQs = [...(pyqs || [])].sort((a, b) => {

        if (a.branch !== b.branch)
            return a.branch.localeCompare(b.branch);

        if (a.semester !== b.semester)
            return Number(a.semester) - Number(b.semester);

        if (a.year !== b.year)
            return Number(a.year) - Number(b.year);

        return a.month.localeCompare(b.month);
    });

    // Group PYQs
    const groupedPYQ = {};

    sortedPYQs.forEach(p => {
        if (!groupedPYQ[p.branch]) groupedPYQ[p.branch] = {};
        if (!groupedPYQ[p.branch][p.semester]) groupedPYQ[p.branch][p.semester] = {};
        if (!groupedPYQ[p.branch][p.semester][p.year]) groupedPYQ[p.branch][p.semester][p.year] = [];

        groupedPYQ[p.branch][p.semester][p.year].push(p);
    });

    // Sort syllabus
    const sylList = [...(syllabuses || [])].sort((a, b) => {
        if (a.branch !== b.branch)
            return a.branch.localeCompare(b.branch);
        return Number(a.semester) - Number(b.semester);
    });

    // Group syllabus
    const groupedSyllabus = {};

    sylList.forEach(s => {
        if (!groupedSyllabus[s.branch]) groupedSyllabus[s.branch] = {};
        if (!groupedSyllabus[s.branch][s.semester]) groupedSyllabus[s.branch][s.semester] = [];

        groupedSyllabus[s.branch][s.semester].push(s);
    });

    // Loading / Error
    if (pyqLoading || sylLoading) {
        return (
            <div className="flex items-center justify-center h-screen text-xl text-blue-700">
                Loading Database Entries...
            </div>
        );
    }

    if (pyqError || sylError) {
        return (
            <div className="flex items-center justify-center h-screen text-xl text-red-600">
                Error: {pyqError || sylError}
            </div>
        );
    }

    return (
        <div className="w-full pb-16">

            <Helmet>
                <title>Database Viewer | Library</title>
            </Helmet>

            <div className="mx-4 sm:mx-16 lg:mx-40 min-h-screen">

                {/* Header */}
                <div className="flex flex-col items-center py-8">
                    <h1 className="text-4xl font-bold">Database Viewer</h1>
                    <div className="w-24 border-b-4 border-blue-700 mt-2 mb-6"></div>

                    <button
                        onClick={scrollToSyllabus}
                        className="mt-4 flex items-center gap-2 px-6 py-2 text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 transition"
                    >
                        ↓ Jump to Syllabuses
                    </button>
                </div>

                {/* PYQ Section */}
                <h2 className="text-2xl font-bold mb-4 border-l-4 border-blue-500 pl-3">
                    Question Papers
                </h2>

                <div className="bg-white rounded-lg shadow ">
                    <table className="w-full">
                        <tbody>

                            {Object.keys(groupedPYQ).map(branch => {

                                const branchKey = `b-${branch}`;
                                const branchCollapsed = collapsed[branchKey];

                                return (
                                    <React.Fragment key={branch}>

                                        {/* Branch */}
                                        <tr onClick={() => toggle(branchKey)} className="cursor-pointer bg-blue-100 font-bold">
                                            <td className="p-3 flex items-center gap-2">
                                                <FontAwesomeIcon icon={branchCollapsed ? faChevronRight : faChevronDown} />
                                                {branch}
                                            </td>
                                        </tr>

                                        {!branchCollapsed && Object.keys(groupedPYQ[branch]).map(sem => {

                                            const semKey = `s-${branch}-${sem}`;
                                            const semCollapsed = collapsed[semKey];

                                            return (
                                                <React.Fragment key={sem}>

                                                    <tr onClick={() => toggle(semKey)} className="cursor-pointer bg-gray-100">
                                                        <td className="p-3 pl-6 flex items-center gap-2 font-semibold">
                                                            <FontAwesomeIcon icon={semCollapsed ? faChevronRight : faChevronDown} />
                                                            Semester {sem}
                                                        </td>
                                                    </tr>

                                                    {!semCollapsed && Object.keys(groupedPYQ[branch][sem]).map(year => {

                                                        const yearKey = `y-${branch}-${sem}-${year}`;
                                                        const yearCollapsed = collapsed[yearKey];

                                                        return (
                                                            <React.Fragment key={year}>

                                                                <tr onClick={() => toggle(yearKey)} className="cursor-pointer bg-gray-50">
                                                                    <td className="p-3 pl-10 flex items-center gap-2">
                                                                        <FontAwesomeIcon icon={yearCollapsed ? faChevronRight : faChevronDown} />
                                                                        {year}
                                                                    </td>
                                                                </tr>

                                                                {!yearCollapsed && groupedPYQ[branch][sem][year].map(p => (
                                                                    <tr key={p._id} className="hover:bg-blue-50">
                                                                        <td className="p-3 pl-16 flex justify-between items-center">
                                                                            <span className="capitalize">{p.month}</span>
                                                                            <div className="flex gap-2">
                                                                                {/* Preview */}
                                                                                <button
                                                                                    onClick={() => window.open(p.questionPaperUrl, "_blank", "noopener,noreferrer")}
                                                                                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                                                                                >
                                                                                    Preview
                                                                                </button>

                                                                                {/* Download */}
                                                                                <button
                                                                                    onClick={() => downloadPYQ(p._id, p)}
                                                                                    className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                                                                                >
                                                                                    <FontAwesomeIcon icon={faFilePdf} /> Download
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}

                                                            </React.Fragment>
                                                        );
                                                    })}

                                                </React.Fragment>
                                            );
                                        })}

                                    </React.Fragment>
                                );
                            })}

                        </tbody>
                    </table>
                </div>

                {/* Syllabus Section */}
                <div id="syllabus-section" className='pt-8'>

                    <h2 className="text-2xl font-bold mb-4 border-l-4 border-blue-500 pl-3">
                        Syllabuses
                    </h2>

                    <div className="bg-white rounded-lg shadow">
                        <table className="w-full">
                            <tbody>

                                {Object.keys(groupedSyllabus).map(branch => {

                                    const branchKey = `sb-${branch}`;
                                    const branchCollapsed = collapsed[branchKey];

                                    return (
                                        <React.Fragment key={branch}>

                                            <tr onClick={() => toggle(branchKey)} className="cursor-pointer bg-blue-100 font-bold">
                                                <td className="p-3 flex items-center gap-2">
                                                    <FontAwesomeIcon icon={branchCollapsed ? faChevronRight : faChevronDown} />
                                                    {branch}
                                                </td>
                                            </tr>

                                            {!branchCollapsed && Object.keys(groupedSyllabus[branch]).map(sem => {

                                                const semKey = `ss-${branch}-${sem}`;
                                                const semCollapsed = collapsed[semKey];

                                                return (
                                                    <React.Fragment key={sem}>

                                                        <tr onClick={() => toggle(semKey)} className="cursor-pointer bg-gray-100">
                                                            <td className="p-3 pl-6 flex items-center gap-2 font-semibold">
                                                                <FontAwesomeIcon icon={semCollapsed ? faChevronRight : faChevronDown} />
                                                                Semester {sem}
                                                            </td>
                                                        </tr>

                                                        {!semCollapsed && groupedSyllabus[branch][sem].map(s => (
                                                            <tr key={s._id} className="hover:bg-blue-50">
                                                                <td className="p-3 pl-12 flex justify-between items-center">
                                                                    <span>Syllabus File</span>
                                                                    <div className="flex gap-2">
                                                                        {/* Preview */}
                                                                        <button
                                                                            onClick={() => window.open(s.syllabusUrl, "_blank", "noopener,noreferrer")}
                                                                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                                                                        >
                                                                            Preview
                                                                        </button>

                                                                        {/* Download */}
                                                                        <button
                                                                            onClick={() => downloadSyllabus(s._id, s)}
                                                                            className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                                                                        >
                                                                            <FontAwesomeIcon icon={faFilePdf} /> Download
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}

                                                    </React.Fragment>
                                                );
                                            })}

                                        </React.Fragment>
                                    );
                                })}

                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
        </div>
    );
};

export default DatabaseViewer;  