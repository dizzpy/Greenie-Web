/* eslint-disable no-unused-vars */
import React from 'react';

const ChallengeCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl p-4 flex items-center gap-3 animate-pulse">
      <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
      <div className="flex flex-col flex-grow">
        <div className="h-4 bg-gray-300 rounded w-32 mb-1"></div>
        <div className="h-3 bg-gray-300 rounded w-20"></div>
      </div>
      <div className="ml-auto flex items-center gap-1">
        <div className="h-4 w-4 bg-gray-300 rounded-full" />
        <div className="h-4 w-6 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default ChallengeCardSkeleton;
