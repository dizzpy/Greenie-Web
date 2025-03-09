import PropTypes from 'prop-types';
import CoinIcon from '../../../assets/icons/coin.svg';

function ViewChallengeCard(props) {
  const { challenge } = props;

  return (
    <div className="max-w-md mx-auto bg-white h-100">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gray-300 rounded-lg">
        <img
          src={challenge.image}
          alt={challenge.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Challenge Name & Points */}
      <div className="mt-7 text-text-gray flex justify-between items-center">
        <h2 className="text-xl font-semibold">{challenge.name}</h2>
        <div className="flex items-center">
          <img src={CoinIcon} alt="coin" className="w-4 h-4 ml-2" />
          <span className="ml-1 font-semibold text-text-gray">
            {challenge.points}
          </span>
        </div>
      </div>

      {/* Creator Information */}
      <p className="text-gray-500 text-sm mt-5">Created by</p>
      <p className="text-text-gray font-medium">{challenge.creator}</p>

      {/* Description */}
      <p className="text-text-gray mt-5 w-full text-sm">
        {challenge.description}
      </p>

      {/* Submit Button */}
      <button className="w-full mt-10 bg-primary-green text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition">
        Submit
      </button>
    </div>
  );
}

// PropTypes validation
ViewChallengeCard.propTypes = {
  challenge: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    creator: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ViewChallengeCard;
