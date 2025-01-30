import {create} from 'zustand';
import axios from 'axios';

const base_url = 'http://localhost:8000'


const useSubjectStore = create((set) => ({
    subjects: [],
    loading: false,
    error: null,

    // Fetch all subjects
    fetchSubjects: async () => {
        set({ loading: true, error: null });
        try {
        const response = await axios.get(`${base_url}/api/v1/subject/subjects`);
        set({ subjects: response.data, loading: false });
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    },

    // Add a new subject
    addSubject: async (name) => {
        set({ loading: true, error: null });
        try {
        const response = await axios.post(`${base_url}/api/v1/subject/subjects`, { name });
        set((state) => ({ subjects: [...state.subjects, response.data.subject], loading: false }));
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    },

    // Delete a subject
    deleteSubject: async (id) => {
        set({ loading: true, error: null });
        try {
        await axios.delete(`${base_url}/api/v1/subject/subjects/${id}`);
        set((state) => ({
            subjects: state.subjects.filter((subject) => subject._id !== id),
            loading: false,
        }));
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    },
}));

export default useSubjectStore;