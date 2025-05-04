import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import CoinIcon from '../../../assets/icons/coin.svg';

function ViewChallengeCard({ challenge }) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/challenges/submit/${challenge.challengeId}`);
  };

  return (
    <div className="w-auto h-auto max-w-3xl max-h-screen flex flex-col bg-white rounded-lg p-6 shadow-lg">
      {/* Image Placeholder */}
      <div className="w-full h-64 bg-gray-300 rounded-lg overflow-hidden">
        <img
          src={challenge.photoUrl}
          alt={challenge.challengeName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Challenge Name & Points */}
      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {challenge.challengeName}
        </h2>
        <div className="flex items-center">
          <img src={CoinIcon} alt="coin" className="w-5 h-5 ml-2" />
          <span className="ml-1 font-semibold text-gray-700">
            {challenge.points}
          </span>
        </div>
      </div>

      {/* Creator Information */}
      {/* <p className="text-gray-500 text-sm mt-3">Created by</p>
      <p className="text-gray-700 font-medium">{challenge.creator}</p> */}

      {/* Description */}
      <p className="text-gray-600 mt-4 text-sm leading-relaxed flex-grow">
        {challenge.description}
      </p>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full mt-6 bg-primary-green text-white py-3 rounded-lg hover:bg-green-600 transition"
      >
        Submit
      </button>
    </div>
  );
}

// PropTypes validation
ViewChallengeCard.propTypes = {
  challenge: PropTypes.shape({
    challengeId: PropTypes.number.isRequired,
    photoUrl: PropTypes.string.isRequired,
    challengeName: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    creator: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ViewChallengeCard;
