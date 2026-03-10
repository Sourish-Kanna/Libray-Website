import { create } from "zustand";
import { apiGet, apiPost, apiDelete } from "./baseapi.js";
import { frontendLogger, generateActionId } from "../utils/logger.js";

const useSemesterStore = create((set) => ({
  semesters: [], // State to store semesters
  loading: false, // State to track loading status
  error: null, // State to store errors

  // Fetch all semesters
  fetchSemesters: async () => {
    const actionId = generateActionId("FETCH_SEMESTERS");
    const start = Date.now();
    frontendLogger.info({ screenOrStore: "semester.store", action: "FETCH_SEMESTERS", step: "START", status: "STARTED", actionId, message: `[FETCH_SEMESTERS] START STARTED` });
    set({ loading: true, error: null });
    try {
      const response = await apiGet("/semester/semesters", {}, { actionId });
      set({ semesters: response.data, loading: false });
      frontendLogger.info({ screenOrStore: "semester.store", action: "FETCH_SEMESTERS", step: "STORE_UPDATED", status: "SUCCESS", actionId, durationMs: Date.now() - start, message: `[FETCH_SEMESTERS] STORE_UPDATED SUCCESS` });
    } catch (error) {
      frontendLogger.error({ screenOrStore: "semester.store", action: "FETCH_SEMESTERS", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[FETCH_SEMESTERS] END FAILURE` });
      set({ error: error.message, loading: false });
    }
  },

  // Add a new semester
  addSemester: async (name) => {
    const actionId = generateActionId("ADD_SEMESTER");
    const start = Date.now();
    frontendLogger.info({ screenOrStore: "semester.store", action: "ADD_SEMESTER", step: "START", status: "STARTED", actionId, message: `[ADD_SEMESTER] START STARTED` });
    set({ loading: true, error: null });
    try {
      frontendLogger.info({ screenOrStore: "semester.store", action: "ADD_SEMESTER", step: "BUILD_PAYLOAD", status: "SUCCESS", actionId, message: `[ADD_SEMESTER] BUILD_PAYLOAD SUCCESS` });
      const response = await apiPost("/semester/semesters", { name }, {}, { actionId });
      set((state) => ({
        semesters: [...state.semesters, response.data],
        loading: false,
      }));
      frontendLogger.info({ screenOrStore: "semester.store", action: "ADD_SEMESTER", step: "STORE_UPDATED", status: "SUCCESS", actionId, durationMs: Date.now() - start, message: `[ADD_SEMESTER] STORE_UPDATED SUCCESS` });
    } catch (error) {
      frontendLogger.error({ screenOrStore: "semester.store", action: "ADD_SEMESTER", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[ADD_SEMESTER] END FAILURE` });
      set({ error: error.message, loading: false });
    }
  },

  // Delete a semester
  deleteSemester: async (id) => {
    const actionId = generateActionId("DELETE_SEMESTER");
    const start = Date.now();
    frontendLogger.info({ screenOrStore: "semester.store", action: "DELETE_SEMESTER", step: "START", status: "STARTED", actionId, message: `[DELETE_SEMESTER] START STARTED` });
    set({ loading: true, error: null });
    try {
      await apiDelete(`/semester/semesters/${id}`, {}, { actionId });
      set((state) => ({
        semesters: state.semesters.filter((semester) => semester._id !== id),
        loading: false,
      }));
      frontendLogger.info({ screenOrStore: "semester.store", action: "DELETE_SEMESTER", step: "STORE_UPDATED", status: "SUCCESS", actionId, durationMs: Date.now() - start, message: `[DELETE_SEMESTER] STORE_UPDATED SUCCESS` });
    } catch (error) {
      frontendLogger.error({ screenOrStore: "semester.store", action: "DELETE_SEMESTER", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[DELETE_SEMESTER] END FAILURE` });
      set({ error: error.message, loading: false });
    }
  },
}));

export default useSemesterStore;
