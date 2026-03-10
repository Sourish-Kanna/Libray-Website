// src/store/pyqsStore.js
import { create } from "zustand";
import axios from "axios";
import { API_BASE_URL, apiGet, apiPost, apiDelete } from "./baseapi.js";
import { frontendLogger, generateActionId } from "../utils/logger.js";

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
    const actionId = generateActionId("FETCH_PYQ");
    const start = Date.now();
    frontendLogger.info({ screenOrStore: "pyqs.store", action: "FETCH_PYQ", step: "START", status: "STARTED", actionId, message: `[FETCH_PYQ] START STARTED` });
    
    const { branch, semester, year, month } = usePyqsStore.getState();
    set({ loading: true, error: null });
    
    frontendLogger.info({ screenOrStore: "pyqs.store", action: "FETCH_PYQ", step: "VALIDATE_FORM", status: "STARTED", actionId, message: `[FETCH_PYQ] VALIDATE_FORM STARTED` });
    if (!branch || !semester || !year || !month) {
      frontendLogger.warn({ screenOrStore: "pyqs.store", action: "FETCH_PYQ", step: "VALIDATE_FORM", status: "FAILURE", actionId, errorCode: "VALIDATION_ERROR", errorMessage: "Missing required fields", message: `[FETCH_PYQ] VALIDATE_FORM FAILURE` });
      set({ loading: false, error: "Please select all required fields." });
      return;
    }

    try {
      frontendLogger.info({ screenOrStore: "pyqs.store", action: "FETCH_PYQ", step: "REQUEST_SENT", status: "STARTED", actionId, message: `[FETCH_PYQ] REQUEST_SENT STARTED` });
      const response = await apiGet(`/pyqs`, { branch, semester, year, month }, { actionId });
      set({ pyq: response.data.data[0], loading: false });
      frontendLogger.info({ screenOrStore: "pyqs.store", action: "FETCH_PYQ", step: "RESPONSE_RECEIVED", status: "SUCCESS", actionId, durationMs: Date.now() - start, message: `[FETCH_PYQ] RESPONSE_RECEIVED SUCCESS` });
      return response.data.data[0];
    } catch (err) {
      frontendLogger.error({ screenOrStore: "pyqs.store", action: "FETCH_PYQ", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: err.message, durationMs: Date.now() - start, message: `[FETCH_PYQ] END FAILURE` });
      set({
        error: err.response?.data?.message || "Failed to fetch PYQ. Please try again.",
        loading: false,
      });
    }
  },

  // Create a new PYQ
  createPYQ: async (formData) => {
    const actionId = generateActionId("CREATE_PYQ");
    const start = Date.now();
    frontendLogger.info({ screenOrStore: "pyqs.store", action: "CREATE_PYQ", step: "START", status: "STARTED", actionId, message: `[CREATE_PYQ] START STARTED` });
    set({ loading: true, error: null });

    try {
      frontendLogger.info({ screenOrStore: "pyqs.store", action: "CREATE_PYQ", step: "CALL_EXTERNAL", status: "STARTED", actionId, message: `[CREATE_PYQ] CALL_EXTERNAL STARTED - Cloudinary upload` });
      const response = await axios.post(
        `${API_BASE_URL}/pyqs/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      frontendLogger.info({ screenOrStore: "pyqs.store", action: "CREATE_PYQ", step: "RESPONSE_RECEIVED", status: "SUCCESS", actionId, statusCode: 201, durationMs: Date.now() - start, message: `[CREATE_PYQ] RESPONSE_RECEIVED SUCCESS` });
      set({ loading: false });
      return response.data;
    } catch (err) {
      frontendLogger.error({ screenOrStore: "pyqs.store", action: "CREATE_PYQ", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: err.message, durationMs: Date.now() - start, message: `[CREATE_PYQ] END FAILURE` });
      set({
        error: err.response?.data?.message || "Failed to create PYQ. Please try again.",
        loading: false,
      });
    }
  },

  // Update an existing PYQ
  updatePYQ: async (pyqId, formData) => {
    const actionId = generateActionId("UPDATE_PYQ");
    const start = Date.now();
    frontendLogger.info({ screenOrStore: "pyqs.store", action: "UPDATE_PYQ", step: "START", status: "STARTED", actionId, message: `[UPDATE_PYQ] START STARTED` });
    set({ loading: true, error: null });

    try {
      frontendLogger.info({ screenOrStore: "pyqs.store", action: "UPDATE_PYQ", step: "CALL_EXTERNAL", status: "STARTED", actionId, message: `[UPDATE_PYQ] CALL_EXTERNAL STARTED - Cloudinary upload` });
      const response = await axios.patch(
        `${API_BASE_URL}/pyqs/${pyqId}/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      frontendLogger.info({ screenOrStore: "pyqs.store", action: "UPDATE_PYQ", step: "RESPONSE_RECEIVED", status: "SUCCESS", actionId, statusCode: 200, durationMs: Date.now() - start, message: `[UPDATE_PYQ] RESPONSE_RECEIVED SUCCESS` });
      set({ loading: false });
      return response.data;
    } catch (err) {
      frontendLogger.error({ screenOrStore: "pyqs.store", action: "UPDATE_PYQ", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: err.message, durationMs: Date.now() - start, message: `[UPDATE_PYQ] END FAILURE` });
      set({
        error: err.response?.data?.message || "Failed to update PYQ. Please try again.",
        loading: false,
      });
    }
  },

  // Delete a PYQ
  deletePYQ: async (pyqId) => {
    const actionId = generateActionId("DELETE_PYQ");
    const start = Date.now();
    frontendLogger.info({ screenOrStore: "pyqs.store", action: "DELETE_PYQ", step: "START", status: "STARTED", actionId, message: `[DELETE_PYQ] START STARTED` });
    set({ loading: true, error: null });

    try {
      const response = await apiDelete(`/pyqs/delete/${pyqId}`, {}, { actionId });
      frontendLogger.info({ screenOrStore: "pyqs.store", action: "DELETE_PYQ", step: "RESPONSE_RECEIVED", status: "SUCCESS", actionId, statusCode: 200, durationMs: Date.now() - start, message: `[DELETE_PYQ] RESPONSE_RECEIVED SUCCESS` });
      set({ loading: false });
      return response.data;
    } catch (err) {
      frontendLogger.error({ screenOrStore: "pyqs.store", action: "DELETE_PYQ", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: err.message, durationMs: Date.now() - start, message: `[DELETE_PYQ] END FAILURE` });
      set({
        error: err.response?.data?.message || "Failed to delete PYQ. Please try again.",
        loading: false,
      });
    }
  },

  // Download a PYQ
  downloadPYQ: async (pyqId, metadata = null) => {
    const actionId = generateActionId("DOWNLOAD_PYQ");
    const start = Date.now();
    frontendLogger.info({ screenOrStore: "pyqs.store", action: "DOWNLOAD_PYQ", step: "START", status: "STARTED", actionId, message: `[DOWNLOAD_PYQ] START STARTED` });
    
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
      frontendLogger.warn({ screenOrStore: "pyqs.store", action: "DOWNLOAD_PYQ", step: "VALIDATE_FORM", status: "FAILURE", actionId, errorCode: "VALIDATION_ERROR", errorMessage: "No PYQ ID provided", message: `[DOWNLOAD_PYQ] VALIDATE_FORM FAILURE` });
      set({ error: "No PYQ ID provided for download." });
      return;
    }

    try {
      // 3. Construct Filename and Download
      const filename = `PYQ_${branch}_${semester}_${year}_${month}.pdf`;
      frontendLogger.info({ screenOrStore: "pyqs.store", action: "DOWNLOAD_PYQ", step: "REQUEST_SENT", status: "STARTED", actionId, meta: { filename }, message: `[DOWNLOAD_PYQ] REQUEST_SENT STARTED` });
      window.location.href = `${API_BASE_URL}/pyqs/${pyqId}/download?filename=${filename}`;
      frontendLogger.info({ screenOrStore: "pyqs.store", action: "DOWNLOAD_PYQ", step: "RESPONSE_RECEIVED", status: "SUCCESS", actionId, durationMs: Date.now() - start, message: `[DOWNLOAD_PYQ] RESPONSE_RECEIVED SUCCESS` });
    } catch (err) {
      frontendLogger.error({ screenOrStore: "pyqs.store", action: "DOWNLOAD_PYQ", step: "END", status: "FAILURE", actionId, errorCode: "UNKNOWN_ERROR", errorMessage: err.message, durationMs: Date.now() - start, message: `[DOWNLOAD_PYQ] END FAILURE` });
      set({
        error: "Failed to download PYQ.",
      });
    }
  },

  fetchAllPYQs: async () => {
    const actionId = generateActionId("FETCH_ALL_PYQS");
    const start = Date.now();
    frontendLogger.info({ screenOrStore: "pyqs.store", action: "FETCH_ALL_PYQS", step: "START", status: "STARTED", actionId, message: `[FETCH_ALL_PYQS] START STARTED` });
    set({ loading: true, error: null });
    try {
      // Calling GET /pyqs without parameters usually returns all docs
      const response = await apiGet(`/pyqs`, {}, { actionId });
      set({ pyq: response.data.data, loading: false });
      frontendLogger.info({ screenOrStore: "pyqs.store", action: "FETCH_ALL_PYQS", step: "RESPONSE_RECEIVED", status: "SUCCESS", actionId, durationMs: Date.now() - start, message: `[FETCH_ALL_PYQS] RESPONSE_RECEIVED SUCCESS` });
    } catch (err) {
      frontendLogger.error({ screenOrStore: "pyqs.store", action: "FETCH_ALL_PYQS", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: err.message, durationMs: Date.now() - start, message: `[FETCH_ALL_PYQS] END FAILURE` });
      set({
        error: err.response?.data?.message || "Failed to fetch all PYQs.",
        loading: false,
      });
    }
  },

}));

export default usePyqsStore;
