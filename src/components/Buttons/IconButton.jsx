import PropTypes from 'prop-types';

function IconButton({ icon, children, className }) {
  return (
    <div
      className={`bg-bg-light p-4 rounded-full inline-flex items-center ${className}`}
    >
      <img src={icon} alt="Icon" className="w-6 h-6" />
      {children}
    </div>
  );
}

// prop validation
IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default IconButton;
