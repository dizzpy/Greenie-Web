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
import Register from './[features]/auth/pages/CreateAccount';
import ForgotPassword from './[features]/auth/pages/ForgotPassword';
import SetNewPassword from './[features]/auth/pages/SetNewPassword';
import ProfilePage from './[features]/auth/pages/ProfilePage';
import LeaderboardHome from './[features]/leaderboard/pages/LeaderboardHome';
import { CartProvider } from './context/CartContext';
import Notification from './components/Notification';
import CartSidebar from './[features]/shop/components/CartSidebar';

function App() {
  return (
    <CartProvider>
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
            <Route path="/p" element={<ProfilePage />} />

            {/* 404 Error Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CartSidebar />
          <Notification />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
