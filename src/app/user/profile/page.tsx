"use client"

import NavbarComponent from '@/components/Navbar';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Suspense } from 'react';
import Image from 'next/image';
import { UserI } from '@/types/UserType';
import { useRouter } from 'next/router';
import BottomNavbar from "@/components/BottomNavbar"

export default function SocialMediaProfile() {
  const [activeTab, setActiveTab] = useState<string>('posts');
  const [user, setUser] = useState<UserI>()

  const stats: { number: number; label: string }[] = [
    { number: user?.posts.length, label: 'Posts' },
    { number: user?.followers.length, label: 'Followers' },
    { number: user?.followings.length, label: 'Following' }
  ];

  const contentItems: { id: number }[] = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1
  }));
  useEffect(() => {
    axios.get("/api/user/profile")
    .then(res => setUser(res.data.user)).catch(err => console.log(err.message))
  }, [])

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen border border-gray-200 relative">
      {/* Header */}
      <NavbarComponent profilePic={user?.profilePic}/>

      {/* Profile Section */}
      <section className="px-5 py-8 text-center border-b border-gray-100">
        <div className="w-30 h-30 rounded-full mx-auto mb-5 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-4xl text-white font-bold shadow-lg">
          <Image src={!user?.profilePic ? "/defaultprofile" : user?.profilePic} alt='Profile image' width={100} height={100} className='w-full h-full overflow-hidden rounded-full object-cover'></Image>
        </div>
        
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
        <p className="text-base text-gray-600 mb-1">@{user?.username}</p>
        
        <p className="text-base text-gray-500 mb-5">Content Creator</p>
        
        <button 
          className="bg-gray-900 text-white px-10 py-3 rounded-full text-base font-semibold hover:bg-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg mb-6"
          onClick={() => useRouter().push("/user/profile/edit")}
        >
          Edit
        </button>
        
        {/* Stats */}
        <div className="flex justify-between gap-2 mb-5">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-4 rounded-xl bg-gray-50 flex-1 hover:bg-gray-100 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="text-2xl font-bold text-gray-900 block">{stat.number}</span>
              <span className="text-sm text-gray-600 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bio */}
      <div className="px-5 pb-5 text-center text-gray-700 text-sm leading-relaxed">
    {user?.bio ? user.bio : "edit profile"}
      </div>


      {/* Navigation Tabs */}
      <nav className="flex border-b border-gray-100 bg-white">
        {[
          { id: 'posts', icon: '▦', label: 'Posts' },
          { id: 'reels', icon: '▶', label: 'Reels' },
          { id: 'saved', icon: '♡', label: 'Saved' }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 p-4 text-center text-sm font-semibold transition-all duration-300 relative ${
              activeTab === tab.id ? 'text-gray-900' : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="text-lg block mb-1">{tab.icon}</span>
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-gray-900 rounded-full"></div>
            )}
          </button>
        ))}
      </nav>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-0.5 p-5 bg-gray-50 mb-15">
        {!user ? "no post to see" : user.posts?.map((item) => (
          <div
            key={item._id}
            className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center text-4xl text-gray-600 font-bold cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-300 "
            onClick={() => console.log(`Content item ${item.file} clicked`)}
          >
            <Image src={item.file} alt='post' width={100} height={100} className=' h-full object-contain w-full rounded-xl p-1'></Image>
            
          </div>
        ))}
      </div>
      <BottomNavbar  />
    </div>
  );
}