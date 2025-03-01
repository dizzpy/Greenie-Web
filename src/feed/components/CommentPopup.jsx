/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const CommentPopup = ({ comments, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-4 w-full max-w-lg shadow-lg relative">
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
                  src={comment.profileImage}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{comment.user}</p>
                    <p className="text-xs text-gray-400">{comment.time}</p>
                  </div>
                  <p className="text-sm text-gray-600">{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>

        {/* Input Box */}
        <div className="mt-4 flex items-center border rounded-xl p-2">
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 outline-none p-2"
          />
          <button className="text-primary-green font-semibold ml-2">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

CommentPopup.propTypes = {
  comments: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CommentPopup;
