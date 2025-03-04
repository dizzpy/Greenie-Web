import TopLeaderboardCard from '../components/TopLeaderboardCard';
import UserScoreCard from '../components/UserScoreCard';
import RisingMembersTable from '../components/RisingMembersTable';

function LeaderboardHome() {
  // Sample data for rising members
  const risingMembers = [
    {
      id: '1',
      rank: 4,
      name: 'Jane Doe',
      username: 'jane_doe',
      avatar: 'https://avatars.githubusercontent.com/u/28524634?v=4',
      points: 654,
      challenges: 7,
    },
    {
      id: '2',
      rank: 5,
      name: 'John Smith',
      username: 'johnsmith',
      avatar: 'https://avatars.githubusercontent.com/u/28524634?v=4',
      points: 623,
      challenges: 6,
    },
    {
      id: '3',
      rank: 6,
      name: 'Alice Johnson',
      username: 'alice_j',
      avatar: 'https://avatars.githubusercontent.com/u/28524634?v=4',
      points: 589,
      challenges: 5,
    },
    {
      id: '4',
      rank: 7,
      name: 'Bob Wilson',
      username: 'bobwil',
      avatar: 'https://avatars.githubusercontent.com/u/28524634?v=4',
      points: 567,
      challenges: 5,
    },
    {
      id: '5',
      rank: 8,
      name: 'Emma Davis',
      username: 'emma_d',
      avatar: 'https://avatars.githubusercontent.com/u/28524634?v=4',
      points: 543,
      challenges: 4,
    },
    {
      id: '6',
      rank: 9,
      name: 'Michael Brown',
      username: 'mike_b',
      avatar: 'https://avatars.githubusercontent.com/u/28524634?v=4',
      points: 521,
      challenges: 4,
    },
    {
      id: '7',
      rank: 10,
      name: 'Sarah Lee',
      username: 'slee',
      avatar: 'https://avatars.githubusercontent.com/u/28524634?v=4',
      points: 498,
      challenges: 3,
    },
  ];

  return (
    <div className="container mx-auto px-4">
      {/* Global nav */}
      <div className="bg-green-300 py-4 mx-auto my-4 rounded-lg">
        <p className="text-center">Global Nav</p>
      </div>

      {/* grid */}
      <div className="flex flex-col lg:flex-row gap-4 mt-20">
        {/* leaderboard section */}
        <div className="w-full lg:w-9/12">
          <h2 className="text-xl font-normal text-text-gray mb-6 px-5">
            Current Leaderboard
          </h2>

          {/* 3 top card section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
            <div className="order-2 lg:order-1">
              <TopLeaderboardCard
                fullName="Anuja Rathnayaka"
                username="dizzpy"
                points={980}
                challenges={12}
                position={2}
              />
            </div>
            <div className="order-1 lg:order-2 md:col-span-2 lg:col-span-1 -mt-4">
              <TopLeaderboardCard
                fullName="Anuja Rathnayaka"
                username="dizzpy"
                points={1234}
                challenges={15}
                position={1}
              />
            </div>
            <div className="order-3">
              <TopLeaderboardCard
                fullName="Anuja Rathnayaka"
                username="dizzpy"
                points={754}
                challenges={8}
                position={3}
              />
            </div>
          </div>

          {/* Rising Members section */}
          <div className="mt-12">
            <h2 className="text-xl font-normal text-text-gray mb-6 px-5">
              Rising Members
            </h2>
            <div className="px-5">
              <RisingMembersTable members={risingMembers} />
            </div>
          </div>
        </div>

        {/* score section */}
        <div className="w-full lg:w-3/12">
          <h2 className="text-xl font-normal text-text-gray mb-6">
            Your Score
          </h2>
          <UserScoreCard
            fullName="Anuja Rathnayaka"
            username="dizzpy"
            rank={5}
            challenges={15}
            points={1234}
          />
        </div>
      </div>
    </div>
  );
}

export default LeaderboardHome;
