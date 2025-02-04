import { create } from 'zustand';
import axios from 'axios';

const useBranchStore = create((set) => ({
    branches: [], // State to store branches
    loading: false, // State to track loading status
    error: null, // State to store errors

    // Fetch all branches
    fetchBranches: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('https://libray-website-server.onrender.com/api/v1/branch/branches');
            set({ branches: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Add a new branch
    addBranch: async (name) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post('https://libray-website-server.onrender.com/api/v1/branch/branches', { name });
            set((state) => ({ branches: [...state.branches, response.data], loading: false }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Delete a branch
    deleteBranch: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`https://libray-website-server.onrender.com/api/v1/branch/branches/${id}`);
            set((state) => ({
                branches: state.branches.filter((branch) => branch._id !== id),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));

export default useBranchStore;