import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserBadgesCard from "../../leaderboard/components/UserBadgesCard";
import NavBar from "../../../components/Shared/NavBar";

const ProfilePage = () => {
const navigate = useNavigate();

const [userData, setUserData] = useState(null);
const [error, setError] = useState(null);

const userId = "67c49c04c220e47896afc1b2"; // Replace with the actual userId from the logged-in user

useEffect(() => {
const fetchUserData = async () => {
try {
const response = await fetch(`http://localhost:8080/api/users/${userId}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Fetch failed with status ${response.status}: ${response.statusText}`);
          console.error(`Response body: ${errorText}`);
          throw new Error(`Failed to fetch user data.`);
        }

        const data = await response.json();
        console.log("Fetched user data:", data);
        setUserData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error:", err);
      }
    };

    fetchUserData();

}, [userId]);

if (error) {
return <div>Error: {error}</div>;
}

if (!userData) {
return <div>Loading...</div>;
}

const defaultProfileImage = "https://www.example.com/default-profile.jpg";
const defaultCoverImage = "https://www.example.com/default-cover.jpg";

return (

<div>
{/_ Global Nav _/}
<NavBar />

      {/* Main Profile Container */}
      <div className="max-w-5xl mx-auto p-2 bg-gray-100 rounded-lg">
        {/* Profile Header */}
        <div className="bg-bg-light rounded-lg p-4 relative">
          <div className="relative">
            <img
              src={userData.profileImgUrl || defaultCoverImage}
              alt="Banner"
              className="w-full h-36 object-cover rounded-lg"
              onError={(e) => e.target.src = defaultCoverImage} // Fallback if cover image fails
            />
            <div className="absolute left-6 -bottom-10 flex items-center">
              <img
                src={userData.profileImgUrl || defaultProfileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white"
                onError={(e) => e.target.src = defaultProfileImage} // Fallback if profile image fails
              />
              <div className="ml-4">
                <h2 className="text-lg text-white font-bold flex items-center">
                  {userData.fullName}
                </h2>
                <p className="text-gray-500">@{userData.username}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Navigation + Edit Profile Button */}
        <div className="mt-16 border-b flex items-center justify-between text-gray-600 text-sm font-semibold">
          <div className="flex gap-6 px-6">
            <button className="pb-2 border-b-2 border-transparent hover:border-gray-500">
              About
            </button>
            <button
              onClick={() => navigate("/challenges")}
              className="pb-2 border-b-2 border-transparent hover:border-gray-500"
            >
              Challenges
            </button>
            <button
              onClick={() => navigate("/shop")}
              className="pb-2 border-b-2 border-transparent hover:border-gray-500"
            >
              Order History
            </button>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => navigate("/ep")}
            className="flex items-center bg-gray-300 text-gray-600 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-2"
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
      </div>

      {/* White Space for Separation */}
      <div className="h-6 bg-white"></div>

      {/* Second Profile Container */}
      <div className="max-w-5xl mx-auto p-2 bg-gray-100 rounded-lg">
        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Left Column: About + Badges (Sticky) */}
          <div className="col-span-1 space-y-4 h-fit sticky top-4">
            {/* About Section */}
            <div className="bg-bg-light rounded-lg p-4">
              <h3 className="text-lg font-semibold">About</h3>
              <p className="text-gray-500 text-sm mt-2">{userData.bio}</p>
              <p className="text-gray-500 mt-2 text-sm">{userData.email}</p>
              <div className="mt-2">
                <span className="text-green-500 font-bold">
                  Points Earned: {userData.pointsCount}%
                </span>
              </div>
            </div>

            {/* Badges Section */}
            <div className="bg-bg-light rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">User Badges</h3>
              <UserBadgesCard badges={userData.badges || []} />
            </div>
          </div>

          {/* Right Column: Posts */}
          <div className="col-span-2 space-y-4 p-2">
            {userData.postList.length > 0 ? (
              userData.postList.map((post, index) => (
                <div key={index} className="bg-bg-light rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <h4 className="font-semibold">{userData.username}</h4>
                      <p className="text-gray-500 text-sm">@{userData.username}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{post}</p>
                  <div className="w-full h-40 bg-gray-200 rounded-lg mt-2"></div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <p>{userData.likesCount} Likes</p>
                    <p>{userData.commentsCount} Comments</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </div>
      </div>
    </div>

);
};

export default ProfilePage;

/\*import { useAuth } from '../../../context/AuthContext';

const ProfilePage = () => {
const { user } = useAuth();

if (!user) return <div className="text-center mt-10">Loading profile...</div>;

return (

<div className="flex justify-center items-center min-h-screen bg-gray-100">
<div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
<div className="flex flex-col items-center text-center">
{/_ Avatar _/}
{user.avatar ? (
<img
              src={user.avatar}
              alt="Profile Avatar"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
) : (
<div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white mb-4">
{user.name ? user.name.charAt(0).toUpperCase() : '?'}
</div>
)}

          {/* Name */}
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>

          {/* Email */}
          <p className="text-gray-600">{user.email}</p>

          {/* Divider */}
          <hr className="my-4 w-full border-t" />

          {/* Username */}
          <p className="text-sm text-gray-700">
            <span className="font-medium">Username:</span> {user.username}
          </p>

          {/* Points */}
          <p className="text-sm text-gray-700">
            <span className="font-medium">Points:</span> {user.points}
          </p>
        </div>
      </div>
    </div>

);
};

export default ProfilePage;
\*/

.............................................................................
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UserBadgesCard from "../../leaderboard/components/UserBadgesCard";
import NavBar from "../../../components/Shared/NavBar";

const ProfilePage = () => {
const { user } = useAuth();
const navigate = useNavigate();

const [profileData, setProfileData] = useState(null);
const [error, setError] = useState(null);

const defaultProfileImage = "https://www.example.com/default-profile.jpg";
const defaultCoverImage = "https://www.example.com/default-cover.jpg";

useEffect(() => {
const fetchProfileData = async () => {
try {
console.log("Fetching profile for user ID:", user?.id); // Updated here

        const response = await fetch(`http://localhost:8080/api/users/${user.id}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Fetch failed:", response.status, errorText);
          throw new Error("Failed to fetch profile data.");
        }

        const data = await response.json();
        console.log("Profile data response:", data);

        setProfileData(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      }
    };

    if (user && user.id) {
      fetchProfileData();
    } else {
      console.warn("User or user.id is missing:", user); // Updated here too
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
              <h2 className="text-xl font-bold">{profileData.fullName || user.name}</h2>
              <p className="text-sm text-black-300">@{profileData.username || user.username}</p>
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
          <button onClick={() => navigate("/challenges")} className="hover:text-black">
            Challenges
          </button>
          <button onClick={() => navigate("/shop")} className="hover:text-black">
            Order History
          </button>
        </div>
        <button
          onClick={() => navigate("/ep")}
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
            <p className="text-gray-600 text-sm">{profileData.bio || "No bio provided."}</p>
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
                    <p className="text-xs text-gray-500">@{profileData.username}</p>
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
