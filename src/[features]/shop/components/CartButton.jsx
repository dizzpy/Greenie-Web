import PropTypes from 'prop-types';

const CartButton = ({
  text = 'Add to Cart',
  icon,
  onClick,
  className = '',
  textColor = 'text-text-gray', // Add default text color
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-row bg-white p-4 rounded-full justify-between px-6 w-full transition-colors ${className}`}
    >
      <p className={`${textColor} text-base`}>{text}</p>
      {icon && (
        <div className="w-6 h-6 flex items-center justify-center">
          {typeof icon === 'string' ? (
            <img src={icon} alt="button icon" className="w-full h-full" />
          ) : (
            icon
          )}
        </div>
      )}
    </button>
  );
};

CartButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func,
  className: PropTypes.string,
  textColor: PropTypes.string, // Add prop type for textColor
};

CartButton.defaultProps = {
  text: 'Add to Cart',
  icon: null,
  onClick: () => {},
  className: '',
  textColor: 'text-text-gray', // Add default prop
};

export default CartButton;
