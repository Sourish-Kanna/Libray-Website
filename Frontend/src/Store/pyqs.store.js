// src/store/pyqsStore.js
import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1";

const usePyqsStore = create((set) => ({
    branch: "",
    semester: "",
    subject: "",
    year: "",
    month: "",
    pyq: null,
    loading: false,
    error: null,

    // Setters for the form fields
    setBranch: (branch) => set({ branch }),
    setSemester: (semester) => set({ semester }),
    setSubject: (subject) => set({ subject }),
    setYear: (year) => set({ year }),
    setMonth: (month) => set({ month }),

    // Fetch a specific PYQ
    fetchPYQ: async () => {
        const { branch, semester, subject, year, month } =
            usePyqsStore.getState();

        set({ loading: true, error: null });

        try {
            const response = await axios.get(`${API_BASE_URL}/pyqs`, {
                params: { branch, semester, subject, year, month },
            });
            set({ pyq: response.data.data, loading: false });
            return response.data.data;
        } catch (err) {
            set({
                error:
                    err.response?.data?.message ||
                    "Failed to fetch PYQ. Please try again.",
                loading: false,
            });
        }
    },

    // Create a new PYQ
    createPYQ: async (formData) => {
        set({ loading: true, error: null });

        try {
            const response = await axios.post(
                `${API_BASE_URL}/pyqs/create`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            set({ loading: false });
            return response.data;
        } catch (err) {
            set({
                error:
                    err.response?.data?.message ||
                    "Failed to create PYQ. Please try again.",
                loading: false,
            });
        }
    },

    // Update an existing PYQ
    updatePYQ: async (pyqId, formData) => {
        set({ loading: true, error: null });

        try {
            const response = await axios.patch(
                `${API_BASE_URL}/pyqs/${pyqId}/update`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            set({ loading: false });
            return response.data;
        } catch (err) {
            set({
                error:
                    err.response?.data?.message ||
                    "Failed to update PYQ. Please try again.",
                loading: false,
            });
        }
    },

    // Delete a PYQ
    deletePYQ: async (pyqId) => {
        set({ loading: true, error: null });

        try {
            const response = await axios.delete(
                `${API_BASE_URL}/pyqs/delete/${pyqId}`
            );
            set({ loading: false });
            return response.data;
        } catch (err) {
            set({
                error:
                    err.response?.data?.message ||
                    "Failed to delete PYQ. Please try again.",
                loading: false,
            });
        }
    },

    // Download a PYQ
    downloadPYQ: async (pyqId) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/pyqs/${pyqId}/download`,
                {
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;

            const contentDisposition = response.headers["content-disposition"];
            let fileName = "pyq.pdf";
            if (contentDisposition) {
                const fileNameMatch =
                    contentDisposition.match(/filename="?([^"]+)"?/);
                if (fileNameMatch && fileNameMatch.length === 2) {
                    fileName = fileNameMatch[1];
                }
            }

            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            set({
                error:
                    err.response?.data?.message ||
                    "Failed to download PYQ. Please try again.",
            });
        }
    },
}));

export default usePyqsStore;
