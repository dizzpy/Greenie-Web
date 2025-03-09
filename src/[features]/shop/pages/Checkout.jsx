import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import CartButton from '../components/CartButton';
import {
  LuArrowRight,
  LuUser,
  LuMail,
  LuMapPin,
  LuPhone,
  LuBuilding,
} from 'react-icons/lu';
import ShopNav from '../components/ShopNav';
import Breadcrumb from '../components/Breadcrumb';
import { useCart } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../../components/Shared/NavBar';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, appliedPoints, getCartTotal, getFinalTotal } = useCart();
  const [shippingDetails, setShippingDetails] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  const total = getCartTotal();
  const finalTotal = getFinalTotal();

  // Redirect to cart if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-medium">Your cart is empty</h2>
        <button
          onClick={() => navigate('/shop')}
          className="text-primary-green hover:underline"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-screen-xl container mx-auto px-4 md:px-0">
      <NavBar />
      <ShopNav />

      <div className="my-4">
        <Breadcrumb
          items={[
            { label: 'Shop', link: '/shop' },
            { label: 'Cart', link: '/shop/cart' },
            { label: 'Checkout' },
          ]}
        />
      </div>

      <div className="my-8">
        <h1 className="text-2xl md:text-3xl font-medium text-text-gray mb-6">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {/* Profile Card */}
            <div className="bg-bg-light p-6 rounded-3xl">
              <h2 className="text-xl font-medium text-text-gray mb-4">
                Profile Details
              </h2>
              <div className="flex items-center gap-6 p-6 rounded-2xl">
                <img
                  src={user?.avatar || '/default-avatar.png'}
                  alt={user?.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-green-50"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">{user?.name}</h3>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Shipping Details Card */}
            <div className="bg-bg-light p-6 rounded-3xl">
              <h2 className="text-xl font-medium text-text-gray mb-4">
                Shipping Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-2xl">
                <div className="md:col-span-2">
                  <div className="relative">
                    <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={user?.name}
                      readOnly
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-outline bg-gray-50 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="relative">
                    <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={user?.email}
                      readOnly
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-outline bg-gray-50 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="relative">
                    <LuMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={shippingDetails.address}
                      onChange={handleInputChange}
                      placeholder="Street Address"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-outline focus:outline-none focus:border-primary-green"
                    />
                  </div>
                </div>

                <div className="relative">
                  <LuBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-outline focus:outline-none focus:border-primary-green"
                  />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingDetails.zipCode}
                    onChange={handleInputChange}
                    placeholder="ZIP Code"
                    className="w-full px-4 py-3 rounded-xl border border-outline focus:outline-none focus:border-primary-green"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="relative">
                    <LuPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={shippingDetails.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-outline focus:outline-none focus:border-primary-green"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-bg-light p-6 rounded-3xl sticky top-4">
              <h2 className="text-xl font-medium text-text-gray mb-4">
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.productID}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.productName} x {item.quantity}
                    </span>
                    <span>Rs {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs {total}</span>
                </div>
                {appliedPoints > 0 && (
                  <div className="flex justify-between text-primary-green">
                    <span>Points Applied</span>
                    <span>-Rs {appliedPoints}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>Rs {finalTotal}</span>
                </div>
              </div>

              <CartButton
                icon={<LuArrowRight />}
                text="Place Order"
                className="bg-primary-green mt-6"
                textColor="text-primary-green"
                onClick={() => console.log('Place order')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
