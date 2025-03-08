/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import CreatePost from '../components/CreatePost';
import SlideBar from '../components/SlideBar';
import Poster from '../components/Poster';
import CommentPopup from '../components/CommentPopup';
import ChallengeList from '../components/ChallengeList';
import NavBar from '../../../components/Shared/NavBar';

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
    <div>
      <NavBar />
      <div className="flex min-h-screen bg-gray-100">
        {/* Left Sidebar */}
        <div className="fixed left-0 w-64 h-screen mt-[73px]">
          <SlideBar />
        </div>

        {/* Main Content + Challenges */}
        <div className="flex flex-1 justify-start px-6 py-4 ml-64 mt-[73px]">
          {/* Main Feed Section */}
          <div className="w-full max-w-2xl">
            <CreatePost />
            <div className="mt-6 space-y-4">
              {posts.map((post) => (
                <Poster
                  key={post.id}
                  {...post}
                  onCommentClick={() => setSelectedPost(post)}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar: Challenges */}
          <aside className="hidden lg:block w-96 ml-8">
            <ChallengeList />
          </aside>
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
