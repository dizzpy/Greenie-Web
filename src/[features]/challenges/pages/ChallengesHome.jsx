import { useNavigate } from 'react-router-dom';
import CoinIcon from '../../../assets/icons/coin.svg';
import ChallengeHomeCard from '../components/ChallengeHomeCard';
import NavBar from '../../../components/Shared/NavBar';

function ChallengesHome() {
  const navigate = useNavigate();
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
    <div>
      <NavBar />
      <div className="max-w-screen-xl container mx-auto px-4 md:px-6 py-8 mt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-12">
          <div className="space-y-2 w-full md:w-auto">
            <h1 className="text-2xl md:text-3xl font-semibold text-text-gray">
              Challenges
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Explore and participate in environmental challenges
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6 w-full md:w-auto">
            <div className="inline-flex items-center justify-between md:justify-start px-5 py-3 text-sm font-medium rounded-full border border-emerald-200 bg-white shadow-sm">
              <span className="text-gray-600">Current Points</span>
              <div className="flex items-center gap-1.5 ml-3">
                <img src={CoinIcon} alt="coin" className="w-5 h-5" />
                <span className="font-bold text-base tabular-nums">1,234</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/challenges/add')}
              className="bg-primary-green text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium text-center"
            >
              Add Challenge
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {challenges.map((challenge) => (
            <ChallengeHomeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChallengesHome;
