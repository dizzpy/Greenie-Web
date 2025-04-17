/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const tabs = ['About', 'Challenges', 'Order History'];

const ProfileNavTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white border-b border-gray-200 mt-2 px-4 sm:px-6">
      <div className="flex space-x-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`py-3 text-sm font-medium whitespace-nowrap border-b-2 transition duration-200 ${
              activeTab === tab
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-green-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

ProfileNavTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default ProfileNavTabs;
