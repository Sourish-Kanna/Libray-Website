import React, { useState, useEffect } from 'react';
import useNewsStore from './Store/useNewsStore.js';
import useAuthStore from './Store/userAuth.store.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/HomePage.css';

const NewsComponent = () => {
    const [newNewsTitle, setNewNewsTitle] = useState('');
    const { isAuthenticated } = useAuthStore();
    const { newsItems, addNews, deleteNews, fetchNews } = useNewsStore();

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    const renderContent = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.split(urlRegex).map((part, index) => {
            if (part.match(urlRegex)) {
                return (
                    <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700 underline hover:text-blue-900" onClick={(e) => e.stopPropagation()}>
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    const handleAddNews = async () => {
        if (newNewsTitle.trim()) {
            if (newNewsTitle.length < 500) {
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
                toast.error('News title must be less than 500 characters.', {
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
        // 🔴 CHANGED LINE BELOW: Removed 'overflow-hidden' and added 'z-40'
        <div className='relative z-5 flex items-center w-full h-16 text-lg bg-yellow-100 shadow-md sm:text-xl'>
            <ToastContainer />

            {/* --- Fixed Label on the Left --- */}
            <div className="absolute left-0 z-20 flex items-center h-full px-6 font-bold text-white bg-red-600 shadow-lg">
                NEWS
            </div>

            {/* --- Scrolling Content --- */}
            {/* Kept overflow hidden HERE so text stays neat */}
            <div className="w-full news-ticker-container pl-28">
                <div className="items-center py-2 news-ticker-content">

                    {/* ORIGINAL LIST */}
                    {newsItems.map((newsItem) => (
                        <div key={newsItem._id} className="flex items-center gap-2 px-4 border-r-2 border-red-200 shrink-0">
                            <span className="font-medium text-gray-800">
                                {renderContent(newsItem.title)}
                            </span>
                            {isAuthenticated && (
                                <button
                                    onClick={() => handleDeleteNews(newsItem._id)}
                                    className="px-2 py-0.5 ml-2 text-xs text-white bg-red-500 rounded hover:bg-red-700"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}

                    {/* DUPLICATE LIST (For Infinite Loop) */}
                    {newsItems.map((newsItem) => (
                        <div key={`dup-${newsItem._id}`} className="flex items-center gap-2 px-4 border-r-2 border-red-200 shrink-0">
                            <span className="font-medium text-gray-800">
                                {renderContent(newsItem.title)}
                            </span>
                        </div>
                    ))}

                    {newsItems.length === 0 && (
                        <div className="px-4 text-gray-500">No recent updates...</div>
                    )}
                </div>
            </div>

            {/* --- Admin Input Section --- */}
            {/* Now this will be visible because parent overflow is not hidden */}
            {isAuthenticated && (
                <div className="absolute left-0 right-0 z-5 w-full p-2 mx-auto transition-opacity bg-white border border-gray-200 rounded-lg shadow-xl top-16 md:w-1/2 opacity-90 hover:opacity-100">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newNewsTitle}
                            onChange={(e) => setNewNewsTitle(e.target.value)}
                            placeholder="Type news or paste a link (https://...)"
                            className="flex-1 p-2 text-base border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        <button
                            onClick={handleAddNews}
                            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                        >
                            Add
                        </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                        *URLs starting with http:// or https:// will automatically become clickable links.
                    </p>
                </div>
            )}
        </div>
    );
};

export default NewsComponent;