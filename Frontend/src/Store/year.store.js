import { create } from "zustand";
import axios from "axios";
import { API_BASE_URL } from "./baseapi.js";

const useYearStore = create((set) => ({
    yearOptions: [],
    loading: false,
    error: null,

    fetchYears: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_BASE_URL}/year/years`);
            set({ yearOptions: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    addYear: async (name) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/year/years`, { name });
            set((state) => ({
                yearOptions: [...state.yearOptions, {
                    value: response.data._id,
                    text: response.data.name
                }]
            }));
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteYear: async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/year/years/${id}`);
            set((state) => ({
                yearOptions: state.yearOptions.filter(year => year.value !== id)
            }));
        } catch (error) {
            throw error;
        }
    }
}));

export default useYearStore;