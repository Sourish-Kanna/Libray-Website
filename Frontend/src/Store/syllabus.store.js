import { create } from "zustand";
import axios from "axios";
import { API_BASE_URL } from "./baseapi.js";

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
            return response.data.data;
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
    downloadSyllabus: async (inputSyllabusId = null, metadata = null) => {
        let syllabusId = inputSyllabusId;
        let branch, semester;

        // 1. Determine details based on mode (Admin vs Student)
        if (metadata && syllabusId) {
            // Admin Mode: Use passed arguments
            ({ branch, semester } = metadata);
        } else {
            // Student Mode: Use store state
            const state = useSyllabusStore.getState();
            // If ID wasn't passed, try to get it from the currently fetched syllabus
            if (!syllabusId) syllabusId = state.syllabus?._id;
            ({ branch, semester } = state);
        }

        // 2. Validate
        if (!syllabusId) {
            set({ error: "No Syllabus available to download." });
            return;
        }

        try {
            // 3. Construct Filename
            const semesterMap = {
                "SEM 2": `${branch}_SEM_1_2_syllabus.pdf`,
                "SEM 3": `${branch}_SEM_3_8_syllabus.pdf`,
            };
            const filename = semesterMap[semester] || `${branch}_${semester}_syllabus.pdf`;

            // 4. Trigger Download
            window.location.href = `${API_BASE_URL}/syllabus/${syllabusId}/download?filename=${filename}`;
        } catch (err) {
            set({
                error: "Failed to download syllabus.",
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

    fetchAllSyllabus: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_BASE_URL}/syllabus`);
            set({ syllabus: response.data.data, loading: false });
        } catch (err) {
            set({
                error: err.response?.data?.message || "Failed to fetch all Syllabuses.",
                loading: false,
            });
        }
    },

}));

export default useSyllabusStore;
