/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ChallengeCard from './ChallengeCard';
import ChallengeCardSkeleton from './ChallengeCardSkeleton';
import ChallengePreviewModal from './ChallengePreviewModal';
import axios from 'axios';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get('/api/challenges/all');
        const limited = response.data.slice(0, 5);
        setChallenges(limited);
      } catch (error) {
        console.error('Error fetching challenges:', error);
        setError('Failed to load challenges.');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <div className="w-120 p-4 rounded-xl ml-10">
      <h2 className="text-lg font-semibold mb-3 text-text-gray font-sans">
        Popular Challenges
      </h2>

      <div className="space-y-3">
        {loading ? (
          [...Array(5)].map((_, index) => <ChallengeCardSkeleton key={index} />)
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : (
          challenges.map((challenge, index) => (
            <div
              key={index}
              onClick={() => setSelectedChallenge(challenge)}
              className="cursor-pointer hover:shadow-md transition"
            >
              <ChallengeCard
                title={challenge.challengeName}
                enrolled={challenge.enrolled || 0}
                points={challenge.points}
                photoUrl={challenge.photoUrl}
              />
            </div>
          ))
        )}
      </div>

      {/* 👇 Modal */}
      {selectedChallenge && (
        <ChallengePreviewModal
          challenge={selectedChallenge}
          onClose={() => setSelectedChallenge(null)}
        />
      )}
    </div>
  );
};

export default ChallengeList;
