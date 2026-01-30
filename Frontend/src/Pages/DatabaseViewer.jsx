import React, { useEffect } from 'react';
import usePyqsStore from '../Store/pyqs.store.js';
import useSyllabusStore from '../Store/syllabus.store.js';

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

    useEffect(() => {
        fetchAllPYQs();
        fetchAllSyllabus();
    }, [fetchAllPYQs, fetchAllSyllabus]);

    // --- Scroll Functions ---
    const scrollToSyllabus = () => {
        const section = document.getElementById('syllabus-section');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (pyqLoading || sylLoading) return <div style={styles.center}>Loading Data...</div>;
    if (pyqError || sylError) return <div style={styles.error}>{pyqError || sylError}</div>;

    const pyqList = Array.isArray(pyqs) ? pyqs : [];
    const sylList = Array.isArray(syllabuses) ? syllabuses : [];

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>📚 Database Admin Viewer</h1>

            {/* --- Navigation Button --- */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button onClick={scrollToSyllabus} style={styles.navBtn}>
                    ⬇ Jump to Syllabuses
                </button>
            </div>

            {/* --- PYQ Table --- */}
            <h2 style={styles.subHeader}>PYQs ({pyqList.length})</h2>
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Branch</th>
                            <th style={styles.th}>Sem</th>
                            <th style={styles.th}>Month</th>
                            <th style={styles.th}>Year</th>
                            <th style={styles.th}>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pyqList.map((item) => (
                            <tr key={item._id} style={styles.tr}>
                                <td style={styles.td}>{item.branch}</td>
                                <td style={styles.td}>{item.semester}</td>
                                <td style={styles.td}>{item.month}</td>
                                <td style={styles.td}>{item.year}</td>
                                <td style={styles.td}>
                                    <button
                                        onClick={() => downloadPYQ(item._id, item)}
                                        style={styles.btn}
                                    >
                                        ⬇ Download PDF
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- Syllabus Table --- */}
            {/* ✅ Added ID for scrolling */}
            <h2 id="syllabus-section" style={styles.subHeader}>
                Syllabuses ({sylList.length})
            </h2>

            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Branch</th>
                            <th style={styles.th}>Sem</th>
                            <th style={styles.th}>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sylList.map((item) => (
                            <tr key={item._id} style={styles.tr}>
                                <td style={styles.td}>{item.branch}</td>
                                <td style={styles.td}>{item.semester}</td>
                                <td style={styles.td}>
                                    <button
                                        onClick={() => downloadSyllabus(item._id, item)}
                                        style={styles.btn}
                                    >
                                        ⬇ Download PDF
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- Scroll to Top Button --- */}
            <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
                <button onClick={scrollToTop} style={styles.navBtnOutline}>
                    ⬆ Back to Top
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' },
    header: { textAlign: 'center', color: '#2c3e50', marginBottom: '20px' },
    subHeader: { marginTop: '40px', borderBottom: '2px solid #ddd', paddingBottom: '10px', color: '#34495e' },
    tableWrapper: { overflowX: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '8px' },
    table: { width: '100%', borderCollapse: 'collapse', minWidth: '600px' },
    th: { backgroundColor: '#3498db', color: 'white', padding: '12px', textAlign: 'left' },
    td: { padding: '12px', borderBottom: '1px solid #eee', color: '#555' },
    tr: { backgroundColor: 'white' },
    center: { textAlign: 'center', padding: '50px', fontSize: '1.2rem', color: '#666' },
    error: { textAlign: 'center', padding: '50px', color: 'red', fontWeight: 'bold' },
    btn: {
        backgroundColor: '#2ecc71',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '0.9rem',
    },
    // New Styles for Scroll Buttons
    navBtn: {
        backgroundColor: '#34495e',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1rem',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    },
    navBtnOutline: {
        backgroundColor: 'transparent',
        color: '#34495e',
        border: '2px solid #34495e',
        padding: '10px 20px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1rem',
    }
};

export default DatabaseViewer;