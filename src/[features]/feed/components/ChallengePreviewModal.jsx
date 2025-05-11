/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import coinIcon from '../../../assets/icons/coin.svg';

const ChallengePreviewModal = ({ challenge, onClose }) => {
  if (!challenge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>

        <img
          src={challenge.photoUrl}
          alt={challenge.challengeName}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="mb-2">
          <h2 className="text-xl font-semibold text-text-gray">
            {challenge.challengeName}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {challenge.description || 'No description provided.'}
          </p>
        </div>

        <div className="flex justify-between mt-4">
          <div className="text-sm text-gray-600">
            {challenge.enrolled} Enrolled
          </div>
          <div className="flex items-center text-primary-green font-bold">
            <img src={coinIcon} alt="coin" className="w-4 h-4 mr-1" />
            {challenge.points}
          </div>
        </div>

        <button
          className="mt-6 w-full bg-primary-green text-white py-2 rounded-lg hover:bg-green-600"
          onClick={() =>
            window.location.assign(
              `/challenges/submit/${challenge.challengeId}`,
            )
          }
        >
          Submit Challenge
        </button>
      </div>
    </div>
  );
};

ChallengePreviewModal.propTypes = {
  challenge: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default ChallengePreviewModal;
