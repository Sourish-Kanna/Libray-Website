// src/store/syllabusStore.js
import {create} from 'zustand';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const useSyllabusStore = create((set) => ({
branch: '',
semester: '',
syllabus: null,
loading: false,
error: null,

setBranch: (branch) => set({ branch }),
setSemester: (semester) => set({ semester }),

fetchSyllabus: async () => {
const { branch, semester } = useSyllabusStore.getState();
if (!branch || !semester) {
    set({ error: 'Please select both branch and semester.' });
    return;
}

set({ loading: true, error: null });

try {
    const response = await axios.get(`${API_BASE_URL}/syllabus`, {
    params: { branch, semester },
    });
    set({ syllabus: response.data.data, loading: false });
} catch (err) {
    set({
    error:
        err.response?.data?.message ||
        'Failed to fetch syllabus. Please try again.',
    loading: false,
    });
}
},

downloadSyllabus: async () => {
const { syllabus } = useSyllabusStore.getState();
if (!syllabus) {
    set({ error: 'No syllabus available to download.' });
    return;
}

try {
    window.location.href = `${API_BASE_URL}/syllabus/${syllabus._id}/download`;
} catch (err) {
    set({
    error:
        err.response?.data?.message ||
        'Failed to download syllabus. Please try again.',
    });
}
},

createSyllabus: async (formData) => {
set({ loading: true, error: null });

try {
    const response = await axios.post(`${API_BASE_URL}/syllabus`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    });
    set({ syllabus: response.data.data, loading: false });
} catch (err) {
    set({
    error:
        err.response?.data?.message ||
        'Failed to create syllabus. Please try again.',
    loading: false,
    });
}
},

updateSyllabus: async (syllabusId, formData) => {
set({ loading: true, error: null });

try {
    const response = await axios.put(
    `${API_BASE_URL}/syllabus/${syllabusId}`,
    formData,
    {
        headers: { 'Content-Type': 'multipart/form-data' },
    }
    );
    set({ syllabus: response.data.data, loading: false });
} catch (err) {
    set({
    error:
        err.response?.data?.message ||
        'Failed to update syllabus. Please try again.',
    loading: false,
    });
}
},
}));

export default useSyllabusStore;
