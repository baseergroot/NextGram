"use client"
import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import BottomNavbar from "@/components/BottomNavbar"
import { Saved } from '@/actions/savedPosts';
import Image from 'next/image';

export default function SavedPostsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savesLength, setSaveLength] = useState()

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setLoading(true);
      await Saved()
        .then(response => {
          if (response.success) {
            console.log("success hit:", response)

            setSavedPosts(response.user.saved);
          } else {
            console.log("error:", response.error)
          }
        }).catch((err) => {
          console.error('Error fetching saved posts:', err);
          setError('Failed to load saved posts');
        }).finally(() => {
          setLoading(false);
        })
    };

    fetchSavedPosts();
  }, [savesLength]);

  const handleBackClick = () => {
    console.log('Back button clicked');
  };

  const handlePostClick = (postId) => {
    console.log('Post clicked:', postId);
    axios.post("/api/post/save", { postId: postId.toString() })
      .then(res => {
        setSaveLength(res.data.savedByLength)
        console.log("res is:", res.data)
      })
  };

  const getImageUrl = (file) => {
    // Handle different file formats
    if (file.startsWith('http://') || file.startsWith('https://')) {
      return file;
    }
    // If it's a relative path, you might need to prepend your base URL
    return file.startsWith('/') ? file : `/${file}`;
  };

  if (loading) {
    return (
      <div className="max-w-sm mx-auto bg-white min-h-screen border border-gray-200">
        {/* Header */}
        <header className="flex items-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <button
            onClick={handleBackClick}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Saved</h1>
        </header>

        {/* Loading State */}
        <div className="flex justify-center items-center h-64">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-sm mx-auto bg-white min-h-screen border border-gray-200">
        {/* Header */}
        <header className="flex items-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <button
            onClick={handleBackClick}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Saved</h1>
        </header>

        {/* Error State */}
        <div className="flex flex-col justify-center items-center h-64 px-4">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 text-center">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen border border-gray-200">
      {/* Header */}
      <header className="flex items-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button
          onClick={handleBackClick}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <svg
            className="w-6 h-6 text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Saved</h1>
      </header>

      {/* Tab Navigation */}
      <nav className="flex border-b border-gray-100 bg-white sticky top-16 z-10">
        <button
          className={`flex-1 py-4 px-6 text-sm font-semibold transition-all duration-300 relative ${activeTab === 'all'
              ? 'text-gray-900'
              : 'text-gray-600 hover:text-gray-800'
            }`}
          onClick={() => setActiveTab('all')}
        >
          All Posts
          {activeTab === 'all' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
          )}
        </button>
      </nav>

      {/* Content */}
      {savedPosts.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-64 px-4">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <p className="text-gray-600 text-center text-lg font-medium mb-2">No saved posts yet</p>
          <p className="text-gray-500 text-center text-sm">Save posts to view them here</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50">
          {savedPosts.map((post) => (
            <Fragment
              key={post._id as string} >
              <div onClick={() => handlePostClick(post._id)} className="aspect-square group cursor-pointer rounded-2xl relative overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg bg-gray-200">
                <Image
                  src={getImageUrl(post.file)}
                  alt="Saved post"
                  width={30}
                  height={30}
                  className="w-full h-full object-cover"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl"></div>

                {/* Save icon indicator */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      )}

      {/* Load more indicator - only show if there are posts */}
      {savedPosts.length > 0 && (
        <div className="flex justify-center py-8">
          <p className="text-sm text-gray-500">{savedPosts.length} saved posts</p>
        </div>
      )}
      <BottomNavbar />
    </div>
  );
}