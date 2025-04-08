/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Heart, MessageCircle } from 'lucide-react';
import CommentPopup from './CommentPopup';
import { API_CONFIG } from '../../../config/api.config';

const Poster = ({
  postId,
  userId,
  content,
  image,
  likes: initialLikes,
  comments,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes || 0);

  const [user, setUser] = useState({
    name: 'Unknown',
    username: 'anonymous',
    profileImage: 'https://via.placeholder.com/150',
  });

  // ✅ Load like status from localStorage
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    if (likedPosts.includes(postId)) {
      setLiked(true);
    }
  }, [postId]);

  // ✅ Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.ENDPOINTS.POSTS.USER_DETAILS}/${userId}`,
        );
        const userData = response.data;
        setUser({
          name: userData.fullName?.trim() || 'Unknown',
          username: userData.username?.trim() || 'anonymous',
          profileImage:
            userData.profileImage || 'https://via.placeholder.com/150',
        });
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, [userId]);

  // ✅ Handle Like/Unlike Toggle
  const handleLike = async () => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];

    try {
      if (liked) {
        // UNLIKE
        await axios.put(`${API_CONFIG.BASE_URL}/api/posts/${postId}/unlike`);
        setLikes((prev) => Math.max(prev - 1, 0));
        setLiked(false);

        const updated = likedPosts.filter((id) => id !== postId);
        localStorage.setItem('likedPosts', JSON.stringify(updated));
      } else {
        // LIKE
        await axios.put(`${API_CONFIG.BASE_URL}/api/posts/${postId}/like`);
        setLikes((prev) => prev + 1);
        setLiked(true);

        localStorage.setItem(
          'likedPosts',
          JSON.stringify([...likedPosts, postId]),
        );
      }
    } catch (error) {
      console.error(
        'Like/unlike failed:',
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full max-w-2xl mt-4 mx-auto">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-text-gray font-sans">{user.name}</p>
          <p className="text-sm text-text-gray font-sans">@{user.username}</p>
        </div>
      </div>

      {/* Content */}
      <p className="mt-3 text-text-gray font-sans">{content}</p>

      {/* Image */}
      {image && (
        <div className="mt-3">
          <img
            src={image}
            alt="Post"
            className="w-full rounded-lg object-cover"
          />
        </div>
      )}

      {/* Likes & Comments */}
      <div className="flex justify-between items-center mt-3 text-sm">
        <div
          className={`flex items-center gap-1 cursor-pointer ${
            liked ? 'text-red-600' : 'text-lightred'
          }`}
          onClick={handleLike}
        >
          <Heart
            size={18}
            fill={liked ? 'red' : 'none'}
            className={`transition ${liked ? 'text-red-600' : 'text-lightred'}`}
          />
          <span className="text-text-gray">
            {likes} {likes === 1 ? 'Like' : 'Likes'}
          </span>
        </div>

        <div
          className="flex items-center gap-1 text-primary-green cursor-pointer"
          onClick={() => setShowComments(true)}
        >
          <MessageCircle className="text-primary-green" size={18} />
          <span className="text-text-gray">{comments.length} Comments</span>
        </div>
      </div>

      {/* Comment Popup */}
      {showComments && (
        <CommentPopup
          comments={comments}
          onClose={() => setShowComments(false)}
        />
      )}
    </div>
  );
};

Poster.propTypes = {
  postId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
};

export default Poster;
