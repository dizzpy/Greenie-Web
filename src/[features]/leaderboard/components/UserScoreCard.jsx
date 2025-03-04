import PropTypes from 'prop-types';

const UserScoreCard = ({ fullName, username, rank, challenges, points }) => {
  return (
    <div className="bg-bg-light rounded-[22px] p-6">
      {/* User Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="h-20 w-20 overflow-hidden rounded-full mb-4">
          <img
            src="https://avatars.githubusercontent.com/u/28524634?v=4"
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <h3 className="text-lg text-text-gray">{fullName}</h3>
        <span className="text-sm text-text-gray">@{username}</span>
      </div>

      {/* Stats Row */}
      <div className="flex justify-evenly mb-6">
        <div className="flex flex-col items-center">
          <span className="text-sm text-text-gray">Current Rank</span>
          <span className="text-lg font-medium text-primary-green">
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
          <img
            src="/src/assets/icons/coin.svg"
            alt="Coin"
            className="h-5 w-5"
          />
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
};

export default UserScoreCard;
