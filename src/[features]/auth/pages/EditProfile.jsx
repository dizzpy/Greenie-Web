import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const EditProfile = () => {
  const navigate = useNavigate();

  const initialUser = {
    firstName: 'Anuja',
    lastName: 'Rathnayake',
    username: '@Dizzpy',
    email: 'admin@dizzpy.dev',
    bio: 'I code bugs for living :).',
    profileImage: 'https://avatars.githubusercontent.com/u/28524634?v=4',
  };

  const [user, setUser] = useState(initialUser);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  // Check if any field changed
  useEffect(() => {
    const hasChanged =
      JSON.stringify(user) !== JSON.stringify(initialUser) ||
      selectedImage !== null;
    setIsChanged(hasChanged);
  }, [user, selectedImage]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setUser({ ...user, profileImage: imageUrl });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!user.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!user.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (user.bio.length < 10)
      newErrors.bio = 'Bio must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log('Updated Profile:', user);
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => navigate('/profile')}
          className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
        >
          &larr;
        </button>

        <span className="text-2xl font-semibold text-gray-800">
          Edit your profile
        </span>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center">
        <div className="relative group">
          <img
            src={selectedImage || user.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover shadow-lg transition"
          />
          <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer group-hover:scale-105 transition">
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
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="text-gray-700 text-sm">First Name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="text-gray-700 text-sm">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label className="text-gray-700 text-sm">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm">Email address</label>
          <input
            type="email"
            name="email"
            value={user.email}
            readOnly
            className="w-full mt-1 p-3 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm">About</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-lg h-28 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
          )}
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className={`w-full p-3 rounded-lg text-white font-semibold transition ${
            Object.keys(errors).length > 0 || !isChanged
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
          disabled={Object.keys(errors).length > 0 || !isChanged}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
