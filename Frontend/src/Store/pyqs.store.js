// src/store/pyqsStore.js
import { create } from "zustand";
import axios from "axios";
import { API_BASE_URL } from "./baseapi.js";

const usePyqsStore = create((set) => ({
  branch: "",
  semester: "",
  // subject: "",
  year: "",
  month: "",
  pyq: null,
  loading: false,
  error: null,

  // Setters for the form fields
  setBranch: (branch) => set({ branch }),
  setSemester: (semester) => set({ semester }),
  // setSubject: (subject) => set({ subject }),
  setYear: (year) => set({ year }),
  setMonth: (month) => set({ month }),

  // Fetch a specific PYQ
  fetchPYQ: async () => {
    const { branch, semester, year, month } = usePyqsStore.getState();

    set({ loading: true, error: null });
    
    // console.log("Fetching PYQ with:", {
    //   branch,
    //   semester,
    //   year,
    //   month,
    // }); // Debug log
    
    if (!branch || !semester || !year || !month) {
      set({ loading: false, error: "Please select all required fields." });
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/pyqs`, {
        params: { branch, semester, year, month },
      });
      set({ pyq: response.data.data[0], loading: false });
      // console.log("Fetched PYQ Data:", response.data.data[0]); // Debug log
      return response.data.data[0];
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
  downloadPYQ: async (pyqId, metadata = null) => {
    // 1. Determine where to get the file details from
    let branch, semester, year, month;

    if (metadata) {
      // Admin Mode: Use the details passed from the row
      ({ branch, semester, year, month } = metadata);
    } else {
      // Student Mode: Use the current selected dropdown state
      ({ branch, semester, year, month } = usePyqsStore.getState());
    }

    // 2. Validate
    if (!pyqId) {
      set({ error: "No PYQ ID provided for download." });
      return;
    }

    try {
      // 3. Construct Filename and Download
      const filename = `PYQ_${branch}_${semester}_${year}_${month}.pdf`;
      window.location.href = `${API_BASE_URL}/pyqs/${pyqId}/download?filename=${filename}`;
    } catch (err) {
      set({
        error: "Failed to download PYQ.",
      });
    }
  },

  fetchAllPYQs: async () => {
    set({ loading: true, error: null });
    try {
      // Calling GET /pyqs without parameters usually returns all docs
      const response = await axios.get(`${API_BASE_URL}/pyqs`);
      set({ pyq: response.data.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch all PYQs.",
        loading: false,
      });
    }
  },

}));

export default usePyqsStore;
