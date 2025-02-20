import { create } from "zustand";
import axios from "axios";

const getStoredUser = () => {
    const storedUser = localStorage.getItem("user");
    try {
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Error parsing stored user data:", error);
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
        set({ loading: true, error: null, success: null });
        try {
            const response = await axios.post(
                "https://library-siesgst.onrender.com/api/v1/users/register",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            set({
                user: response.data,
                success: response.data.message,
                isAuthenticated: true,
                loading: false,
            });
            localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
            set({
                error: error.response?.data?.message || "Registration failed",
                loading: false,
            });
        }
    },

    loginUser: async (credentials) => {
        set({ loading: true, error: null, success: null });
        try {
            const response = await axios.post(
                "https://library-siesgst.onrender.com/api/v1/users/login",
                credentials
            );
            const userData = response.data.data;
            set({
                user: userData,
                success: response.data.message,
                loading: false,
                isAuthenticated: true,
            });
            localStorage.setItem("user", JSON.stringify(response.data.data));
            // localStorage.setItem("accessToken",response.data.token)
        } catch (error) {
            set({
                error: error.response?.data?.message || "Login failed",
                loading: false,
            });
        }
    },

    logoutUser: () => {
        try {
            set({
                user: null,
                isAuthenticated: false,
                error: null,
            });

            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
        } catch (error) {
            set({
                error: error?.response?.data?.message,
            });
        }
    },
}));

export default useAuthStore;
