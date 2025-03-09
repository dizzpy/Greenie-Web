import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import CartItemCard from '../components/CartItemCard';
import CartButton from '../components/CartButton';
import { LuArrowRight } from 'react-icons/lu';
import ShopNav from '../components/ShopNav';
import Breadcrumb from '../components/Breadcrumb';
import { useCart } from '../../../context/CartContext';
import NavBar from '../../../components/Shared/NavBar';
import coinIcon from '/src/assets/icons/coin.svg';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const total = getCartTotal(); // Move total calculation here
  const [appliedPoints, setAppliedPoints] = useState(0);
  const [pointInput, setPointInput] = useState('');
  const [error, setError] = useState('');
  const maxPointsAllowed = Math.min(user?.points || 0, total);
  const finalTotal = Math.max(0, total - appliedPoints);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setError('');

    if (value === '' || (/^\d+$/.test(value) && !value.startsWith('0'))) {
      setPointInput(value);

      const numValue = Number(value);
      if (numValue > user?.points) {
        setError("You don't have enough points");
      } else if (numValue > total) {
        setError('Points cannot exceed total amount');
      }
    }
  };

  const handleApplyPoints = () => {
    const points = Number(pointInput);
    setError('');

    if (isNaN(points) || points < 0) {
      setError('Please enter a valid number');
      return;
    }

    if (points > user?.points) {
      setError("You don't have enough points");
      return;
    }

    if (points > total) {
      setError('Points cannot exceed total amount');
      return;
    }

    const validPoints = Math.min(points, maxPointsAllowed);
    setAppliedPoints(validPoints);
  };

  const handleMaxPoints = () => {
    setPointInput(maxPointsAllowed.toString());
    setAppliedPoints(maxPointsAllowed);
  };

  const handleCheckout = () => {
    navigate('/shop/checkout');
  };

  return (
    <div className="max-w-screen-xl container mx-auto px-4 md:px-0">
      <NavBar />

      <ShopNav />

      <div className="my-4">
        <Breadcrumb
          items={[{ label: 'Shop', link: '/shop' }, { label: 'Cart' }]}
        />
      </div>

      <div className="my-8">
        <h1 className="text-2xl md:text-3xl font-medium text-text-gray mb-6">
          Shopping Cart ({cartItems.length} items)
        </h1>

        <div className="grid grid-cols-12 gap-8">
          {/* Cart Items Section - Updated for better scrolling */}
          <div className="col-span-12 lg:col-span-7 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button
                  onClick={() => navigate('/shop')}
                  className="text-primary-green hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-4">
                {cartItems.map((item) => (
                  <CartItemCard
                    key={item.productID}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Summary Section - Make it sticky */}
          {cartItems.length > 0 && (
            <div className="col-span-12 lg:col-span-5">
              {/* Points Redemption Card */}
              <div className="bg-bg-light p-6 rounded-3xl mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium text-text-gray">
                    Redeem Points
                  </h2>
                  <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
                    <img
                      src={coinIcon} // Import this at the top
                      alt="Points"
                      className="w-5 h-5"
                    />
                    <span className="text-primary-green font-medium">
                      {user?.points || 0} Available
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Input Group */}
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={pointInput}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            error ? 'border-lightred' : 'border-outline'
                          } focus:outline-none focus:border-primary-green transition-colors`}
                          placeholder="Enter points to redeem"
                        />
                        {pointInput && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                            = Rs {pointInput}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setPointInput('');
                          setAppliedPoints(0);
                        }}
                        className="px-4 py-2 text-lightred hover:bg-red-50 rounded-xl transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    {error && (
                      <p className="text-lightred text-sm pl-1">{error}</p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleApplyPoints}
                      disabled={
                        !pointInput ||
                        error ||
                        appliedPoints === Number(pointInput)
                      }
                      className="flex-1 bg-primary-green text-white py-3 rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Apply Points
                    </button>
                    <button
                      onClick={handleMaxPoints}
                      disabled={
                        maxPointsAllowed === 0 ||
                        appliedPoints === maxPointsAllowed
                      }
                      className="flex-1 bg-green-50 text-primary-green py-3 rounded-xl hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Use Max ({maxPointsAllowed})
                    </button>
                  </div>

                  {/* Applied Points Indicator */}
                  {appliedPoints > 0 && (
                    <div className="flex items-center justify-between bg-green-50 px-4 py-3 rounded-xl">
                      <span className="text-primary-green">Points Applied</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-primary-green">
                          {appliedPoints}
                        </span>
                        <button
                          onClick={() => {
                            setAppliedPoints(0);
                            setPointInput('');
                          }}
                          className="text-lightred hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary Card */}
              <div className="bg-bg-light p-6 rounded-3xl sticky top-4">
                <h2 className="text-xl font-medium text-text-gray mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rs {total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  {appliedPoints > 0 && (
                    <div className="flex justify-between text-primary-green">
                      <span>Points Discount</span>
                      <span>- Rs {appliedPoints}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium pt-3 border-t">
                    <span>Total</span>
                    <span>Rs {finalTotal}</span>
                  </div>
                </div>

                <CartButton
                  icon={<LuArrowRight />}
                  text="Proceed to Checkout"
                  className="bg-primary-green mt-6"
                  textColor="text-primary-green"
                  onClick={handleCheckout}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
