/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const ChallengeCard = ({ title, enrolled, points }) => {
  return (
    <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-3 shadow-md">
      <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-gray-600">{enrolled} Enrolled</p>
      </div>
      <div className="ml-auto text-green-600 font-bold">{points}</div>
    </div>
  );
};

// Define expected prop types
ChallengeCard.propTypes = {
  title: PropTypes.string.isRequired,
  enrolled: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
};

export default ChallengeCard;
