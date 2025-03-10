/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { API_CONFIG } from '../../../config/api.config'; // ✅ Import API config

const CreatePost = () => {
  const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Image size must be less than 5MB.');
        return;
      }
      setImage(file); // Store the actual file for submission
      setImagePreview(URL.createObjectURL(file)); // Generate a preview
      setErrorMessage(''); // Reset error message
    }
  };

  // Remove uploaded image
  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!postContent.trim() && !image) {
      setErrorMessage('Please enter some text or upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('content', postContent);
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('token'); // Get token from storage
      if (!token) {
        setErrorMessage('No token found. Please log in.');
        return;
      }

      console.log('📢 Sending request with token:', token); // Debug log

      const response = await axios.post(
        API_CONFIG.ENDPOINTS.POSTS.CREATE,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Send authentication token
          },
        },
      );

      if (response.status === 201) {
        setSuccessMessage('Post created successfully!');
        setErrorMessage('');
        setPostContent(''); // Reset content
        setImage(null); // Reset image
        setImagePreview(null); // Reset image preview
      } else {
        setErrorMessage('Failed to create post. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error creating post:', error.response?.data || error);
      setErrorMessage(error.response?.data?.message || 'Error creating post');
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full max-w-2xl mx-auto mt-4">
      <textarea
        className="w-full border outline outline-1 outline-gray-300 p-3 rounded-lg text-gray-700 focus:outline-primary-green"
        rows="3"
        placeholder="What's on your mind?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      ></textarea>

      {/* Display uploaded image preview */}
      {imagePreview && (
        <div className="relative mt-2">
          <img
            src={imagePreview}
            alt="Uploaded"
            className="w-full h-40 object-cover rounded-lg"
          />
          <button
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 transition"
            onClick={handleRemoveImage}
          >
            <MdClose size={20} />
          </button>
        </div>
      )}

      {/* Display error message */}
      {errorMessage && (
        <div className="mt-2 p-2 bg-red-100 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}

      {/* Display success message */}
      {successMessage && (
        <div className="mt-2 p-2 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="flex justify-between items-center mt-3">
        <label className="flex items-center gap-2 text-primary-green cursor-pointer">
          <FaImage size={20} />
          <span>Photo</span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
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
