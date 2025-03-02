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
    getCartTotal,
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

  const total = getCartTotal();

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
        className={`fixed top-0 right-0 w-full md:w-[450px] h-full bg-bg-light shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-2 bg-white m-5 rounded-2xl">
          <h2 className="text-lg text-text-gray">Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
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
                key={item.productID} // Changed from id to productID
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onDelete={handleDeleteItem}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="flex justify-between mb-4 px-5 py-4 bg-white m-5 rounded-2xl">
            <span>Total</span>
            <span className="font-medium">Rs {total}</span>{' '}
            {/* Changed from $ to Rs */}
          </div>

          {/* button section */}
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 m-5">
            <CartButton
              icon={cartIcon}
              text="View Cart"
              onClick={handleViewCart}
            />

            <CartButton
              icon={<LuArrowRight />}
              text="Checkout"
              className="bg-primary-green"
              textColor="text-white"
              onClick={handleCheckout}
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default CartSidebar;
