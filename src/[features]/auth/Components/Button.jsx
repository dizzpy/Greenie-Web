import PropTypes from 'prop-types';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-6 py-3 bg-primary-green text-white rounded-md focus:outline-none hover:bg-green-600 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Prop validation
Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Default prop for className
Button.defaultProps = {
  className: '',
};

export default Button;
