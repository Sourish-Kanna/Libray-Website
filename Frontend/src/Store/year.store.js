import { create } from "zustand";
import axios from "axios";
import { API_BASE_URL } from "./baseapi.js";

const useYearStore = create((set) => ({
    yearOptions: [],
    fetchYears: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/year/years`);
            set({ yearOptions: response.data.map((year) => ({ value: year, text: year })) });
        } catch (error) {
            console.error("Failed to fetch years:", error);
        }
    },
}));

export default useYearStore;