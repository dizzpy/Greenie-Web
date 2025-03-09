import PropTypes from 'prop-types';
import coinIcon from '../../../assets/icons/coin.svg';

const UserScoreCard = ({
  fullName,
  username,
  rank,
  challenges,
  points,
  avatar,
}) => {
  const isTopThree = rank <= 3 && rank > 0;
  const rankColors = {
    1: 'from-yellow-100 to-yellow-50 border-yellow-300',
    2: 'from-gray-100 to-gray-50 border-gray-300',
    3: 'from-orange-100 to-orange-50 border-orange-300',
  };

  return (
    <div
      className={`rounded-[22px] p-6 ${
        isTopThree
          ? `bg-gradient-to-b ${rankColors[rank]} border-2`
          : 'bg-bg-light'
      }`}
    >
      {/* User Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <div
          className={`h-20 w-20 overflow-hidden rounded-full mb-4 ${
            isTopThree ? 'ring-4 ring-offset-2 ring-primary-green' : ''
          }`}
        >
          <img
            src={avatar}
            alt={`${fullName}'s avatar`}
            className="h-full w-full object-cover"
          />
        </div>
        <h3 className="text-lg text-text-gray">{fullName}</h3>
        <span className="text-sm text-text-gray">@{username}</span>
        {isTopThree && (
          <span className="mt-2 px-3 py-1 bg-primary-green text-white text-sm rounded-full">
            Top {rank} Player 🏆
          </span>
        )}
      </div>

      {/* Stats Row */}
      <div className="flex justify-evenly mb-6">
        <div className="flex flex-col items-center">
          <span className="text-sm text-text-gray">Current Rank</span>
          <span
            className={`text-lg font-medium ${
              isTopThree ? 'text-primary-green' : ''
            }`}
          >
            #{rank}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-text-gray">Challenges Done</span>
          <span className="text-lg font-medium text-primary-green">
            {challenges}
          </span>
        </div>
      </div>

      {/* Points Section */}
      <div className="flex flex-col items-center">
        <span className="text-sm text-text-gray mb-1">Points Earned</span>
        <div className="flex items-center gap-2">
          <img src={coinIcon} alt="Coin" className="h-5 w-5" />
          <span className="text-xl font-medium text-primary-green">
            {points}
          </span>
        </div>
      </div>
    </div>
  );
};

UserScoreCard.propTypes = {
  fullName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  challenges: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default UserScoreCard;
