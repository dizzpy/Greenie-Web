import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopHome from './shop/pages/ShopHome';
import ProductDetails from './shop/pages/ProductDetails';
import Cart from './shop/pages/Cart';
import Checkout from './shop/pages/Checkout';
import RedeemStore from './shop/pages/RedeemStore';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="text-black h-screen flex items-center justify-center">
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<ShopHome />} />

          {/* Shop Routes */}
          <Route path="/shop" element={<ShopHome />} />
          <Route path="/shop/product/:id" element={<ProductDetails />} />
          <Route path="/shop/cart" element={<Cart />} />
          <Route path="/shop/checkout" element={<Checkout />} />
          <Route path="/shop/redeem" element={<RedeemStore />} />

          {/* 404 Error Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
