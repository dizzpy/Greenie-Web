/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import defaultProfileImg from '../../../assets/profile/profile.jpeg';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: 'Big',
    lastName: 'Harsha',
    username: '@harsha',
    email: 'bigharsha@gmail.com',
    bio: 'Mage nama big harsha wikunuwe ala bathala, 3 wheel palenw yako mage barata.\nHotal karayo mata full love , mn hooran kanw neh unge walan.',
  });

  const [profileImage, setProfileImage] = useState(defaultProfileImg);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Preview the image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Save Profile Data:', formData);
    navigate('/profile');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Back + Title */}
      <div className="flex items-center gap-2 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-black"
        >
          <ArrowLeft />
        </button>
        <h2 className="text-xl font-semibold">Edit your profile</h2>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mb-6 relative">
        <img
          src={profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
        />

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        {/* Edit Icon */}
        <button
          onClick={() => fileInputRef.current.click()}
          className="absolute h-8 w-8 bottom-2 right-[calc(44%-16px)] bg-white rounded-full p-1 shadow-md hover:scale-105 transition"
        >
          <span className="text-xs">✎</span>
        </button>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            className="w-full border rounded-md px-4 py-2"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border rounded-md px-4 py-2"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded-md px-4 py-2"
        />

        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          placeholder="Bio"
          className="w-full border rounded-md px-4 py-2"
        ></textarea>

        <button
          onClick={handleSave}
          className="bg-primary-green text-white px-6 py-2 rounded-md font-medium hover:bg-green-600 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;
