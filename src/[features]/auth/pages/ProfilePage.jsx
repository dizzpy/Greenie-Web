/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ProfileHeader from '../Components/profile/ProfileHeader';
import ProfileNavTabs from '../Components/profile/ProfileNavTabs';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('About'); // Define state

  return (
    <div className="max-w-5xl mx-auto p-4">
      <ProfileHeader />
      <ProfileNavTabs />

      {/* Conditional tab content rendering */}
      <div className="mt-6">
        {activeTab === 'About' && <div>About content goes here...</div>}
        {activeTab === 'Challenges' && (
          <div>Challenge content goes here...</div>
        )}
        {activeTab === 'Order History' && (
          <div>Order history content goes here...</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
