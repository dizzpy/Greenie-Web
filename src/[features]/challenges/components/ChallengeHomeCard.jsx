import PropTypes from 'prop-types';
import CoinIcon from '../../../assets/icons/coin.svg';

function ChallengeHomeCard({ challenge }) {
  return (
    <div className="flex flex-col md:flex-row bg-bg-light rounded-lg p-5 h-full">
      {/* Image section */}
      <a
        href="#"
        className="group w-full md:w-1/3 md:flex-shrink-0 mb-5 md:mb-0"
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
      <div className="flex-1 md:ml-6 flex flex-col">
        {/* Tags/Points section */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center px-3.5 py-2 text-sm font-medium text-emerald-700 rounded-full border border-emerald-200">
            <div className="flex items-center gap-1.5">
              <img src={CoinIcon} alt="coin" className="w-5 h-5" />
              <span className="tabular-nums font-semibold">
                {challenge.points}
              </span>
            </div>
          </span>
          <span className="inline-flex items-center px-3.5 py-2 text-sm font-medium text-emerald-700 rounded-full border border-emerald-200">
            <span className="tabular-nums font-semibold">
              {challenge.enrolled}
            </span>
            <span className="ml-1">Enrolled</span>
          </span>
        </div>

        {/* Title and description */}
        <div className="mt-4">
          <h4 className="text-lg leading-6 font-medium text-text-gray group-hover:text-primary-green mb-2">
            {challenge.name}
          </h4>
          <p className="text-sm font-normal text-gray-600 leading-relaxed">
            {challenge.description}
          </p>

          {/* Footer section */}
          <div className="md:text-end text-start pt-4">
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
