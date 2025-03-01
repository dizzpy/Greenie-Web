/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Heart, MessageCircle } from 'lucide-react';
import CommentPopup from './CommentPopup'; // Import the CommentPopup component

const Poster = ({ user, content, image, likes, comments }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full max-w-2xl mx-auto mt-4">
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
        <div className="flex items-center gap-1 text-lightred">
          <Heart className="text-lightred" size={18} />
          <span className="text-text-gray">{likes} Likes</span>
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
  user: PropTypes.shape({
    profileImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
};

export default Poster;
