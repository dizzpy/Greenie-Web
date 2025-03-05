import CoinIcon from '../../../assets/icons/coin.svg';
import ChallengeHomeCard from '../components/ChallengeHomeCard';

function ChallengesHome() {
  const challenges = [
    {
      id: 1,
      image:
        'https://www.westonnurseries.com/wp-content/uploads/2018/04/AdobeStock_177461824.jpeg',
      name: 'Zero Waste Week',
      points: 500,
      description:
        'Reduce your waste footprint for one week and track your progress.',
      enrolled: 234,
    },
    {
      id: 2,
      image:
        'https://www.westonnurseries.com/wp-content/uploads/2018/04/AdobeStock_177461824.jpeg',
      name: 'Plant a Tree',
      points: 300,
      description: 'Join our community tree planting initiative this weekend.',
      enrolled: 156,
    },
    {
      id: 3,
      image:
        'https://www.westonnurseries.com/wp-content/uploads/2018/04/AdobeStock_177461824.jpeg',
      name: 'Energy Saver Challenge',
      points: 400,
      description:
        'Reduce your energy consumption by 20% this month using smart techniques.',
      enrolled: 342,
    },
    {
      id: 4,
      image:
        'https://www.westonnurseries.com/wp-content/uploads/2018/04/AdobeStock_177461824.jpeg',
      name: 'Plastic-Free Shopping',
      points: 250,
      description:
        'Complete your weekly shopping without using any single-use plastics.',
      enrolled: 189,
    },
    {
      id: 5,
      image:
        'https://www.westonnurseries.com/wp-content/uploads/2018/04/AdobeStock_177461824.jpeg',
      name: 'Eco-Transport Month',
      points: 600,
      description:
        'Use only eco-friendly transportation methods for a whole month.',
      enrolled: 423,
    },
    {
      id: 6,
      image:
        'https://www.westonnurseries.com/wp-content/uploads/2018/04/AdobeStock_177461824.jpeg',
      name: 'Water Conservation',
      points: 350,
      description:
        'Implement water-saving practices and reduce your water consumption.',
      enrolled: 267,
    },
  ];

  return (
    <div className="max-w-screen-xl container mx-auto px-4">
      {/* Global nav */}
      <div className="bg-green-300 py-4 mx-auto my-4 rounded-lg">
        <p className="text-center">Global Nav</p>
      </div>

      {/* header section */}
      <div className="flex justify-between items-center mb-6 mt-14">
        <div>
          <h1 className="text-3xl text-text-gray">Challenges</h1>
          <p className="text-text-gray">Available Challenges</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="text-gray-700">Current Points</span>
          <div className="flex flex-row gap-x-2 items-center">
            <img src={CoinIcon} alt="coin" className="w-6 h-6" />
            <span className="text-text-gray text-xl">1,234</span>
          </div>
        </div>
      </div>

      {/* add challenge button */}
      <div className="flex justify-end mb-6">
        <button className="bg-primary-green text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
          Add Challenge
        </button>
      </div>

      {/* card section */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((challenge) => (
            <ChallengeHomeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChallengesHome;
