/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

const SharePopup = ({ postId, onClose }) => {
  const [copied, setCopied] = useState(false);

  const shareLink = `${window.location.origin}/posts/${postId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose(); // Auto-close the popup after copy
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-80 relative shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <MdClose size={20} />
        </button>

        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Share this post
        </h3>

        <input
          type="text"
          value={shareLink}
          readOnly
          className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md text-sm"
        />

        <button
          onClick={handleCopy}
          className="w-full bg-primary-green text-white py-2 rounded-md hover:bg-green-700 text-sm"
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
};

SharePopup.propTypes = {
  postId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SharePopup;
