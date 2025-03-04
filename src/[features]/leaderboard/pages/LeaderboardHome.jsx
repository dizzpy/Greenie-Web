import TopLeaderboardCard from '../components/TopLeaderboardCard';
import UserScoreCard from '../components/UserScoreCard';
import RisingMembersTable from '../components/RisingMembersTable';
import UserBadgesCard from '../components/UserBadgesCard';

function LeaderboardHome() {
  // Sample data for rising members with Arcane characters
  const risingMembers = [
    {
      id: '1',
      rank: 4,
      name: 'Vi',
      username: 'vi_piltover',
      avatar:
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vi_0.jpg',
      points: 654,
      challenges: 7,
    },
    {
      id: '2',
      rank: 5,
      name: 'Jinx',
      username: 'powder',
      avatar:
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg',
      points: 623,
      challenges: 6,
    },
    {
      id: '3',
      rank: 6,
      name: 'Caitlyn',
      username: 'cupcake',
      avatar:
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Caitlyn_0.jpg',
      points: 589,
      challenges: 5,
    },
    {
      id: '4',
      rank: 7,
      name: 'Jayce',
      username: 'defender',
      avatar:
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jayce_0.jpg',
      points: 567,
      challenges: 5,
    },
    {
      id: '5',
      rank: 8,
      name: 'Viktor',
      username: 'glorious_evolution',
      avatar:
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Viktor_0.jpg',
      points: 543,
      challenges: 4,
    },
    {
      id: '6',
      rank: 9,
      name: 'Ekko',
      username: 'time_winder',
      avatar:
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ekko_0.jpg',
      points: 521,
      challenges: 4,
    },
    {
      id: '7',
      rank: 10,
      name: 'Heimerdinger',
      username: 'professor',
      avatar:
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Heimerdinger_0.jpg',
      points: 498,
      challenges: 3,
    },
  ];

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
    <div className="container mx-auto px-4 mb-10">
      {/* Global nav */}
      <div className="bg-green-300 py-4 mx-auto my-4 rounded-lg">
        <p className="text-center">Global Nav</p>
      </div>

      {/* grid - adjusted for mobile */}
      <div className="flex flex-col lg:flex-row gap-8 mt-10 lg:mt-20">
        {/* leaderboard section */}
        <div className="w-full lg:w-9/12">
          <h2 className="text-xl font-normal text-text-gray mb-6 px-2 lg:px-5">
            Current Leaderboard
          </h2>

          {/* 3 top card section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-2 lg:p-5">
            <div className="order-2 lg:order-1">
              <TopLeaderboardCard
                fullName="Layla"
                username="lay_la"
                points={980}
                challenges={12}
                position={2}
                avatar="https://static.wikia.nocookie.net/mobile-legends/images/2/2c/Hero184-icon.png"
              />
            </div>
            <div className="order-1 lg:order-2 md:col-span-2 lg:col-span-1 -mt-4">
              <TopLeaderboardCard
                fullName="Melissa"
                username="mell"
                points={1234}
                challenges={15}
                position={1}
                avatar="https://i.pinimg.com/736x/8f/ea/a6/8feaa6add5d1cd121fc0ea1325771b87.jpg"
              />
            </div>
            <div className="order-3">
              <TopLeaderboardCard
                fullName="Zhuxin"
                username="xin"
                points={754}
                challenges={8}
                position={3}
                avatar="https://static.wikia.nocookie.net/mobile-legends/images/0/05/Hero1251-icon.png"
              />
            </div>
          </div>

          {/* Rising Members section */}
          <div className="mt-8 lg:mt-12">
            <h2 className="text-xl font-normal text-text-gray mb-6 px-2 lg:px-5">
              Rising Members
            </h2>
            <div className="px-2 lg:px-5 overflow-x-auto">
              <RisingMembersTable members={risingMembers} />
            </div>
          </div>
        </div>

        {/* score section */}
        <div className="w-full lg:w-3/12 order-first lg:order-none">
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
          <h2 className="text-xl font-normal text-text-gray mb-6 mt-8">
            Achievements
          </h2>
          <UserBadgesCard badges={userBadges} />
        </div>
      </div>
    </div>
  );
}

export default LeaderboardHome;
