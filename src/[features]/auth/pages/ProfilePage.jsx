import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserBadgesCard from '../../leaderboard/components/UserBadgesCard';
import NavBar from '../../../components/Shared/NavBar';

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  const defaultProfileImage = 'https://www.example.com/default-profile.jpg';
  const defaultCoverImage = 'https://www.example.com/default-cover.jpg';

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${user.id}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch profile data.');
        }
        const data = await response.json();

        // Fetch user posts if not included in profile data
        if (!data.postList) {
          const postsResponse = await fetch(
            `http://localhost:8080/api/users/${user.id}/posts`,
          );
          if (postsResponse.ok) {
            const postsData = await postsResponse.json();
            data.postList = postsData; // Merge posts into profile data
          }
        }

        setProfileData(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      }
    };

    if (user && user.id) {
      fetchProfileData();
    }
  }, [user]);

  if (!user) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  if (!profileData) {
    return <div className="text-center mt-10">Loading full profile...</div>;
  }

  return (
    <div>
      <NavBar />

      {/* Cover Image and Profile Header */}
      <div className="max-w-5xl mx-auto bg-white shadow rounded-lg overflow-hidden p-4 mt-4">
        <div className="relative">
          <img
            src={profileData.coverImage || defaultCoverImage}
            alt="Cover"
            className="w-full h-40 object-cover rounded-lg"
            onError={(e) => (e.target.src = defaultCoverImage)}
          />
          <div className="absolute -bottom-10 left-6 flex items-center">
            <img
              src={profileData.profileImgUrl || defaultProfileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
              onError={(e) => (e.target.src = defaultProfileImage)}
            />
            <div className="ml-4 text-black drop-shadow-md">
              <h2 className="text-xl font-bold">
                {profileData.fullName || user.name}
              </h2>
              <p className="text-sm text-black-300">
                @{profileData.username || user.username}
              </p>
            </div>
          </div>
        </div>
        {/* Spacer under profile image */}
        <div className="h-12" />
      </div>

      {/* Nav & Edit Button */}
      <div className="max-w-5xl mx-auto mt-2 flex justify-between items-center px-4">
        <div className="flex gap-6 text-gray-600 text-sm font-semibold">
          <button className="hover:text-black">About</button>
          <button
            onClick={() => navigate('/challenges')}
            className="hover:text-black"
          >
            Challenges
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="hover:text-black"
          >
            Order History
          </button>
        </div>
        <button
          onClick={() => navigate('/edit-profile')}
          className="flex items-center bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 16h2M16.5 7.5l-9 9H5v-2.5l9-9m1-1a2.121 2.121 0 113 3L14 10l-3-3 2.5-2.5z"
            />
          </svg>
          Edit Profile
        </button>
      </div>

      {/* Profile Content */}
      <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* About */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-gray-600 text-sm">
              {profileData.bio || 'No bio provided.'}
            </p>
            <p className="text-gray-600 text-sm mt-2">{user.email}</p>
            <p className="text-green-600 mt-2 text-sm font-bold">
              Points: {profileData.pointsCount ?? user.points ?? 0}
            </p>
          </div>

          {/* Badges */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">User Badges</h3>
            <UserBadgesCard badges={profileData.badges || []} />
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-4">
          {profileData.postList?.length > 0 ? (
            profileData.postList.map((post, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center space-x-3 mb-2">
                  <img
                    src={profileData.profileImgUrl || defaultProfileImage}
                    className="w-10 h-10 rounded-full"
                    alt="User"
                  />
                  <div>
                    <h4 className="font-semibold">{profileData.fullName}</h4>
                    <p className="text-xs text-gray-500">
                      @{profileData.username}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{post}</p>
                <div className="w-full h-36 bg-gray-100 mt-3 rounded-md" />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <p>{profileData.likesCount || 0} Likes</p>
                  <p>{profileData.commentsCount || 0} Comments</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
