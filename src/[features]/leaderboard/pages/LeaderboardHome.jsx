import TopLeaderboardCard from '../components/TopLeaderboardCard';

function LeaderboardHome() {
  return (
    <div className="container mx-auto px-4">
      {/* Global nav */}
      <div className="bg-green-300 py-4 mx-auto my-4 rounded-lg">
        <p className="text-center">Global Nav</p>
      </div>

      {/* Main grid container - make it column on mobile */}
      <div className="flex flex-col lg:flex-row gap-4 mt-10">
        {/* Left section - full width on mobile */}
        <div className="w-full lg:w-9/12">
          {/* 3x3 grid - 1 column on mobile, 2 on tablet, 3 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
            <TopLeaderboardCard
              fullName="Anuja Rathnayaka"
              username="dizzpy"
              points={1234}
              challenges={15}
            />
            <TopLeaderboardCard
              fullName="Anuja Rathnayaka"
              username="dizzpy"
              points={980}
              challenges={12}
            />
            <TopLeaderboardCard
              fullName="Anuja Rathnayaka"
              username="dizzpy"
              points={754}
              challenges={8}
            />
          </div>
        </div>

        {/* Right section - full width on mobile */}
        <div className="w-full lg:w-3/12 bg-pink-200 p-4 rounded-lg">
          Right Section
        </div>
      </div>
    </div>
  );
}

export default LeaderboardHome;
