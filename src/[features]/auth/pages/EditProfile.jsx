//import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const EditProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: 'Big',
    lastName: 'Harsha',
    username: '@harsha',
    email: 'bigharsha@gmail.com',
    bio: 'Mage nama big harsha wikunuwe ala bathala, 3 wheel palenw yako mage barata. Hotal karayo mata full love, mn hooran kanw neh unge walan.',
    profileImage: '/assets/profile.jpg', // Default profile image
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setUser({ ...user, profileImage: imageUrl });
    }
  };

  // Form validation
  const validate = () => {
    let newErrors = {};
    if (!user.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!user.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (user.bio.length < 10)
      newErrors.bio = 'Bio must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log('Updated Profile:', user);
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/p')}
          className="text-gray-500 hover:text-gray-700"
        >
          &larr;
        </button>
        <span className="text-xl font-semibold">Edit your profile</span>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mt-6">
        <div className="relative">
          <img
            src={selectedImage || user.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
          />
          <label className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md cursor-pointer">
            ✏️
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Name Fields */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="text-gray-700 text-sm">First Name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="text-gray-700 text-sm">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="text-gray-700 text-sm">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-gray-700 text-sm">Email address</label>
          <input
            type="email"
            name="email"
            value={user.email}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="text-gray-700 text-sm">About</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded-md h-24"
          ></textarea>
          {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className={`w-full p-2 rounded-md text-white ${
            Object.keys(errors).length > 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
          disabled={Object.keys(errors).length > 0}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
