import PropTypes from 'prop-types';
import CoinIcon from '../../../assets/icons/coin.svg';

function ChallengeHomeCard({ challenge }) {
  return (
    <div className="flex flex-col md:flex-row bg-bg-light rounded-lg p-4 h-full">
      {/* Image section */}
      <a
        href="#"
        className="group w-full md:w-1/3 md:flex-shrink-0 mb-4 md:mb-0"
      >
        <div className="h-48 md:h-full">
          <img
            src={challenge.image}
            alt={challenge.name}
            className="object-cover shadow-lg rounded-lg group-hover:opacity-75 w-full h-full"
          />
        </div>
      </a>

      {/* Content section */}
      <div className="flex-1 md:ml-6">
        {/* Tags/Points section */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <span className="inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-text-gray rounded-full border border-gray-200">
            <img src={CoinIcon} alt="coin" className="w-4 h-4 mr-1.5" />
            {challenge.points} Points
          </span>
          <span className="inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-text-gray rounded-full border border-gray-200">
            {challenge.enrolled} Enrolled
          </span>
        </div>

        {/* Title and description */}
        <div className="mt-3 md:mt-2">
          <h4 className="text-lg leading-6 font-medium text-text-gray group-hover:text-primary-green">
            {challenge.name}
          </h4>
          <p className="mt-2 text-sm font-normal text-gray-600 leading-5">
            {challenge.description}
          </p>

          {/* Footer section */}
          <div className="mt-4 flex justify-end">
            <button className="text-primary-green hover:text-green-600">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ChallengeHomeCard.propTypes = {
  challenge: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    enrolled: PropTypes.number.isRequired,
  }).isRequired,
};

export default ChallengeHomeCard;
