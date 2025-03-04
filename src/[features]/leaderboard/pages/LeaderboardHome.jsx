import TopLeaderboardCard from '../components/TopLeaderboardCard';

function LeaderboardHome() {
  return (
    <div className="max-w-screen-xl container mx-auto px-4">
      {/* Global nav */}
      <div className="bg-green-300 py-4 mx-auto my-4 rounded-lg">
        <p className="text-center">Global Nav</p>
      </div>

      {/* Main grid container */}
      <div className="flex gap-4 mt-10">
        {/* Left section (9/12) */}
        <div className="w-9/12">
          {/* 3x3 grid */}
          <div className="grid grid-cols-3 gap-4">
            <TopLeaderboardCard
              fullName={'Anuja Rathnayaka'}
              username={'dizzpy'}
            />
            <TopLeaderboardCard
              fullName={'Anuja Rathnayaka'}
              username={'dizzpy'}
            />
            <TopLeaderboardCard
              fullName={'Anuja Rathnayaka'}
              username={'dizzpy'}
            />
          </div>
        </div>

        {/* Right section (3/12) */}
        <div className="w-3/12 bg-pink-200 p-4 rounded-lg">Right Section</div>
      </div>
    </div>
  );
}

export default LeaderboardHome;
