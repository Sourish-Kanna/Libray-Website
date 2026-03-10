import { create } from "zustand";
import axios from "axios";
import { API_BASE_URL, apiGet, apiDelete } from "./baseapi.js";
import { frontendLogger, generateActionId } from "../utils/logger.js";

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
        const actionId = generateActionId("FETCH_SYLLABUS");
        const start = Date.now();
        frontendLogger.info({ screenOrStore: "syllabus.store", action: "FETCH_SYLLABUS", step: "START", status: "STARTED", actionId, message: `[FETCH_SYLLABUS] START STARTED` });
        
        const { branch, semester } = useSyllabusStore.getState();
        
        frontendLogger.info({ screenOrStore: "syllabus.store", action: "FETCH_SYLLABUS", step: "VALIDATE_FORM", status: "STARTED", actionId, message: `[FETCH_SYLLABUS] VALIDATE_FORM STARTED` });
        if (!branch || !semester) {
            frontendLogger.warn({ screenOrStore: "syllabus.store", action: "FETCH_SYLLABUS", step: "VALIDATE_FORM", status: "FAILURE", actionId, errorCode: "VALIDATION_ERROR", errorMessage: "Missing branch or semester", message: `[FETCH_SYLLABUS] VALIDATE_FORM FAILURE` });
            set({ error: "Please select both branch and semester." });
            return;
        }

        set({ loading: true, error: null });

        try {
            frontendLogger.info({ screenOrStore: "syllabus.store", action: "FETCH_SYLLABUS", step: "REQUEST_SENT", status: "STARTED", actionId, message: `[FETCH_SYLLABUS] REQUEST_SENT STARTED` });
            const response = await apiGet(`/syllabus`, { branch, semester }, { actionId });
            set({ syllabus: response.data.data, loading: false });
            frontendLogger.info({ screenOrStore: "syllabus.store", action: "FETCH_SYLLABUS", step: "RESPONSE_RECEIVED", status: "SUCCESS", actionId, durationMs: Date.now() - start, message: `[FETCH_SYLLABUS] RESPONSE_RECEIVED SUCCESS` });
            return response.data.data;
        } catch (err) {
            frontendLogger.error({ screenOrStore: "syllabus.store", action: "FETCH_SYLLABUS", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: err.message, durationMs: Date.now() - start, message: `[FETCH_SYLLABUS] END FAILURE` });
            set({
                error: err.response?.data?.message || "Failed to fetch syllabus. Please try again.",
                loading: false,
            });
        }
    },

    // Download syllabus
    downloadSyllabus: async (inputSyllabusId = null, metadata = null) => {
        const actionId = generateActionId("DOWNLOAD_SYLLABUS");
        const start = Date.now();
        frontendLogger.info({ screenOrStore: "syllabus.store", action: "DOWNLOAD_SYLLABUS", step: "START", status: "STARTED", actionId, message: `[DOWNLOAD_SYLLABUS] START STARTED` });
        
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
            frontendLogger.warn({ screenOrStore: "syllabus.store", action: "DOWNLOAD_SYLLABUS", step: "VALIDATE_FORM", status: "FAILURE", actionId, errorCode: "VALIDATION_ERROR", errorMessage: "No Syllabus ID", message: `[DOWNLOAD_SYLLABUS] VALIDATE_FORM FAILURE` });
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
            frontendLogger.info({ screenOrStore: "syllabus.store", action: "DOWNLOAD_SYLLABUS", step: "REQUEST_SENT", status: "STARTED", actionId, meta: { filename }, message: `[DOWNLOAD_SYLLABUS] REQUEST_SENT STARTED` });
            window.location.href = `${API_BASE_URL}/syllabus/${syllabusId}/download?filename=${filename}`;
            frontendLogger.info({ screenOrStore: "syllabus.store", action: "DOWNLOAD_SYLLABUS", step: "RESPONSE_RECEIVED", status: "SUCCESS", actionId, durationMs: Date.now() - start, message: `[DOWNLOAD_SYLLABUS] RESPONSE_RECEIVED SUCCESS` });
        } catch (err) {
            frontendLogger.error({ screenOrStore: "syllabus.store", action: "DOWNLOAD_SYLLABUS", step: "END", status: "FAILURE", actionId, errorCode: "UNKNOWN_ERROR", errorMessage: err.message, durationMs: Date.now() - start, message: `[DOWNLOAD_SYLLABUS] END FAILURE` });
            set({
                error: "Failed to download syllabus.",
            });
        }
    },

    // Create syllabus
    createSyllabus: async (formData) => {
        const actionId = generateActionId("CREATE_SYLLABUS");
        const start = Date.now();
        frontendLogger.info({ screenOrStore: "syllabus.store", action: "CREATE_SYLLABUS", step: "START", status: "STARTED", actionId, message: `[CREATE_SYLLABUS] START STARTED` });
        set({ loading: true, error: null });

        try {
            frontendLogger.info({ screenOrStore: "syllabus.store", action: "CREATE_SYLLABUS", step: "CALL_EXTERNAL", status: "STARTED", actionId, message: `[CREATE_SYLLABUS] CALL_EXTERNAL STARTED - Cloudinary upload` });
            const response = await axios.post(
                `${API_BASE_URL}/syllabus/create`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            set({ syllabus: response.data.data, loading: false });
            frontendLogger.info({ screenOrStore: "syllabus.store", action: "CREATE_SYLLABUS", step: "RESPONSE_RECEIVED", status: "SUCCESS", actionId, statusCode: 201, durationMs: Date.now() - start, message: `[CREATE_SYLLABUS] RESPONSE_RECEIVED SUCCESS` });
        } catch (err) {
            frontendLogger.error({ screenOrStore: "syllabus.store", action: "CREATE_SYLLABUS", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: err.message, durationMs: Date.now() - start, message: `[CREATE_SYLLABUS] END FAILURE` });
            set({
                error: err.response?.data?.message || "Failed to create syllabus. Please try again.",
                loading: false,
            });
        }
    },

    // Update syllabus
    updateSyllabus: async (syllabusId, formData) => {
        const actionId = generateActionId("UPDATE_SYLLABUS");
        const start = Date.now();
        frontendLogger.info({ screenOrStore: "syllabus.store", action: "UPDATE_SYLLABUS", step: "START", status: "STARTED", actionId, message: `[UPDATE_SYLLABUS] START STARTED` });
        set({ loading: true, error: null });

        try {
            frontendLogger.info({ screenOrStore: "syllabus.store", action: "UPDATE_SYLLABUS", step: "CALL_EXTERNAL", status: "STARTED", actionId, message: `[UPDATE_SYLLABUS] CALL_EXTERNAL STARTED - Cloudinary upload` });
            const response = await axios.patch(
                `${API_BASE_URL}/syllabus/${syllabusId}/update`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            set({ syllabus: response.data.data, loading: false });
            frontendLogger.info({ screenOrStore: "syllabus.store", action: "UPDATE_SYLLABUS", step: "RESPONSE_RECEIVED", status: "SUCCESS", actionId, statusCode: 200, durationMs: Date.now() - start, message: `[UPDATE_SYLLABUS] RESPONSE_RECEIVED SUCCESS` });
        } catch (err) {
            frontendLogger.error({ screenOrStore: "syllabus.store", action: "UPDATE_SYLLABUS", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: err.message, durationMs: Date.now() - start, message: `[UPDATE_SYLLABUS] END FAILURE` });
            set({
                error: err.response?.data?.message || "Failed to update syllabus. Please try again.",
                loading: false,
            });
        }
    },

    // Delete syllabus
    deleteSyllabus: async (syllabusId) => {
        const actionId = generateActionId("DELETE_SYLLABUS");
        const start = Date.now();
        frontendLogger.info({ screenOrStore: "syllabus.store", action: "DELETE_SYLLABUS", step: "START", status: "STARTED", actionId, message: `[DELETE_SYLLABUS] START STARTED` });
        set({ loading: true, error: null });

        try {
            await apiDelete(`/syllabus/${syllabusId}`, {}, { actionId });
            set({ syllabus: null, loading: false });
            frontendLogger.info({ screenOrStore: "syllabus.store", action: "DELETE_SYLLABUS", step: "RESPONSE_RECEIVED", status: "SUCCESS", actionId, statusCode: 200, durationMs: Date.now() - start, message: `[DELETE_SYLLABUS] RESPONSE_RECEIVED SUCCESS` });
        } catch (err) {
            frontendLogger.error({ screenOrStore: "syllabus.store", action: "DELETE_SYLLABUS", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: err.message, durationMs: Date.now() - start, message: `[DELETE_SYLLABUS] END FAILURE` });
            set({
                error: err.response?.data?.message || "Failed to delete syllabus. Please try again.",
                loading: false,
            });
        }
    },

    fetchAllSyllabus: async () => {
        const actionId = generateActionId("FETCH_ALL_SYLLABUS");
        const start = Date.now();
        frontendLogger.info({ screenOrStore: "syllabus.store", action: "FETCH_ALL_SYLLABUS", step: "START", status: "STARTED", actionId, message: `[FETCH_ALL_SYLLABUS] START STARTED` });
        set({ loading: true, error: null });
        try {
            const response = await apiGet(`/syllabus`, {}, { actionId });
            set({ syllabus: response.data.data, loading: false });
            frontendLogger.info({ screenOrStore: "syllabus.store", action: "FETCH_ALL_SYLLABUS", step: "RESPONSE_RECEIVED", status: "SUCCESS", actionId, durationMs: Date.now() - start, message: `[FETCH_ALL_SYLLABUS] RESPONSE_RECEIVED SUCCESS` });
        } catch (err) {
            frontendLogger.error({ screenOrStore: "syllabus.store", action: "FETCH_ALL_SYLLABUS", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: err.message, durationMs: Date.now() - start, message: `[FETCH_ALL_SYLLABUS] END FAILURE` });
            set({
                error: err.response?.data?.message || "Failed to fetch all Syllabuses.",
                loading: false,
            });
        }
    },

}));

export default useSyllabusStore;
