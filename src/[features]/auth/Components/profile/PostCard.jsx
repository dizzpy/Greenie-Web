/* eslint-disable no-unused-vars */
import React from 'react';
import { Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import PropTypes from 'prop-types';

const PostCard = ({ post }) => {
  const { content, imageUrl, likes, comments } = post;

  return (
    <div className="bg-white shadow-sm rounded-xl p-4 mb-6 relative">
      {/* Three-dot options icon */}
      <div className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-600">
        <MoreHorizontal className="w-5 h-5" />
      </div>

      {/* Post Image */}
      {imageUrl && (
        <div className="mb-3">
          <img
            src={imageUrl}
            alt="Post"
            className="w-full rounded-lg object-cover"
          />
        </div>
      )}

      {/* Post Description */}
      <p className="text-gray-700 text-sm mb-3">{content}</p>

      {/* Reactions */}
      <div className="flex items-center gap-6 text-sm text-gray-500 mt-2">
        <div className="flex items-center gap-1 cursor-pointer">
          <Heart className="w-4 h-4" />
          <span>{likes}</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <MessageCircle className="w-4 h-4" />
          <span>{comments}</span>
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    imageUrl: PropTypes.string,
    content: PropTypes.string.isRequired,
    likes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    comments: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default PostCard;
