import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../../components/Shared/NavBar';
import ViewChallengeCard from '../components/ViewChallengeCard';
import { API_CONFIG } from '../../../config/api.config';

function ViewChallenge() {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!challengeId) {
      setError('Invalid challenge ID.');
      setLoading(false);
      return;
    }

    async function fetchChallenge() {
      try {
        const apiUrl = API_CONFIG.ENDPOINTS.CHALLENGES.GET_BY_ID(challengeId);
        console.log('Fetching challenge from:', apiUrl);

        const response = await axios.get(apiUrl);
        setChallenge(response.data);
      } catch (err) {
        console.error('Error fetching challenge:', err);

        // Show detailed error message
        if (err.response) {
          setError(
            `Error ${err.response.status}: ${err.response.data.message || 'Failed to load challenge.'}`,
          );
        } else if (err.request) {
          setError('Network error: Unable to reach the server.');
        } else {
          setError('Unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchChallenge();
  }, [challengeId]);

  return (
    <div>
      <NavBar />
      <div className="max-w-screen-xl container mx-auto px-4 md:px-6 py-8 mt-6">
        {loading && <div className="text-center mt-10">Loading...</div>}
        {error && <div className="text-center mt-10 text-red-500">{error}</div>}
        {challenge && (
          <div className="flex justify-center">
            <ViewChallengeCard challenge={challenge} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewChallenge;
