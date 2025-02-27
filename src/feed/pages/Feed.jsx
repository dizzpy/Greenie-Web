/* eslint-disable no-unused-vars */
import React from 'react';
import CreatePost from '../components/CreatePost';
import SlideBar from '../components/SlideBar';

function Feed() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SlideBar />

      {/* Main Content */}
      <div className="flex justify-center w-full p-6">
        <div className="w-full max-w-2xl">
          <CreatePost />
        </div>
      </div>
    </div>
  );
}

export default Feed;
