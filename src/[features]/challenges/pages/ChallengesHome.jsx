import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CoinIcon from '../../../assets/icons/coin.svg';
import ChallengeHomeCard from '../components/ChallengeHomeCard';
import NavBar from '../../../components/Shared/NavBar';
import { API_CONFIG } from '../../../config/api.config';

function ChallengesHome() {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [setLoading] = useState(true);
  const [setError] = useState(null);

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const response = await axios.get(
          API_CONFIG.ENDPOINTS.CHALLENGES.GET_ALL,
        );
        setChallenges(response.data);
      } catch (err) {
        console.error('Error fetching challenges:', err);
        setError('Failed to load challenges.');
      } finally {
        setLoading(false);
      }
    }

    fetchChallenges();
  }, [setLoading, setError]);

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
            <div key={challenge.challengeId} className="flex flex-col">
              <ChallengeHomeCard challenge={challenge} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChallengesHome;
