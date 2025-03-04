import PropTypes from 'prop-types';

const UserBadgesCard = ({ badges }) => {
  return (
    <div className="bg-bg-light rounded-[22px] p-6">
      <div className="grid grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div key={badge.id} className="flex flex-col items-center">
            <div className="h-16 w-16 mb-2 relative">
              <img
                src={badge.icon}
                alt={badge.name}
                className={`h-full w-full ${!badge.isUnlocked && 'opacity-40 grayscale'}`}
              />
              {!badge.isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/src/assets/icons/lock.svg"
                    alt="Locked"
                    className="w-6 h-6"
                  />
                </div>
              )}
            </div>
            <span className="text-xs text-text-gray text-center">
              {badge.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

UserBadgesCard.propTypes = {
  badges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      isUnlocked: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default UserBadgesCard;
