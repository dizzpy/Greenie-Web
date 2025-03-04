import PropTypes from 'prop-types';

const positionConfig = {
  1: {
    borderColor: '#e7b659',
    medalSrc: '/src/assets/icons/leaderboard/first-med.svg',
  },
  2: {
    borderColor: '#B6B7B2',
    medalSrc: '/src/assets/icons/leaderboard/second-med.svg',
  },
  3: {
    borderColor: '#C86B58',
    medalSrc: '/src/assets/icons/leaderboard/third-med.svg',
  },
};

const TopLeaderboardCard = ({
  fullName,
  username,
  points,
  challenges,
  position,
  avatar,
}) => {
  const config = positionConfig[position];
  const isFirstPlace = position === 1;

  return (
    <div
      className={`rounded-[22px] p-[3px] h-[200px] ${isFirstPlace ? '-mb-4' : ''}`}
      style={{
        background: `linear-gradient(180deg, ${config.borderColor} 0%, transparent 100%)`,
      }}
    >
      <div className="rounded-[22px] bg-bg-light p-3 h-full relative">
        {/* Medal image */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 ${isFirstPlace ? '-top-8' : '-top-6'}`}
        >
          <img
            src={config.medalSrc}
            alt={`${position} Place Medal`}
            className={`${isFirstPlace ? 'w-16 h-16' : 'w-14 h-14'}`}
          />
        </div>

        {/* Content wrapper */}
        <div className="flex flex-col items-center h-full pt-8">
          {/* Profile section - increased margin bottom */}
          <div className="flex items-center gap-3 mb-7">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <img
                src={avatar}
                alt={`${fullName}'s avatar`}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-text-gray">{fullName}</span>
              <span className="text-sm text-text-gray">@{username}</span>
            </div>
          </div>

          {/* Stats section */}
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
  position: PropTypes.oneOf([1, 2, 3]).isRequired,
  avatar: PropTypes.string.isRequired,
};

export default TopLeaderboardCard;
