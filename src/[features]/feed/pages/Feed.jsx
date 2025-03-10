/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePost from '../components/CreatePost';
import SlideBar from '../components/SlideBar';
import Poster from '../components/Poster';
import CommentPopup from '../components/CommentPopup';
import ChallengeList from '../components/ChallengeList';
import NavBar from '../../../components/Shared/NavBar';
import { API_CONFIG } from '../../../config/api.config';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}/api/posts`);
        setPosts(response.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle new post addition dynamically
  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

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
            <CreatePost onPostCreated={handleNewPost} />

            {loading ? (
              <p className="text-center text-gray-500">Loading posts...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <div className="mt-6 space-y-4">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <Poster
                      key={post.postId}
                      {...post}
                      onCommentClick={() => setSelectedPost(post)}
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No posts available.
                  </p>
                )}
              </div>
            )}
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
