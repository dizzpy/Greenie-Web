import PropTypes from 'prop-types';

const TopLeaderboardCard = ({ fullName, username }) => {
  return (
    <div className="rounded-2xl bg-gradient-to-b from-green-400 to-transparent p-[3px]">
      {/* card start */}
      <div className="rounded-xl bg-bg-light">
        {/* med img */}
        <div className="relative h-48 w-full">
          <img
            src="/src/assets/icons/leaderboard/third-med.svg"
            alt="Third Medal"
            className="absolute left-1/2 -top-6 -translate-x-1/2"
          />

          {/* name section */}
          <div className="absolute top-10 flex w-full items-center justify-center gap-4 px-4">
            {/* profile img */}
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <img
                src="https://avatars.githubusercontent.com/u/28524634?v=4"
                alt="User avatar"
                className="h-full w-full object-cover"
              />
            </div>

            {/* text content */}
            <div className="flex flex-col">
              <span className="text-gray-800">{fullName}</span>
              <span className="text-sm text-gray-600">@{username}</span>
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
};

export default TopLeaderboardCard;
