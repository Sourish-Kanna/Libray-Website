import {create} from 'zustand';
import axios from 'axios';

const base_url = 'http://localhost:8000'

const useYearStore = create((set) => ({
    years: [],
    loading: false,
    error: null,

    // Fetch all years
    fetchYears: async () => {
        set({ loading: true, error: null });
        try {
        const response = await axios.get(`${base_url}/api/v1/year/years`);
        set({ years: response.data, loading: false });
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    },

    // Add a new year
    addYear: async (name) => {
        set({ loading: true, error: null });
        try {
        const response = await axios.post(`${base_url}/api/v1/year/years`, { name });
        set((state) => ({ years: [...state.years, response.data.year], loading: false }));
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    },

    // Delete a year
    deleteYear: async (id) => {
        set({ loading: true, error: null });
        try {
        await axios.delete(`${base_url}/api/v1/year/years/${id}`);
        set((state) => ({
            years: state.years.filter((year) => year._id !== id),
            loading: false,
        }));
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    },
}));

export default useYearStore;