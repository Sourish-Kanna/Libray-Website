import { create } from "zustand";
import axios from "axios";

const useSemesterStore = create((set) => ({
    semesters: [], // State to store semesters
    loading: false, // State to track loading status
    error: null, // State to store errors

    // Fetch all semesters
    fetchSemesters: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(
                "https://library-siesgst.onrender.com/api/v1/semester/semesters"
            );
            set({ semesters: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Add a new semester
    addSemester: async (name) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(
                "https://library-siesgst.onrender.com/api/v1/semester/semesters",
                { name }
            );
            set((state) => ({
                semesters: [...state.semesters, response.data],
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Delete a semester
    deleteSemester: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(
                `https://library-siesgst.onrender.com/api/v1/semester/semesters/${id}`
            );
            set((state) => ({
                semesters: state.semesters.filter(
                    (semester) => semester._id !== id
                ),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));

export default useSemesterStore;
