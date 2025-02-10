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
            if (newNewsTitle.length < 100) {
                try {
                    await addNews(newNewsTitle.trim());
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
            } else {
                toast.error('News title must be less than 100 characters.', {
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
        <div className='relative flex flex-nowrap bg-yellow-100 text-base sm:text-lg md:text-xl'>
            {/* Toast Container */}
            <ToastContainer />

            <div className="relative w-full flex flex-nowrap">
                <p className="absolute left-0 top-1/2 transform -translate-y-1/2 text-lg sm:text-xl md:text-2xl font-bold text-red-600 bg-yellow-100 p-2 z-10">
                    News
                </p>
                <div className="flex flex-nowrap overflow-hidden justify-center w-full p-2 bg-news-back whitespace-nowrap">
                    {newsItems.map((newsItem, index) => (
                        <div key={newsItem._id} className="bg-news text-sm sm:text-base p-2 inline-block">
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
            </div>
            {isAuthenticated && (
                <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-white shadow-md w-fit max-w-md mx-auto md:max-w-lg lg:max-w-xl rounded-xl">
                    <div className="flex flex-row items-center gap-6">
                        <input
                            type="text"
                            value={newNewsTitle}
                            onChange={(e) => {
                                setNewNewsTitle(e.target.value);
                            }} 
                            placeholder="Enter news title"
                            className="w-full border rounded-md p-2 text-sm sm:text-base"
                        />
                        <button onClick={handleAddNews} 
                        className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 w-full md:w-auto text-sm sm:text-base">
                            Add News
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsComponent;