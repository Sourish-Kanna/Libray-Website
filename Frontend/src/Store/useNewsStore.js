// stores/useNewsStore.js
import { create } from "zustand";
import { apiPost, apiDelete, apiGet } from './baseapi.js';
import { frontendLogger, generateActionId } from '../utils/logger.js';

const useNewsStore = create((set) => ({
    newsItems: [], // Initial state

  // Action to add a news item
  addNews: async (title) => {
    const actionId = generateActionId("ADD_NEWS");
    const start = Date.now();
    frontendLogger.info({ screenOrStore: "useNewsStore", action: "ADD_NEWS", step: "START", status: "STARTED", actionId, message: `[ADD_NEWS] START STARTED` });
    try {
      frontendLogger.info({ screenOrStore: "useNewsStore", action: "ADD_NEWS", step: "BUILD_PAYLOAD", status: "SUCCESS", actionId, message: `[ADD_NEWS] BUILD_PAYLOAD SUCCESS` });
      const response = await apiPost(
        `/news`,
        { title },
        {},
        { actionId }
      );
      set((state) => ({
        newsItems: [...state.newsItems, response.data.news],
      }));
      frontendLogger.info({ screenOrStore: "useNewsStore", action: "ADD_NEWS", step: "STORE_UPDATED", status: "SUCCESS", actionId, durationMs: Date.now() - start, message: `[ADD_NEWS] STORE_UPDATED SUCCESS` });
    } catch (error) {
      frontendLogger.error({ screenOrStore: "useNewsStore", action: "ADD_NEWS", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[ADD_NEWS] END FAILURE` });
    }
  },

  // Action to delete a news item
  deleteNews: async (id) => {
    const actionId = generateActionId("DELETE_NEWS");
    const start = Date.now();
    frontendLogger.info({ screenOrStore: "useNewsStore", action: "DELETE_NEWS", step: "START", status: "STARTED", actionId, message: `[DELETE_NEWS] START STARTED` });
    try {
      await apiDelete(
        `/news/${id}`,
        {},
        { actionId }
      );
      set((state) => ({
        newsItems: state.newsItems.filter((item) => item._id !== id),
      }));
      frontendLogger.info({ screenOrStore: "useNewsStore", action: "DELETE_NEWS", step: "STORE_UPDATED", status: "SUCCESS", actionId, durationMs: Date.now() - start, message: `[DELETE_NEWS] STORE_UPDATED SUCCESS` });
    } catch (error) {
      frontendLogger.error({ screenOrStore: "useNewsStore", action: "DELETE_NEWS", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[DELETE_NEWS] END FAILURE` });
    }
  },

  // Action to fetch all news items
  fetchNews: async () => {
    const actionId = generateActionId("FETCH_NEWS");
    const start = Date.now();
    frontendLogger.info({ screenOrStore: "useNewsStore", action: "FETCH_NEWS", step: "START", status: "STARTED", actionId, message: `[FETCH_NEWS] START STARTED` });
    try {
      const response = await apiGet(
        `/news`,
        {},
        { actionId }
      );
      set({ newsItems: response.data });
      frontendLogger.info({ screenOrStore: "useNewsStore", action: "FETCH_NEWS", step: "STORE_UPDATED", status: "SUCCESS", actionId, durationMs: Date.now() - start, message: `[FETCH_NEWS] STORE_UPDATED SUCCESS` });
    } catch (error) {
      frontendLogger.error({ screenOrStore: "useNewsStore", action: "FETCH_NEWS", step: "END", status: "FAILURE", actionId, errorCode: "NETWORK_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[FETCH_NEWS] END FAILURE` });
    }
  },
}));

export default useNewsStore;
