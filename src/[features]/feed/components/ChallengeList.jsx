/* eslint-disable no-unused-vars */
import React from 'react';
import ChallengeCard from './ChallengeCard';

const ChallengeList = () => {
  // Sample challenge data
  const challenges = [
    { title: 'Water Conservation', enrolled: 25, points: 200 },
    { title: 'Energy Saving', enrolled: 30, points: 150 },
    { title: 'Plastic Reduction', enrolled: 20, points: 180 },
    { title: 'Tree Plantation', enrolled: 15, points: 220 },
  ];

  return (
    <div className="w-120 p-4 rounded-xl  ml-10">
      <h2 className="text-lg font-semibold mb-3 text-text-gray font-sans ">
        Popular Challenges
      </h2>
      <div className="space-y-3">
        {challenges.map((challenge, index) => (
          <ChallengeCard key={index} {...challenge} />
        ))}
      </div>
    </div>
  );
};

export default ChallengeList;
