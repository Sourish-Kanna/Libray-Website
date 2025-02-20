// stores/useNewsStore.js
import { create } from "zustand";
import axios from "axios";

const useNewsStore = create((set) => ({
    newsItems: [], // Initial state

    // Action to add a news item
    addNews: async (title) => {
        try {
            const response = await axios.post(
                "https://library-siesgst.onrender.com/api/v1/news",
                {
                    title,
                }
            );
            if (response.status === 201) {
                set((state) => ({
                    newsItems: [...state.newsItems, response.data.news],
                }));
            } else {
                console.error("Error adding news:", response.data.message);
            }
        } catch (error) {
            console.error("Error adding news:", error.message);
        }
    },

    // Action to delete a news item
    deleteNews: async (id) => {
        try {
            const response = await axios.delete(
                `https://library-siesgst.onrender.com/api/v1/news/${id}`
            );
            if (response.status === 200) {
                set((state) => ({
                    newsItems: state.newsItems.filter(
                        (item) => item._id !== id
                    ),
                }));
            } else {
                console.error("Error deleting news:", response.data.message);
            }
        } catch (error) {
            console.error("Error deleting news:", error.message);
        }
    },

    // Action to fetch all news items
    fetchNews: async () => {
        try {
            const response = await axios.get(
                "https://library-siesgst.onrender.com/api/v1/news"
            );
            if (response.status === 200) {
                set({ newsItems: response.data });
            } else {
                console.error("Error fetching news:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching news:", error.message);
        }
    },
}));

export default useNewsStore;
