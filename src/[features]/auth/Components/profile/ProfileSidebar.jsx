/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { useAuth } from '../../../../context/AuthContext';
import { API_CONFIG } from '../../../../config/api.config';
import axios from 'axios';

// Badge image imports
import badge01 from '../../../../assets/profile/badge-01.png';
import badge02 from '../../../../assets/profile/badge-02.png';
import badge03 from '../../../../assets/profile/badge-03.png';
import badge04 from '../../../../assets/profile/badge-04.png';
import badge05 from '../../../../assets/profile/badge-05.png';

const badgeImages = [badge01, badge02, badge03, badge04, badge05];

const ProfileSidebar = () => {
  const { user } = useAuth();
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    async function fetchUserPoints() {
      if (!user?.id) return;

      try {
        const response = await axios.get(
          `${API_CONFIG.BASE_URL}/api/users/${user.id}/points`,
        );
        setUserPoints(response.data?.points || 0);
      } catch (err) {
        console.error('Failed to fetch user points', err);
      }
    }

    fetchUserPoints();
  }, [user]);

  return (
    <div className="bg-bg-light shadow-s rounded-lg p-4 sticky top-24 h-fit w-full sm:w-64 mt-10 pt-6 pr-6">
      {/* Badges */}
      <div className="flex items-center justify-start gap-2 mb-4">
        {badgeImages.map((badge, idx) => (
          <img
            key={idx}
            src={badge}
            alt={`Badge ${idx + 1}`}
            className="w-10 h-10 object-contain rounded"
          />
        ))}
      </div>

      {/* About Box */}
      <div className="bg-gray-50 rounded-xl p-4 mb-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">About</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at
          suscipit nulla, sed ultricies augue. Donec vitae eros aliquet,
          malesuada augue non, vestibulum velit.
        </p>
      </div>

      {/* Email Box */}
      <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 mb-2">
        <Mail className="w-4 h-4 text-gray-500" />
        <p className="text-sm text-primary-green">akila123@gmail.com</p>
      </div>

      {/* Points Box */}
      <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2">
        <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-lime-400 text-xs font-medium text-gray-800">
          {userPoints}
        </div>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Points You Earned</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileSidebar;
