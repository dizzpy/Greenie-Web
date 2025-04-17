/* eslint-disable no-unused-vars */
import React from 'react';
import profileImg from '..//..//..//..//assets/profile/profile.jpeg';
import coverImg from '..//..//..//..//assets/profile/coverImg.jpg';

const ProfileHeader = () => {
  return (
    <div className="bg-white shadow-s pb-2 rounded-lg overflow-hidden">
      {/* Banner */}
      <div className="relative">
        <img
          src={coverImg}
          alt="Banner"
          className="w-full h-48 object-cover rounded-t-lg"
        />

        {/* Profile and Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between px-6 pt-4 pb-2 bg-white">
          <div className="flex items-center gap-4 -mt-12 sm:-mt-14">
            {/* Profile Image */}
            <img
              src={profileImg}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md"
            />

            {/* Name and Status */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mt-10">
                Alpha online
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
              </h2>
              <p className="text-gray-500 text-sm">@dulen12312</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-4 sm:mt-0">
            <button className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md">
              ✎ Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
