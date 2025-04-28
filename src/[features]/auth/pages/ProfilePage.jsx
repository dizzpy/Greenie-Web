// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import coverImg from '@/assets/profile/coverImg.jpg';

const defaultProfileImage = 'https://www.example.com/default-profile.jpg';
// const defaultCoverImage = 'https://www.example.com/default-cover.jpg';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Error: User not found or not logged in.</div>;

  return (
    <div className="bg-bg-light min-h-screen">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            <img
              src={coverImg}
              alt="Cover"
              className="w-full h-40 object-cover"
              onError={(e) => (e.target.src = coverImg)}
            />
            <div className="absolute -bottom-10 left-6 flex items-center">
              <img
                src={user.avatar || defaultProfileImage}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
                onError={(e) => (e.target.src = defaultProfileImage)}
              />
              <div className="ml-4 text-white">
                <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>
          </div>
          <div className="mt-14 p-4 border-t border-gray-200 flex justify-between items-center">
            <div className="flex space-x-6 text-sm font-medium text-gray-600">
              <button className="hover:text-primary-green">About</button>
              <button
                onClick={() => navigate('/challenges')}
                className="hover:text-primary-green"
              >
                Challenges
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="hover:text-primary-green"
              >
                Order History
              </button>
            </div>
            <button
              onClick={() => navigate('/profile/edit')}
              className="bg-gray-200 hover:bg-primary-green hover:text-white px-4 py-2 rounded-md text-sm"
            >
              ✎ Edit Profile
            </button>
          </div>
        </div>

        {/* --- Updated Main Content --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {/* Left Sidebar */}
          <div className="sm:col-span-1 space-y-6">
            {/* User Badges */}
            <div className="bg-white rounded-lg shadow-md p-4 flex justify-center space-x-2">
              {[
                'https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png',
                'https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png',
                'https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png',
                'https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png',
                'https://github.githubassets.com/images/modules/profile/achievements/arctic-code-vault-contributor-default.png',
                'https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png',
              ].map((badgeUrl, idx) => (
                <img
                  key={idx}
                  src={badgeUrl}
                  alt={`Badge ${idx + 1}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ))}
            </div>

            {/* About Section */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                About
              </h3>
              <p className="text-sm text-gray-600">
                {user.bio ||
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at suscipit nulla, sed ultricies augue. Donec vitae eros aliquet, malesuada augue non, vestibulum velit.'}
              </p>
            </div>

            {/* Email */}
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-700">{user.email}</p>
            </div>

            {/* Points Earned */}
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-3">
              {user && user.percentage !== undefined ? (
                <div className="text-sm">
                  <p className="text-gray-700 font-semibold">
                    Points You Earned: {user.percentage}%
                  </p>
                </div>
              ) : (
                <div className="text-sm text-gray-400 animate-pulse">
                  Loading points...
                </div>
              )}
            </div>
          </div>

          {/* Right Posts Section */}
          <div className="sm:col-span-2 space-y-4">
            {user.postList && user.postList.length > 0 ? (
              user.postList.map((post, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {user.username}
                      </h4>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{post}</p>
                  <div className="w-full h-40 bg-gray-200 rounded-lg"></div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <p>{user.likesCount || 0} Likes</p>
                    <p>{user.commentsCount || 0} Comments</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No posts available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
