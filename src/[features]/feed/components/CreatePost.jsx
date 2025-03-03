/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import axios from 'axios';

const CreatePost = () => {
  const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('content', postContent);
    if (image) {
      // Directly append the image file, no need to convert to base64
      formData.append('image', image);
    }

    try {
      const response = await axios.post(
        'https://16.170.224.209:8080/api/posts',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200) {
        console.log('Post created successfully:', response.data);
        setSuccessMessage('Post created successfully!'); // Set success message
        // Reset the form after successful submission
        setPostContent('');
        setImage(null);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
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

      {/* Display Uploaded Image */}
      {image && (
        <div className="relative mt-2">
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-40 object-cover rounded-lg"
          />
          {/* Remove Button */}
          <button
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 transition"
            onClick={handleRemoveImage}
          >
            <MdClose size={20} />
          </button>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="flex justify-between items-center mt-3">
        {/* Upload Image Button */}
        <label className="flex items-center gap-2 text-primary-green cursor-pointer">
          <FaImage size={20} />
          <span>Photo</span>
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>

        {/* Create Post Button */}
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
