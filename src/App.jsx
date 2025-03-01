import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopHome from './[features]/shop/pages/ShopHome';
import ProductDetails from './[features]/shop/pages/ProductDetails';
import Cart from './[features]/shop/pages/Cart';
import Checkout from './[features]/shop/pages/Checkout';
import RedeemStore from './[features]/shop/pages/RedeemStore';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import Feed from './[features]/feed/pages/Feed';
import ChallengesHome from './[features]/challenges/pages/ChallengesHome';
import Login from './[features]/auth/pages/Login';
import Register from './[features]/auth/pages/Register';
import ForgotPassword from './[features]/auth/pages/ForgotPassword';
import SetNewPassword from './[features]/auth/pages/SetNewPassword';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<HomePage />} />

          {/* Shop Routes */}
          <Route path="/shop" element={<ShopHome />} />
          <Route path="/shop/product/:id" element={<ProductDetails />} />
          <Route path="/shop/cart" element={<Cart />} />
          <Route path="/shop/checkout" element={<Checkout />} />
          <Route path="/shop/redeem" element={<RedeemStore />} />

          {/* Challenges Routes */}
          <Route path="/challenges" element={<ChallengesHome />} />

          {/* Feed Routes */}
          <Route path="/feed" element={<Feed />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />

          {/* 404 Error Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
