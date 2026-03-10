import { create } from "zustand";
import { apiGet, apiPost, apiDelete } from "./baseapi.js";
import { frontendLogger, generateActionId } from "../utils/logger.js";

const useYearStore = create((set) => ({
    yearOptions: [],
    loading: false,
    error: null,

    fetchYears: async () => {
        const actionId = generateActionId("FETCH_YEARS");
        const start = Date.now();
        frontendLogger.info({ screenOrStore: "year.store", action: "FETCH_YEARS", step: "START", status: "STARTED", actionId, message: `[FETCH_YEARS] START STARTED` });
        set({ loading: true, error: null });
        try {
            const response = await apiGet("/year/years", {}, { actionId });
            set({ yearOptions: response.data, loading: false });
            frontendLogger.info({ screenOrStore: "year.store", action: "FETCH_YEARS", step: "STORE_UPDATED", status: "SUCCESS", actionId, durationMs: Date.now() - start, message: `[FETCH_YEARS] STORE_UPDATED SUCCESS` });
        } catch (error) {
            frontendLogger.error({ screenOrStore: "year.store", action: "FETCH_YEARS", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[FETCH_YEARS] END FAILURE` });
            set({ error: error.message, loading: false });
        }
    },

    addYear: async (name) => {
        const actionId = generateActionId("ADD_YEAR");
        const start = Date.now();
        frontendLogger.info({ screenOrStore: "year.store", action: "ADD_YEAR", step: "START", status: "STARTED", actionId, message: `[ADD_YEAR] START STARTED` });
        try {
            frontendLogger.info({ screenOrStore: "year.store", action: "ADD_YEAR", step: "BUILD_PAYLOAD", status: "SUCCESS", actionId, message: `[ADD_YEAR] BUILD_PAYLOAD SUCCESS` });
            const response = await apiPost("/year/years", { name }, {}, { actionId });
            set((state) => ({
                yearOptions: [...state.yearOptions, {
                    value: response.data._id,
                    text: response.data.name
                }]
            }));
            frontendLogger.info({ screenOrStore: "year.store", action: "ADD_YEAR", step: "STORE_UPDATED", status: "SUCCESS", actionId, durationMs: Date.now() - start, message: `[ADD_YEAR] STORE_UPDATED SUCCESS` });
            return response.data;
        } catch (error) {
            frontendLogger.error({ screenOrStore: "year.store", action: "ADD_YEAR", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[ADD_YEAR] END FAILURE` });
            throw error;
        }
    },

    deleteYear: async (id) => {
        const actionId = generateActionId("DELETE_YEAR");
        const start = Date.now();
        frontendLogger.info({ screenOrStore: "year.store", action: "DELETE_YEAR", step: "START", status: "STARTED", actionId, message: `[DELETE_YEAR] START STARTED` });
        try {
            await apiDelete(`/year/years/${id}`, {}, { actionId });
            set((state) => ({
                yearOptions: state.yearOptions.filter(year => year.value !== id)
            }));
            frontendLogger.info({ screenOrStore: "year.store", action: "DELETE_YEAR", step: "STORE_UPDATED", status: "SUCCESS", actionId, durationMs: Date.now() - start, message: `[DELETE_YEAR] STORE_UPDATED SUCCESS` });
        } catch (error) {
            frontendLogger.error({ screenOrStore: "year.store", action: "DELETE_YEAR", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[DELETE_YEAR] END FAILURE` });
            throw error;
        }
    }
}));

export default useYearStore;