import PropTypes from 'prop-types';

const TopLeaderboardCard = ({ fullName, username, points, challenges }) => {
  return (
    <div className="rounded-[22px] bg-gradient-to-b from-green-400 to-transparent p-[3px] h-[220px]">
      <div className="rounded-[22px] bg-bg-light p-4 h-full relative">
        {/* Medal image - positioned relative to the card border */}
        <div className="absolute left-1/2 -top-8 -translate-x-1/2">
          <img
            src="/src/assets/icons/leaderboard/third-med.svg"
            alt="Third Medal"
            className="w-16 h-16"
          />
        </div>

        {/* Content wrapper with reduced spacing */}
        <div className="flex flex-col items-center h-full pt-10">
          {/* Profile section - reduced margin bottom */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <img
                src="https://avatars.githubusercontent.com/u/28524634?v=4"
                alt="User avatar"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-text-gray">{fullName}</span>
              <span className="text-sm text-text-gray">@{username}</span>
            </div>
          </div>

          {/* Stats section - removed margin bottom */}
          <div className="flex justify-center gap-16">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-text-gray">Points Earned</span>
              <div className="flex flex-row items-center gap-1">
                <img
                  src="/src/assets/icons/coin.svg"
                  alt="Coin"
                  className="h-4 w-4"
                />
                <span className="text-xs font-medium text-primary-green">
                  {points}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-text-gray">Challenges Done</span>
              <span className="text-xs text-text-gray">{challenges}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TopLeaderboardCard.propTypes = {
  fullName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  challenges: PropTypes.number.isRequired,
};

export default TopLeaderboardCard;
