import { Link } from 'react-router-dom';

function ShopHome() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Shop</h1>
      <nav className="flex flex-col space-y-3">
        <Link to="/shop" className="text-blue-500 hover:underline">
          🏠 Shop Home
        </Link>
        <Link to="/shop/product/1" className="text-blue-500 hover:underline">
          📦 Product Details (Example: ID 1)
        </Link>
        <Link to="/shop/cart" className="text-blue-500 hover:underline">
          🛒 View Cart
        </Link>
        <Link to="/shop/checkout" className="text-blue-500 hover:underline">
          💳 Checkout
        </Link>
        <Link to="/shop/redeem" className="text-blue-500 hover:underline">
          🎁 Redeem Points Store
        </Link>
      </nav>
    </div>
  );
}

export default ShopHome;
