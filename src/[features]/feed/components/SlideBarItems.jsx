/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const SlideBarItems = ({ icon, text, active }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer 
      ${active ? 'bg-primary-green text-white' : 'text-text-gray hover:bg-bg-light'}`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-lg">{text}</span>
    </div>
  );
};

// ✅ Add PropTypes validation
SlideBarItems.propTypes = {
  icon: PropTypes.node.isRequired, // Accepts a React node (JSX element)
  text: PropTypes.string.isRequired, // Must be a string
  active: PropTypes.bool, // Optional boolean (defaults to false)
};

// ✅ Default props for optional values
SlideBarItems.defaultProps = {
  active: false,
};

export default SlideBarItems;
