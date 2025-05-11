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
import PostSkeleton from '../components/PostSkeleton'; // Adjust the path if needed

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const currentUserId = localStorage.getItem('userId'); // ✅ Extract userId

  useEffect(() => {
    let intervalId;

    const fetchPosts = async () => {
      try {
        const response = await axios.get(API_CONFIG.ENDPOINTS.POSTS.GET_ALL);
        const sortedPosts = [...response.data].sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
        );
        setPosts((prevPosts) => {
          const latestPostId = prevPosts[0]?.postId;
          const newPosts = sortedPosts.filter(
            (post) => post.postId !== latestPostId,
          );
          return newPosts.length > 0 ? sortedPosts : prevPosts;
        });
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); // Initial fetch
    intervalId = setInterval(fetchPosts, 2000); // Poll every 2 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => {
      const alreadyExists = prevPosts.some((p) => p.postId === newPost.postId);
      if (alreadyExists) return prevPosts;
      return [newPost, ...prevPosts];
    });
  };

  return (
    <div>
      <NavBar miditem={false} />
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
        {/* Left Sidebar */}
        <div className="hidden lg:block lg:fixed lg:left-0 lg:w-64 lg:h-screen mt-[73px]">
          <SlideBar />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row flex-1 w-full lg:ml-[320px] mt-[73px] px-4 py-4">
          {/* Feed Section */}
          <div className="w-full lg:max-w-2xl mx-auto">
            <CreatePost onPostCreated={handleNewPost} />

            {loading ? (
              <div className="mt-6 space-y-4">
                {[...Array(3)].map((_, idx) => (
                  <PostSkeleton key={idx} />
                ))}
              </div>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <div className="mt-6 space-y-4">
                {posts.map((post) => (
                  <Poster
                    key={post.postId}
                    postId={post.postId}
                    userId={post.userId}
                    viewerUserId={currentUserId} // ✅ Pass logged-in userId
                    content={post.description || post.content || ''}
                    image={
                      post.image?.startsWith('data:image')
                        ? post.image
                        : post.image
                          ? `data:image/jpeg;base64,${post.image}`
                          : null
                    }
                    likes={post.likes || 0}
                    comments={post.comments || []}
                    onCommentClick={() => setSelectedPost(post)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="hidden xl:block w-full xl:w-96 xl:ml-8 mt-8 xl:mt-0">
            <div className="sticky top-20">
              <ChallengeList />
            </div>
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
