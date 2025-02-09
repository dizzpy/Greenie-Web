import PropTypes from 'prop-types';

const IconButton = ({ icon, onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-bg-light p-4 rounded-full inline-flex items-center ${className}`}
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
