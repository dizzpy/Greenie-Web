/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const SlideBarItems = ({ icon, text, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer text-lg
        ${isActive ? 'bg-primary-green text-white' : 'text-text-gray hover:bg-bg-light'}`
      }
    >
      <span className="text-xl">{icon}</span>
      <span>{text}</span>
    </NavLink>
  );
};

SlideBarItems.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default SlideBarItems;
