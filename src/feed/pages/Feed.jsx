/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import CreatePost from '../components/CreatePost';
import SlideBar from '../components/SlideBar';
import Poster from '../components/Poster';

function Feed() {
  // Dummy posts array (replace with actual API data)
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        profileImage: 'profile1.jpg',
        name: 'Januuu Hettige',
        username: 'januu',
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'post1.jpg',
      likes: 1700,
      comments: 1200,
    },
    {
      id: 2,
      user: {
        profileImage: 'profile2.jpg',
        name: 'Alex Doe',
        username: 'alex',
      },
      content: 'Just had a great day at the beach! 🌊',
      image: 'post2.jpg',
      likes: 2100,
      comments: 800,
    },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SlideBar />

      {/* Main Content */}
      <div className="flex flex-col items-center w-full p-6">
        <div className="w-full max-w-2xl">
          {/* Create Post Section */}
          <CreatePost />

          {/* Posts Section */}
          <div className="mt-6">
            {posts.map((post) => (
              <Poster key={post.id} {...post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
