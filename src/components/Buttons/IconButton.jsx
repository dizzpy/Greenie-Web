import PropTypes from 'prop-types';

const IconButton = ({ icon, onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full bg-white hover:bg-gray-50 transition-colors ${className}`}
    >
      <img src={icon} alt="icon" className="w-6 h-6" />
      {children}
    </button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default IconButton;
