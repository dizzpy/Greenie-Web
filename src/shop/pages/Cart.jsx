import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CartButton from '../components/CartButton';
import { LuArrowRight } from 'react-icons/lu';
import ShopNav from '../components/ShopNav';

const Cart = () => {
  const navigate = useNavigate();

  // Temporary cart items (replace with your cart state management)
  const cartItems = [
    {
      productID: 1,
      productName: 'Eco-Friendly Bottle',
      price: 4300,
      quantity: 2,
      imgURL: 'https://via.placeholder.com/300',
      numberOfPoints: 120,
    },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    navigate('/shop/checkout');
  };

  return (
    <div className="max-w-screen-xl container mx-auto px-4 md:px-0">
      {/* Global nav */}
      <div className="bg-green-300 py-4 mx-auto my-3 md:my-5 rounded-lg">
        <p className="text-center">Global Nav</p>
      </div>

      <ShopNav />

      <div className="my-8">
        <h1 className="text-2xl md:text-3xl font-medium text-text-gray mb-6">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-8">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Your cart is empty
              </p>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.productID}
                  item={item}
                  onUpdateQuantity={(id, qty) => console.log(id, qty)}
                  onDelete={(id) => console.log('delete', id)}
                />
              ))
            )}
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-4">
            <div className="bg-bg-light p-6 rounded-3xl">
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
                <div className="flex justify-between font-medium pt-3 border-t">
                  <span>Total</span>
                  <span>Rs {total}</span>
                </div>
              </div>

              <CartButton
                icon={<LuArrowRight />}
                text="Proceed to Checkout"
                className="bg-primary-green mt-6"
                textColor="text-white"
                onClick={handleCheckout}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
