import React, { useState, useEffect } from 'react';
import useNewsStore from './Store/useNewsStore.js';
import useAuthStore from './Store/userAuth.store.js';

const NewsComponent = () => {
    const [newNewsTitle, setNewNewsTitle] = useState('');
    const { isAuthenticated } = useAuthStore();
    const { newsItems, addNews, deleteNews, fetchNews } = useNewsStore();

    // Fetch news items on component mount
    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    const handleAddNews = () => {
        if (newNewsTitle.trim()) {
        addNews(newNewsTitle);
        setNewNewsTitle('');
        }
    };

    return (
        <div className='flex mt-5 bg-yellow-100 text-xl relative'>
        <p className="w-fit pl-2 text-2xl font-bold text-red-600 bg-yellow-100 p-2 z-10">
            News
        </p>
        <div className="flex justify-around w-11/12 p-2 bg-news-back">
            {newsItems.map((newsItem) => (
            <div key={newsItem._id} className="bg-news flex items-center">
                <p>{newsItem.title}</p>
                {isAuthenticated && (
                <button
                    onClick={() => deleteNews(newsItem._id)}
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
                {/* <button className="ml-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Edit News
                </button> */}
            </div>
            </div>
        )}
        </div>
    );
};

export default NewsComponent;