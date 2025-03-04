import PropTypes from 'prop-types';

const RisingMembersTable = ({ members }) => {
  return (
    <div className="w-full min-w-[768px]">
      <table className="w-full">
        <thead>
          <tr className="text-sm text-text-gray border-b border-gray-200">
            <th className="font-normal text-left pb-4 px-4 w-[10%]">Rank</th>
            <th className="font-normal text-left pb-4 px-4 w-[25%]">Member</th>
            <th className="font-normal text-left pb-4 px-4 w-[25%]">Name</th>
            <th className="font-normal text-right pb-4 px-4 w-[20%]">Points</th>
            <th className="font-normal text-right pb-4 px-4 w-[20%]">
              Challenges
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr
              key={member.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-4 px-4 text-text-gray w-[10%]">
                #{member.rank}
              </td>
              <td className="py-4 px-4 w-[25%]">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <img
                      src={member.avatar}
                      alt={member.username}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-text-gray">@{member.username}</span>
                </div>
              </td>
              <td className="py-4 px-4 text-text-gray w-[25%]">
                {member.name}
              </td>
              <td className="py-4 px-4 text-right w-[20%]">
                <div className="flex items-center justify-end gap-1">
                  <img
                    src="/src/assets/icons/coin.svg"
                    alt="Coin"
                    className="h-4 w-4"
                  />
                  <span className="text-primary-green">{member.points}</span>
                </div>
              </td>
              <td className="py-4 px-4 text-right text-text-gray w-[20%]">
                {member.challenges}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

RisingMembersTable.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      rank: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
      challenges: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default RisingMembersTable;
