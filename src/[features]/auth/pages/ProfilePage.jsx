//import React from 'react';
import { useNavigate } from 'react-router-dom';
//import { useState } from "react";

import UserBadgesCard from '../../leaderboard/components/UserBadgesCard';
import NavBar from '../../../components/Shared/NavBar';

const ProfilePage = () => {
  const navigate = useNavigate();

  const userBadges = [
    {
      id: '1',
      name: 'Quick Starter',
      icon: 'https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png',
      isUnlocked: true,
    },
    {
      id: '2',
      name: 'Pull Shark',
      icon: 'https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png',
      isUnlocked: true,
    },
    {
      id: '3',
      name: 'Galaxy Brain',
      icon: 'https://github.githubassets.com/images/modules/profile/achievements/galaxy-brain-default.png',
      isUnlocked: true,
    },
    {
      id: '4',
      name: 'Galaxy Brain',
      icon: 'https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png',
      isUnlocked: true,
    },
    {
      id: '5',
      name: 'Galaxy Brain',
      icon: 'https://github.githubassets.com/images/modules/profile/achievements/arctic-code-vault-contributor-default.png',
      isUnlocked: true,
    },
    {
      id: '6',
      name: 'Galaxy Brain',
      icon: 'https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png',
      isUnlocked: true,
    },
  ];

  return (
    <div>
      {/* Global Nav */}
      <div>
        <NavBar />
      </div>

      {/* Main Profile Container */}
      <div className="max-w-5xl mx-auto p-2 bg-gray-100 rounded-lg">
        {/* Profile Header */}
        <div className="bg-bg-light rounded-lg p-4 relative">
          <div className="relative">
            <img
              src="/src/assets/banner.jpg"
              alt="Banner"
              className="w-full h-36 object-cover rounded-lg"
            />
            <div className="absolute left-6 -bottom-10 flex items-center">
              <img
                src="/src/assets/dizzpy.jpg"
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white"
              />
              <div className="ml-4">
                <h2 className="text-lg text-white font-bold flex items-center">
                  Alpha Online
                </h2>
                <p className="text-gray-500">@alpha123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Navigation + Edit Profile Button */}
        <div className="mt-16 border-b flex items-center justify-between text-gray-600 text-sm font-semibold">
          <div className="flex gap-6 px-6">
            <button className="pb-2 border-b-2 border-transparent hover:border-gray-500">
              About
            </button>
            <button
              onClick={() => navigate('/challenges')}
              className="pb-2 border-b-2 border-transparent hover:border-gray-500"
            >
              Challenges
            </button>
            <button
              onClick={() => navigate('/shop')}
              className="pb-2 border-b-2 border-transparent hover:border-gray-500"
            >
              Order History
            </button>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => navigate('/ep')}
            className="flex items-center bg-gray-300 text-gray-600 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 16h2M16.5 7.5l-9 9H5v-2.5l9-9m1-1a2.121 2.121 0 113 3L14 10l-3-3 2.5-2.5z"
              />
            </svg>
            Edit Profile
          </button>
        </div>
      </div>

      {/* White Space for Separation */}
      <div className="h-6 bg-white"></div>

      {/* Second Profile Container */}
      <div className="max-w-5xl mx-auto p-2 bg-gray-100 rounded-lg">
        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Left Column: About + Badges (Sticky) */}
          <div className="col-span-1 space-y-4 h-fit sticky top-4">
            {/* About Section */}
            <div className="bg-bg-light rounded-lg p-4">
              <h3 className="text-lg font-semibold">About</h3>
              <p className="text-gray-500 text-sm mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at
                suscipit nulla.
              </p>
              <p className="text-gray-500 mt-2 text-sm">alpha123@gmail.com</p>
              <div className="mt-2">
                <span className="text-green-500 font-bold">
                  Points Earned: 80%
                </span>
              </div>
            </div>

            {/* Badges Section */}
            <div className="bg-bg-light rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">User Badges</h3>
              <UserBadgesCard badges={userBadges} />
            </div>
          </div>

          {/* Right Column: Posts */}
          <div className="col-span-2 space-y-4 p-2">
            {[1, 2, 3, 4].map((post) => (
              <div key={post} className="bg-bg-light rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold">Nikitha Nuwan Wijesuriya</h4>
                    <p className="text-gray-500 text-sm">@nikitha</p>
                  </div>
                </div>
                <p className="text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <div className="w-full h-40 bg-gray-200 rounded-lg mt-2"></div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <p>1.7K Likes</p>
                  <p>1.7K Comments</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
