import PropTypes from 'prop-types';
import { LuTrash2 } from 'react-icons/lu';

const CartItem = ({ item, onUpdateQuantity, onDelete }) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.productID, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.productID, item.quantity - 1);
    }
  };

  return (
    <div className="flex gap-4 mb-4 bg-white p-4 rounded-2xl">
      <img
        src={item.imgURL}
        alt={item.productName}
        className="w-20 h-20 object-cover rounded-xl"
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium text-sm">{item.productName}</h3>
          <button
            onClick={() => onDelete(item.productID)}
            className="text-lightred hover:text-red-600"
          >
            <LuTrash2 size={18} />
          </button>
        </div>
        <p className="text-text-gray text-sm mt-1">Rs {item.price}</p>
        <div className="flex items-center mt-2 space-x-2">
          <button
            onClick={handleDecrement}
            className="w-6 h-6 flex items-center justify-center bg-bg-light rounded-full"
          >
            -
          </button>
          <span className="text-sm">{item.quantity}</span>
          <button
            onClick={handleIncrement}
            className="w-6 h-6 flex items-center justify-center bg-bg-light rounded-full"
          >
            +
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
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CartItem;
