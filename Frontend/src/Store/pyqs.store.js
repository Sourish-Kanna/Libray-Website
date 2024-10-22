// src/store/pyqsStore.js
import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const usePyqsStore = create((set) => ({
branch: '',
semester: '',
subject: '',
year: '',
month: '',
pyq: null,
loading: false,
error: null,

// Setters for the form fields with debugging
setBranch: (branch) => {
// console.log("Store: Setting branch to", branch);
set({ branch });
},
setSemester: (semester) => {
// console.log("Store: Setting semester to", semester);
set({ semester });
},
setSubject: (subject) => {
// console.log("Store: Setting subject to", subject);
set({ subject });
},
setYear: (year) => {
// console.log("Store: Setting year to", year);
set({ year });
},
setMonth: (month) => {
// console.log("Store: Setting month to", month);
set({ month });
},

// Fetch a specific PYQ
fetchPYQ: async () => {
    const { branch, semester, subject, year, month } = usePyqsStore.getState();

    set({ loading: true, error: null });
// console.log("Store: Fetching PYQ...");

    try {
        const response = await axios.get(`${API_BASE_URL}/pyqs`, {
        params: { branch, semester, subject, year, month },
        });
        set({ pyq: response.data.data, loading: false });
        return response.data.data;
    } catch (err) {
        set({
        error: err.response?.data?.message || 'Failed to fetch PYQ. Please try again.',
        loading: false,
        });
}
},

downloadPYQ: async (pyqId) => {
// console.log("Store: Downloading PYQ with ID:", pyqId);
try {
    const response = await axios.get(`${API_BASE_URL}/pyqs/${pyqId}/download`, {
    responseType: 'blob',
    });
    // console.log("Store: Download response received"); 

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;

    const contentDisposition = response.headers['content-disposition'];
    let fileName = 'pyq.pdf';
    if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
    if (fileNameMatch && fileNameMatch.length === 2) {
        fileName = fileNameMatch[1];
    }
    }

    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    // console.log("Store: Download initiated");
} catch (err) {
    // console.error("Store: Error downloading PYQ:", err); //
    set({
    error: err.response?.data?.message || 'Failed to download PYQ. Please try again.',
    });
}
},
}));

export default usePyqsStore;
