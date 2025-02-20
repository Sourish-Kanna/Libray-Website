import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "https://library-siesgst.onrender.com";

const useSyllabusStore = create((set) => ({
    branch: "",
    semester: "",
    syllabus: null,
    loading: false,
    error: null,

    // Set branch
    setBranch: (branch) => set({ branch }),

    // Set semester
    setSemester: (semester) => set({ semester }),

    // Fetch syllabus
    fetchSyllabus: async () => {
        const { branch, semester } = useSyllabusStore.getState();
        if (!branch || !semester) {
            set({ error: "Please select both branch and semester." });
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
                    "Failed to fetch syllabus. Please try again.",
                loading: false,
            });
        }
    },

    // Download syllabus
    downloadSyllabus: async () => {
        const { syllabus } = useSyllabusStore.getState();
        if (!syllabus) {
            set({ error: "No syllabus available to download." });
            return;
        }

        try {
            // Direct download from the backend route
            window.location.href = `${API_BASE_URL}/syllabus/${syllabus._id}/download`;
        } catch (err) {
            set({
                error:
                    err.response?.data?.message ||
                    "Failed to download syllabus. Please try again.",
            });
        }
    },

    // Create syllabus
    createSyllabus: async (formData) => {
        set({ loading: true, error: null });

        try {
            const response = await axios.post(
                `${API_BASE_URL}/syllabus/create`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            set({ syllabus: response.data.data, loading: false });
        } catch (err) {
            set({
                error:
                    err.response?.data?.message ||
                    "Failed to create syllabus. Please try again.",
                loading: false,
            });
        }
    },

    // Update syllabus
    updateSyllabus: async (syllabusId, formData) => {
        set({ loading: true, error: null });

        try {
            const response = await axios.patch(
                `${API_BASE_URL}/syllabus/${syllabusId}/update`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            set({ syllabus: response.data.data, loading: false });
        } catch (err) {
            set({
                error:
                    err.response?.data?.message ||
                    "Failed to update syllabus. Please try again.",
                loading: false,
            });
        }
    },

    // Delete syllabus
    deleteSyllabus: async (syllabusId) => {
        set({ loading: true, error: null });

        try {
            await axios.delete(`${API_BASE_URL}/syllabus/${syllabusId}`);
            set({ syllabus: null, loading: false });
        } catch (err) {
            set({
                error:
                    err.response?.data?.message ||
                    "Failed to delete syllabus. Please try again.",
                loading: false,
            });
        }
    },
}));

export default useSyllabusStore;
