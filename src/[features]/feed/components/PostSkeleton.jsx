/* eslint-disable no-unused-vars */
import React from 'react';

const PostSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow animate-pulse space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <div className="flex-1 h-4 bg-gray-300 rounded" />
      </div>
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-40 bg-gray-300 rounded" />
    </div>
  );
};

export default PostSkeleton;
