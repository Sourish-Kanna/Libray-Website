import React, { useState, useEffect } from 'react';
import useNewsStore from './Store/useNewsStore.js';
import useAuthStore from './Store/userAuth.store.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsComponent = () => {
    const [newNewsTitle, setNewNewsTitle] = useState('');
    const { isAuthenticated } = useAuthStore();
    const { newsItems, addNews, deleteNews, fetchNews } = useNewsStore();

    // Fetch news items on component mount
    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    const handleAddNews = async () => {
        if (newNewsTitle.trim()) {
        try {
            await addNews(newNewsTitle);
            setNewNewsTitle('');
            toast.success('News added successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            });
        } catch (error) {
            toast.error('Failed to add news. Please try again.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            });
        }
        }
    };

    const handleDeleteNews = async (id) => {
        try {
        await deleteNews(id);
        toast.success('News deleted successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        } catch (error) {
        toast.error('Failed to delete news. Please try again.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        }
    };

    return (
        <div className='flex flex-nowrap items-center bg-yellow-100 text-base sm:text-lg md:text-xl'>
        {/* Toast Container */}
        <ToastContainer />

        <p className="w-fit pl-2 text-lg sm:text-xl md:text-2xl font-bold text-red-600 bg-yellow-100 p-2 z-10">
            News
        </p>
        <div className="flex flex-nowrap overflow-hidden justify-center w-full p-2 bg-news-back">
            {newsItems.map((newsItem, index) => (
            <div key={newsItem._id} className="bg-news text-sm sm:text-base p-2">
                <p>{newsItem.title}</p>
                {isAuthenticated && (
                <button
                    onClick={() => handleDeleteNews(newsItem._id)}
                    className="ml-2 text-red-600 hover:text-red-800"
                >
                    Delete
                </button>
                )}
            </div>
            ))}
        </div>

        {isAuthenticated && (
            <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-white shadow-md z-20">
            <div className="flex items-center">
                <input
                type="text"
                value={newNewsTitle}
                onChange={(e) => setNewNewsTitle(e.target.value)}
                placeholder="Enter news title"
                className="mr-2 p-2 border rounded flex-grow"
                />
                <button
                onClick={handleAddNews}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                Add News
                </button>
            </div>
            </div>
        )}
        </div>
    );
};

export default NewsComponent;