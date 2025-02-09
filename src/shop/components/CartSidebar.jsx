import PropTypes from 'prop-types';
import { IoCloseCircleOutline } from 'react-icons/io5';
import CartButton from './CartButton';
import CartItem from './CartItem';

const CartSidebar = ({ isOpen, onClose, cartItems = [] }) => {
  const handleUpdateQuantity = (itemId, newQuantity) => {
    console.log('Update quantity:', itemId, newQuantity);
    // Add your quantity update logic here
  };

  const handleDeleteItem = (itemId) => {
    console.log('Delete item:', itemId);
    // Add your delete logic here
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50 z-40' : 'opacity-0 -z-10'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 w-full md:w-[450px] h-full bg-bg-light shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-2 bg-white m-5 rounded-2xl">
          <h2 className="text-lg text-text-gray">Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <IoCloseCircleOutline size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-6 h-[calc(100vh-220px)] overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onDelete={handleDeleteItem}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white">
          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span className="font-medium">${total}</span>
          </div>
          <CartButton text="Checkout" onClick={() => console.log('Checkout')} />
        </div>
      </aside>
    </>
  );
};

CartSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ),
};

export default CartSidebar;
