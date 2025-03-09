import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getLeaderboard } from '../../../services/leaderboardService';
import TopLeaderboardCard from '../components/TopLeaderboardCard';
import UserScoreCard from '../components/UserScoreCard';
import RisingMembersTable from '../components/RisingMembersTable';
import UserBadgesCard from '../components/UserBadgesCard';
import NavBar from '../../../components/Shared/NavBar';

function LeaderboardHome() {
  const { user } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setLeaderboardData(data);
        // Find user's rank
        const userEntry = data.find((entry) => entry.userId === user?.id);
        if (userEntry) {
          setUserRank(userEntry.rank);
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [user?.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Get top 3 users for the leaderboard cards
  const topUsers = leaderboardData.slice(0, 3);
  // Get users ranked 4-10 for the rising members table
  const risingMembers = leaderboardData.slice(3, 10);

  // Sample data for badges
  const userBadges = [
    {
      id: '1',
      name: 'Quick Starter',
      icon: 'https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png',
      isUnlocked: true,
    },
    {
      id: '2',
      name: 'Pull Shark',
      icon: 'https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png',
      isUnlocked: true,
    },
    {
      id: '3',
      name: 'Galaxy Brain',
      icon: 'https://github.githubassets.com/images/modules/profile/achievements/galaxy-brain-default.png',
      isUnlocked: true,
    },
    {
      id: '4',
      name: 'YOLO',
      icon: 'https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png',
      isUnlocked: false,
    },
    {
      id: '5',
      name: 'Arctic Code',
      icon: 'https://github.githubassets.com/images/modules/profile/achievements/arctic-code-vault-contributor-default.png',
      isUnlocked: false,
    },
    {
      id: '6',
      name: 'Pair Pro',
      icon: 'https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png',
      isUnlocked: false,
    },
  ];

  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col lg:flex-row gap-8 mt-10 lg:mt-20">
          {/* leaderboard section */}
          <div className="w-full lg:w-9/12">
            <h2 className="text-xl font-normal text-text-gray mb-6 px-2 lg:px-5">
              Current Leaderboard
            </h2>

            {/* Top 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-2 lg:p-5">
              <div className="order-2 lg:order-1">
                <TopLeaderboardCard
                  fullName={topUsers[1]?.fullName}
                  username={topUsers[1]?.username?.replace('@', '')}
                  points={topUsers[1]?.pointsCount}
                  challenges={topUsers[1]?.challengesCompleted}
                  position={2}
                  avatar={topUsers[1]?.profileImgUrl}
                />
              </div>
              <div className="order-1 lg:order-2 md:col-span-2 lg:col-span-1 -mt-4">
                <TopLeaderboardCard
                  fullName={topUsers[0]?.fullName}
                  username={topUsers[0]?.username?.replace('@', '')}
                  points={topUsers[0]?.pointsCount}
                  challenges={topUsers[0]?.challengesCompleted}
                  position={1}
                  avatar={topUsers[0]?.profileImgUrl}
                />
              </div>
              <div className="order-3">
                <TopLeaderboardCard
                  fullName={topUsers[2]?.fullName}
                  username={topUsers[2]?.username?.replace('@', '')}
                  points={topUsers[2]?.pointsCount}
                  challenges={topUsers[2]?.challengesCompleted}
                  position={3}
                  avatar={topUsers[2]?.profileImgUrl}
                />
              </div>
            </div>

            {/* Rising Members section */}
            <div className="mt-8 lg:mt-12">
              <h2 className="text-xl font-normal text-text-gray mb-6 px-2 lg:px-5">
                Rising Members
              </h2>
              <div className="px-2 lg:px-5 overflow-x-auto">
                <RisingMembersTable
                  members={risingMembers.map((member) => ({
                    id: member.userId,
                    rank: member.rank,
                    name: member.fullName,
                    username: member.username.replace('@', ''),
                    avatar: member.profileImgUrl,
                    points: member.pointsCount,
                    challenges: member.challengesCompleted,
                  }))}
                />
              </div>
            </div>
          </div>

          {/* User Score Card */}
          <div className="w-full lg:w-3/12 order-first lg:order-none">
            <h2 className="text-xl font-normal text-text-gray mb-6">
              Your Score
            </h2>
            <UserScoreCard
              fullName={user?.name}
              username={user?.username?.replace('@', '')}
              rank={userRank || 0}
              challenges={user?.joinedChallenges?.length || 0}
              points={user?.points || 0}
              avatar={user?.avatar}
            />
            <h2 className="text-xl font-normal text-text-gray mb-6 mt-8">
              Achievements
            </h2>
            <UserBadgesCard badges={user?.badgesList || userBadges} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderboardHome;
