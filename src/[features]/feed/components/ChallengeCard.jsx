/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import coinIcon from '../../../assets/icons/coin.svg';

const ChallengeCard = ({ title, enrolled, points }) => {
  return (
    <div className="bg-white rounded-xl p-4 flex items-center gap-3">
      <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold text-text-gray font-sans">
          {title}
        </h3>
        <p className="text-xs text-text-gray font-sans">{enrolled} Enrolled</p>
      </div>
      {/* Properly align the coin icon and points */}
      <div className="ml-auto flex items-center gap-1 text-primary-green font-bold">
        <img src={coinIcon} alt="coin-icon" className="h-4 w-4" />
        <span>{points}</span>
      </div>
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
