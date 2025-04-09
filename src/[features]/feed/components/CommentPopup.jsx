/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import { API_CONFIG } from '../../../config/api.config';

const CommentPopup = ({ postId, comments, onClose, onCommentAdded }) => {
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem('user')); // Get from localStorage

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.id) {
      console.error('❌ User not found in localStorage or missing ID.');
      return;
    }

    console.log('Submitting comment:', newComment);

    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS.COMMENTS.CREATE(postId)}`,
        newComment,
        {
          headers: {
            'Content-Type': 'text/plain',
            userId: user.id,
          },
        },
      );

      if (response.status === 200 && onCommentAdded) {
        const commentPayload = {
          ...response.data,
          user: {
            fullName: user.fullName,
            username: user.username,
            profileImage: user.profileImage,
          },
        };

        onCommentAdded(commentPayload);
        setNewComment('');
      }
    } catch (err) {
      console.error('❌ Error submitting comment:', err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-4 w-full max-w-lg shadow-lg relative max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Comments</h2>

        {/* Comment List */}
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
            disabled={loading}
            className={`text-primary-green font-semibold ml-2 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

CommentPopup.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onCommentAdded: PropTypes.func,
};

export default CommentPopup;
