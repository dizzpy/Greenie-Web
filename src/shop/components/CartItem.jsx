import PropTypes from 'prop-types';
import { IoTrashOutline } from 'react-icons/io5';

const CartItem = ({ item, onUpdateQuantity, onDelete }) => {
  const incrementQuantity = () => {
    onUpdateQuantity(item.productID, item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.productID, item.quantity - 1);
    }
  };

  return (
    <div className="flex gap-4 mb-4 p-4 bg-white rounded-xl">
      {/* Product Image */}
      <img
        src={item.imgURL}
        alt={item.productName}
        className="w-20 h-20 object-cover rounded-lg"
      />

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-text-gray">{item.productName}</h3>
          <p className="text-primary-green font-medium mt-1">
            Rs {(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <div className="flex justify-between items-center mt-2">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-3 bg-bg-light px-3 py-1 rounded-full">
            <button
              onClick={decrementQuantity}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            >
              -
            </button>
            <span className="text-sm text-text-gray w-4 text-center">
              {item.quantity}
            </span>
            <button
              onClick={incrementQuantity}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            >
              +
            </button>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(item.productID)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <IoTrashOutline size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    productID: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    imgURL: PropTypes.string.isRequired,
    numberOfPoints: PropTypes.number.isRequired,
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CartItem;
