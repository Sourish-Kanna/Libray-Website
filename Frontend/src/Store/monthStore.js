import {create} from 'zustand';
import axios from 'axios';

const base_url = 'http://localhost:8000'


const useMonthStore = create((set) => ({
    months: [],
    loading: false,
    error: null,

    // Fetch all months
    fetchMonths: async () => {
        set({ loading: true, error: null });
        try {
        const response = await axios.get(`${base_url}/api/v1/month/months`);
        set({ months: response.data, loading: false });
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    },

    // Add a new month
    addMonth: async (name) => {
        set({ loading: true, error: null });
        try {
        const response = await axios.post(`${base_url}/api/v1/month/months`, { name });
        set((state) => ({ months: [...state.months, response.data.month], loading: false }));
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    },

    // Delete a month
    deleteMonth: async (id) => {
        set({ loading: true, error: null });
        try {
        await axios.delete(`${base_url}/api/v1/monthmonths/${id}`);
        set((state) => ({
            months: state.months.filter((month) => month._id !== id),
            loading: false,
        }));
        } catch (error) {
        set({ error: error.message, loading: false });
        }
    },
}));

export default useMonthStore;