/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';

import { FaImage } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';

const CreatePost = () => {
  const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    console.log('Post submitted:', { postContent, image });
    // Handle API call for post submission
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full max-w-2xl mx-auto mt-4">
      <textarea
        className="w-full border outline outline-1 outline-outline p-3 rounded-lg text-text-gray focus:outline-primary-green"
        rows="3"
        placeholder="What's on your mind?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      ></textarea>
      {image && (
        <div className="mt-2">
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
      )}
      <div className="flex justify-between items-center mt-3">
        <label className="flex items-center gap-2 text-primary-green cursor-pointer">
          <FaImage size={20} />
          <span>Photo</span>
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>
        <button
          className="flex items-center gap-2 bg-primary-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition h-9 w-40"
          onClick={handleSubmit}
        >
          <span className="text-center w-full">Create Post</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
