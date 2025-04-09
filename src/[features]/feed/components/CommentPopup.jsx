/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import { API_CONFIG } from '../../../config/api.config';

const CommentPopup = ({
  postId,
  userId,
  comments,
  onClose,
  onCommentAdded,
}) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        API_CONFIG.POSTS.COMMENTS.CREATE(postId),
        newComment,
        {
          headers: {
            'Content-Type': 'text/plain',
            userId: userId,
          },
        },
      );

      if (response.status === 200 && onCommentAdded) {
        onCommentAdded(response.data);
        setNewComment('');
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-4 w-full max-w-lg shadow-lg relative max-h-[90vh] overflow-hidden">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Comments</h2>

        {/* Comments List */}
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="p-3 border-b flex items-start gap-3">
                <img
                  src={
                    comment.user?.profileImage ||
                    'https://via.placeholder.com/150'
                  }
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      {comment.user?.fullName || 'Unknown'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {comment.timestamp
                        ? new Date(comment.timestamp).toLocaleString()
                        : ''}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{comment.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center py-4">
              No comments yet.
            </p>
          )}
        </div>

        {/* Input Box */}
        <div className="mt-4 flex items-center border rounded-xl p-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 outline-none p-2"
          />
          <button
            onClick={handleSubmit}
            className="text-primary-green font-semibold ml-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

CommentPopup.propTypes = {
  postId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onCommentAdded: PropTypes.func,
};

export default CommentPopup;
