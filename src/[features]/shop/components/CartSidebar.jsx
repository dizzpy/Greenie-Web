import { IoCloseCircleOutline } from 'react-icons/io5';
import CartButton from './CartButton';
import CartItem from './CartItem';
import cartIcon from '../../../assets/icons/shopping-cart.svg';
import { LuArrowRight } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

const CartSidebar = () => {
  const navigate = useNavigate();
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    appliedPoints,
    getFinalTotal,
    clearCart,
  } = useCart();

  const handleViewCart = () => {
    setIsCartOpen(false); // Close sidebar
    navigate('/shop/cart'); // Navigate to cart page
  };

  const handleCheckout = () => {
    setIsCartOpen(false); // Close sidebar
    navigate('/shop/checkout'); // Navigate to checkout page
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleDeleteItem = (itemId) => {
    removeFromCart(itemId);
  };

  const finalTotal = getFinalTotal();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isCartOpen ? 'opacity-50 z-40' : 'opacity-0 -z-10'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 w-full md:w-[450px] h-full bg-bg-light shadow-lg transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-2 bg-white m-5 rounded-2xl">
          <div className="flex items-center gap-4">
            <h2 className="text-lg text-text-gray">
              Cart ({cartItems.length})
            </h2>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-lightred text-sm hover:text-red-600 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <IoCloseCircleOutline size={24} />
          </button>
        </div>

        {/* Cart Items - Updated scroll container */}
        <div className="flex-1 overflow-y-auto px-5">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.productID}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="p-5 border-t bg-bg-light">
          <div className="flex justify-between mb-4 px-5 py-4 bg-white rounded-2xl">
            <span>Total</span>
            <div className="flex flex-col items-end">
              {appliedPoints > 0 && (
                <span className="text-sm text-primary-green mb-1">
                  -{appliedPoints} points applied
                </span>
              )}
              <span className="font-medium">Rs {finalTotal}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
            <CartButton
              icon={cartIcon}
              text="View Cart"
              onClick={handleViewCart}
            />

            <CartButton
              icon={<LuArrowRight />}
              text="Checkout"
              className="bg-primary-green"
              textColor="text-primary-green"
              onClick={handleCheckout}
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default CartSidebar;
