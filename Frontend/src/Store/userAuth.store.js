import { create } from "zustand";
import { apiPost } from "./baseapi.js";
import { frontendLogger, generateActionId } from "../utils/logger.js";

const getStoredUser = () => {
  const actionId = generateActionId("auth_init");
  frontendLogger.info({
    screenOrStore: "userAuth.store",
    action: "APP_INIT",
    step: "START",
    status: "STARTED",
    actionId,
    message: `[APP_INIT] START STARTED`,
  });

  const storedUser = localStorage.getItem("user");
  try {
    frontendLogger.info({
      screenOrStore: "userAuth.store",
      action: "APP_INIT",
      step: "STORE_UPDATED",
      status: "SUCCESS",
      actionId,
      message: `[APP_INIT] STORE_UPDATED SUCCESS`,
      meta: { hasStoredUser: Boolean(storedUser) },
    });
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    frontendLogger.error({
      screenOrStore: "userAuth.store",
      action: "APP_INIT",
      step: "STORE_UPDATED",
      status: "FAILURE",
      actionId,
      message: `[APP_INIT] STORE_UPDATED FAILURE`,
      errorCode: "UNKNOWN_ERROR",
      errorMessage: error?.message || "Failed to parse stored user",
    });
    // If data is invalid, remove it from localStorage
    localStorage.removeItem("user");
    return null;
  }
};

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  success: null,
  isAuthenticated: !!localStorage.getItem("user"),

  registerUser: async (formData) => {
    const actionId = generateActionId("register_submit");
    const start = Date.now();

    frontendLogger.info({
      screenOrStore: "userAuth.store",
      action: "REGISTER_SUBMIT",
      step: "START",
      status: "STARTED",
      actionId,
      message: `[REGISTER_SUBMIT] START STARTED`,
    });

    set({ loading: true, error: null, success: null });
    try {
      frontendLogger.info({
        screenOrStore: "userAuth.store",
        action: "REGISTER_SUBMIT",
        step: "BUILD_PAYLOAD",
        status: "SUCCESS",
        actionId,
        message: `[REGISTER_SUBMIT] BUILD_PAYLOAD SUCCESS`,
      });

      const response = await apiPost(
        "/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        { actionId }
      );

      set({
        user: response.data,
        success: response.data.message,
        isAuthenticated: true,
        loading: false,
      });
      localStorage.setItem("user", JSON.stringify(response.data));

      frontendLogger.info({
        screenOrStore: "userAuth.store",
        action: "REGISTER_SUBMIT",
        step: "END",
        status: "SUCCESS",
        actionId,
        message: `[REGISTER_SUBMIT] END SUCCESS`,
        durationMs: Date.now() - start,
        statusCode: response?.status,
      });
    } catch (error) {
      frontendLogger.error({
        screenOrStore: "userAuth.store",
        action: "REGISTER_SUBMIT",
        step: "END",
        status: "FAILURE",
        actionId,
        message: `[REGISTER_SUBMIT] END FAILURE`,
        durationMs: Date.now() - start,
        statusCode: error?.response?.status,
        errorCode: error?.code || "UNKNOWN_ERROR",
        errorMessage: error.response?.data?.message || "Registration failed",
      });

      set({
        error: error.response?.data?.message || "Registration failed",
        loading: false,
      });
    }
  },

  loginUser: async (credentials) => {
    const actionId = generateActionId("login_submit");
    const start = Date.now();

    frontendLogger.info({
      screenOrStore: "userAuth.store",
      action: "LOGIN_SUBMIT",
      step: "START",
      status: "STARTED",
      actionId,
      message: `[LOGIN_SUBMIT] START STARTED`,
      meta: { email: credentials?.email },
    });

    set({ loading: true, error: null, success: null });
    try {
      frontendLogger.info({
        screenOrStore: "userAuth.store",
        action: "LOGIN_SUBMIT",
        step: "VALIDATE_FORM",
        status: "SUCCESS",
        actionId,
        message: `[LOGIN_SUBMIT] VALIDATE_FORM SUCCESS`,
      });

      const response = await apiPost("/users/login", credentials, {}, { actionId });
      const userData = response.data.data;
      set({
        user: userData,
        success: response.data.message,
        loading: false,
        isAuthenticated: true,
      });
      localStorage.setItem("user", JSON.stringify(response.data.data));
      // localStorage.setItem("accessToken",response.data.token)

      frontendLogger.info({
        screenOrStore: "userAuth.store",
        action: "LOGIN_SUBMIT",
        step: "END",
        status: "SUCCESS",
        actionId,
        message: `[LOGIN_SUBMIT] END SUCCESS`,
        durationMs: Date.now() - start,
        statusCode: response?.status,
      });
    } catch (error) {
      frontendLogger.error({
        screenOrStore: "userAuth.store",
        action: "LOGIN_SUBMIT",
        step: "END",
        status: "FAILURE",
        actionId,
        message: `[LOGIN_SUBMIT] END FAILURE`,
        durationMs: Date.now() - start,
        statusCode: error?.response?.status,
        errorCode: error?.code || "UNKNOWN_ERROR",
        errorMessage: error.response?.data?.message || "Login failed",
      });

      set({
        error: error.response?.data?.message || "Login failed",
        loading: false,
      });
    }
  },

  logoutUser: () => {
    const actionId = generateActionId("logout_submit");

    frontendLogger.info({
      screenOrStore: "userAuth.store",
      action: "LOGOUT_SUBMIT",
      step: "START",
      status: "STARTED",
      actionId,
      message: `[LOGOUT_SUBMIT] START STARTED`,
    });

    try {
      set({
        user: null,
        isAuthenticated: false,
        error: null,
      });

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");

      frontendLogger.info({
        screenOrStore: "userAuth.store",
        action: "LOGOUT_SUBMIT",
        step: "END",
        status: "SUCCESS",
        actionId,
        message: `[LOGOUT_SUBMIT] END SUCCESS`,
      });
    } catch (error) {
      frontendLogger.error({
        screenOrStore: "userAuth.store",
        action: "LOGOUT_SUBMIT",
        step: "END",
        status: "FAILURE",
        actionId,
        message: `[LOGOUT_SUBMIT] END FAILURE`,
        errorCode: error?.code || "UNKNOWN_ERROR",
        errorMessage: error?.response?.data?.message || error?.message || "Logout failed",
      });

      set({
        error: error?.response?.data?.message,
      });
    }
  },
}));

export default useAuthStore;
