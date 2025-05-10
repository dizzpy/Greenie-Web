import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import defaultProfileImg from '../../../assets/profile/profile.jpeg';
import coverImg from '../../../assets/profile/coverImg.jpg';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const { user, updateUser } = useAuth();

  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    bio: '',
  });

  const [profileImage, setProfileImage] = useState(defaultProfileImg);
  const [coverImage, setCoverImage] = useState(coverImg);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
      });
      setProfileImage(user.profileImgUrl || defaultProfileImg);
      setCoverImage(user.coverImgUrl || coverImg);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/'))
      return setError('Please select a valid image file');
    if (file.size > 5 * 1024 * 1024)
      return setError('Image must be less than 5MB');

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      setSelectedImageFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/'))
      return setError('Please select a valid cover image');
    if (file.size > 5 * 1024 * 1024)
      return setError('Cover image must be less than 5MB');

    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage(reader.result);
      setSelectedCoverFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setError('');
    if (!formData.fullName.trim()) return setError('Full name is required');
    if (!formData.username.trim()) return setError('Username is required');
    if (formData.username.includes(' '))
      return setError('Username cannot contain spaces');
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username))
      return setError('Username format is invalid');

    try {
      setIsSubmitting(true);
      const formPayload = new FormData();
      const userData = {
        fullName: formData.fullName.trim(),
        username: formData.username.trim().toLowerCase(),
        bio: formData.bio.trim(),
      };

      formPayload.append('userData', JSON.stringify(userData));
      if (selectedImageFile)
        formPayload.append('profileImage', selectedImageFile);
      if (selectedCoverFile)
        formPayload.append('coverImage', selectedCoverFile);

      const response = await axios.put('/api/users/update', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data && updateUser) {
        updateUser((prev) => ({
          ...prev,
          ...response.data,
          id: prev.id,
          email: prev.email,
          role: prev.role,
          tokens: prev.tokens,
          profileImgUrl: response.data.profileImgUrl || prev.profileImgUrl,
          coverImgUrl: response.data.coverImgUrl || prev.coverImgUrl,
        }));
      }
      setTimeout(() => navigate('/profile'), 200);
    } catch (err) {
      const backendError = err.response?.data;
      const errorMessage =
        backendError?.error ||
        backendError?.message ||
        'Failed to save profile';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-black disabled:opacity-50"
          disabled={isSubmitting}
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-semibold">Edit Profile</h2>
      </div>

      {/* Cover Image */}
      <div className="relative mb-6 rounded-lg overflow-hidden">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-48 object-cover"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={coverInputRef}
          onChange={handleCoverChange}
          disabled={isSubmitting}
        />
        <button
          onClick={() => coverInputRef.current.click()}
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 text-sm rounded"
          disabled={isSubmitting}
        >
          ✎ Edit Cover
        </button>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mb-6 relative group">
        <div className="relative">
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            onError={(e) => {
              e.target.src = defaultProfileImg;
              setProfileImage(defaultProfileImg);
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
              disabled={isSubmitting}
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              disabled={isSubmitting}
            >
              <span className="text-sm">✎ Edit Photo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-green focus:border-transparent disabled:opacity-50"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="username (no spaces)"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-green focus:border-transparent disabled:opacity-50"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about yourself..."
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-green focus:border-transparent disabled:opacity-50"
            disabled={isSubmitting}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-md font-medium text-white transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary-green hover:bg-green-600'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Saving Changes...
            </div>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;
