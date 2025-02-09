import PropTypes from 'prop-types';
import { LuTrash2 } from 'react-icons/lu';

const CartItemCard = ({ item, onUpdateQuantity, onRemove }) => {
  const incrementQuantity = () => {
    onUpdateQuantity(item.productID, item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.productID, item.quantity - 1);
    }
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className="bg-bg-light py-5 px-10 rounded-3xl mb-4 flex gap-4">
      {/* Product Image */}
      <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
        <img
          src={item.imgURL}
          alt={item.productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-text-gray">{item.productName}</h3>
          <button
            onClick={() => onRemove(item.productID)}
            className="text-lightred hover:text-red-600 p-1 transition-colors"
            aria-label="Remove item"
          >
            <LuTrash2 size={20} />
          </button>
        </div>

        <div className="flex justify-between items-center mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-3 bg-white p-2 rounded-full">
            <button
              onClick={decrementQuantity}
              disabled={item.quantity <= 1}
              className="w-6 h-6 flex items-center justify-center bg-bg-light rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              -
            </button>
            <span className="w-4 text-center">{item.quantity}</span>
            <button
              onClick={incrementQuantity}
              className="w-6 h-6 flex items-center justify-center bg-bg-light rounded-full hover:bg-gray-200 transition-colors"
            >
              +
            </button>
          </div>

          {/* Price */}
          <div className="text-text-gray font-medium">Rs {itemTotal}</div>
        </div>
      </div>
    </div>
  );
};

CartItemCard.propTypes = {
  item: PropTypes.shape({
    productID: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    imgURL: PropTypes.string.isRequired,
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItemCard;
