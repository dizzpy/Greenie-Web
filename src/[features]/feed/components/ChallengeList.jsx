/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ChallengeCard from './ChallengeCard';
import axios from 'axios';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get('/api/challenges/all');
        const limited = response.data.slice(0, 5); // Limit to 5
        setChallenges(limited);
      } catch (error) {
        console.error('Error fetching challenges:', error);
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
        {challenges.map((challenge, index) => (
          <ChallengeCard
            key={index}
            title={challenge.challengeName}
            enrolled={challenge.enrolled || 0} // fallback if enrolled not present
            points={challenge.points}
            photoUrl={challenge.photoUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ChallengeList;
