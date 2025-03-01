/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import CreatePost from '../components/CreatePost';
import SlideBar from '../components/SlideBar';
import Poster from '../components/Poster';
import CommentPopup from '../components/CommentPopup';

function Feed() {
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
      comments: [
        {
          user: 'Alice',
          profileImage: 'user1.jpg',
          text: 'Amazing post!',
          time: '1h ago',
        },
        {
          user: 'Bob',
          profileImage: 'user2.jpg',
          text: 'Great content, keep sharing!',
          time: '2h ago',
        },
      ],
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
      comments: [
        {
          user: 'Chris',
          profileImage: 'user3.jpg',
          text: 'Looks like fun!',
          time: '30m ago',
        },
        {
          user: 'Diana',
          profileImage: 'user4.jpg',
          text: 'I miss the beach so much!',
          time: '45m ago',
        },
      ],
    },
  ]);

  const [selectedPost, setSelectedPost] = useState(null);

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
              <Poster
                key={post.id}
                {...post}
                onCommentClick={() => setSelectedPost(post)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Comment Popup */}
      {selectedPost && (
        <CommentPopup
          comments={selectedPost.comments}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}

export default Feed;
