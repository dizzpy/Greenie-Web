import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopHome from './shop/pages/ShopHome';
import ProductDetails from './shop/pages/ProductDetails';
import Cart from './shop/pages/Cart';
import Checkout from './shop/pages/Checkout';
import RedeemStore from './shop/pages/RedeemStore';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import Feed from './feed/pages/Feed';
import ChallengesHome from './challenges/pages/ChallengesHome';
import Login from './auth/pages/Login';
import Register from './auth/pages/Register';
import ForgotPassword from './auth/pages/ForgotPassword';
import SetNewPassword from './auth/pages/SetNewPassword';

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

          {/* Leaderboard Routes */}
          <Route path="/leaderboard" element={<LeaderboardHome />} />

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
